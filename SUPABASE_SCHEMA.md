
# Schema do Banco de Dados - Gabinete Virtual

## Tabelas Principais

### 1. vereadores (Perfis dos vereadores)
```sql
CREATE TABLE vereadores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  partido VARCHAR(10),
  cidade VARCHAR(100),
  logo_url TEXT,
  cor_primaria VARCHAR(7) DEFAULT '#006fd6',
  cor_secundaria VARCHAR(7) DEFAULT '#f1f5f9',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. cidadaos (Cadastro de cidadãos)
```sql
CREATE TABLE cidadaos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vereador_id UUID REFERENCES vereadores(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  endereco TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  telefone VARCHAR(20),
  email VARCHAR(255),
  data_nascimento DATE,
  genero VARCHAR(20),
  bairro VARCHAR(100),
  recebe_informativos BOOLEAN DEFAULT false,
  multiplicador BOOLEAN DEFAULT false,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. demandas (Demandas da cidade)
```sql
CREATE TABLE demandas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vereador_id UUID REFERENCES vereadores(id) ON DELETE CASCADE,
  cidadao_id UUID REFERENCES cidadaos(id) ON DELETE SET NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'Nova' CHECK (status IN ('Nova', 'Em andamento', 'Resolvida')),
  prioridade VARCHAR(10) DEFAULT 'Média' CHECK (prioridade IN ('Baixa', 'Média', 'Alta')),
  endereco TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. equipe (Membros da equipe)
```sql
CREATE TABLE equipe (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vereador_id UUID REFERENCES vereadores(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(255),
  acesso_sistema BOOLEAN DEFAULT false,
  permissoes TEXT[], -- Array de permissões
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. arquivos_demandas (Arquivos anexados às demandas)
```sql
CREATE TABLE arquivos_demandas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  demanda_id UUID REFERENCES demandas(id) ON DELETE CASCADE,
  nome_arquivo VARCHAR(255) NOT NULL,
  url_arquivo TEXT NOT NULL,
  tipo_arquivo VARCHAR(50),
  tamanho_arquivo INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS)

### Políticas de Segurança

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE vereadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE cidadaos ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandas ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipe ENABLE ROW LEVEL SECURITY;
ALTER TABLE arquivos_demandas ENABLE ROW LEVEL SECURITY;

-- Política para vereadores (podem ver apenas seus próprios dados)
CREATE POLICY "vereadores_policy" ON vereadores
  FOR ALL USING (auth.uid() = user_id);

-- Política para cidadãos (vereador vê apenas seus cidadãos)
CREATE POLICY "cidadaos_policy" ON cidadaos
  FOR ALL USING (
    vereador_id IN (
      SELECT id FROM vereadores WHERE user_id = auth.uid()
    )
  );

-- Política para demandas (vereador vê apenas suas demandas)
CREATE POLICY "demandas_policy" ON demandas
  FOR ALL USING (
    vereador_id IN (
      SELECT id FROM vereadores WHERE user_id = auth.uid()
    )
  );

-- Política para equipe (vereador vê apenas sua equipe)
CREATE POLICY "equipe_policy" ON equipe
  FOR ALL USING (
    vereador_id IN (
      SELECT id FROM vereadores WHERE user_id = auth.uid()
    )
  );

-- Política para arquivos de demandas
CREATE POLICY "arquivos_demandas_policy" ON arquivos_demandas
  FOR ALL USING (
    demanda_id IN (
      SELECT d.id FROM demandas d
      INNER JOIN vereadores v ON d.vereador_id = v.id
      WHERE v.user_id = auth.uid()
    )
  );
```

## Triggers para Updated_at

```sql
-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para cada tabela
CREATE TRIGGER update_vereadores_updated_at BEFORE UPDATE ON vereadores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cidadaos_updated_at BEFORE UPDATE ON cidadaos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demandas_updated_at BEFORE UPDATE ON demandas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipe_updated_at BEFORE UPDATE ON equipe
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Storage Buckets

```sql
-- Bucket para logos dos gabinetes
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true);

-- Bucket para arquivos das demandas
INSERT INTO storage.buckets (id, name, public) VALUES ('demandas', 'demandas', false);

-- Políticas de acesso ao Storage
CREATE POLICY "Public logos access" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Vereadores can upload logos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'logos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Vereadores demandas access" ON storage.objects
  FOR ALL USING (
    bucket_id = 'demandas' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Funções Auxiliares

```sql
-- Função para calcular idade
CREATE OR REPLACE FUNCTION calcular_idade(data_nascimento DATE)
RETURNS INTEGER AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM AGE(data_nascimento));
END;
$$ LANGUAGE plpgsql;

-- Função para obter estatísticas do dashboard
CREATE OR REPLACE FUNCTION obter_estatisticas_dashboard(vereador_uuid UUID)
RETURNS JSON AS $$
DECLARE
  total_cidadaos INTEGER;
  total_demandas INTEGER;
  demandas_resolvidas INTEGER;
  taxa_resolucao DECIMAL;
BEGIN
  SELECT COUNT(*) INTO total_cidadaos 
  FROM cidadaos WHERE vereador_id = vereador_uuid;
  
  SELECT COUNT(*) INTO total_demandas 
  FROM demandas WHERE vereador_id = vereador_uuid;
  
  SELECT COUNT(*) INTO demandas_resolvidas 
  FROM demandas WHERE vereador_id = vereador_uuid AND status = 'Resolvida';
  
  IF total_demandas > 0 THEN
    taxa_resolucao = (demandas_resolvidas::DECIMAL / total_demandas) * 100;
  ELSE
    taxa_resolucao = 0;
  END IF;
  
  RETURN json_build_object(
    'total_cidadaos', total_cidadaos,
    'total_demandas', total_demandas,
    'demandas_resolvidas', demandas_resolvidas,
    'taxa_resolucao', taxa_resolucao
  );
END;
$$ LANGUAGE plpgsql;
```

## Índices para Performance

```sql
-- Índices para melhorar performance das consultas
CREATE INDEX idx_cidadaos_vereador_id ON cidadaos(vereador_id);
CREATE INDEX idx_cidadaos_bairro ON cidadaos(bairro);
CREATE INDEX idx_demandas_vereador_id ON demandas(vereador_id);
CREATE INDEX idx_demandas_status ON demandas(status);
CREATE INDEX idx_demandas_categoria ON demandas(categoria);
CREATE INDEX idx_equipe_vereador_id ON equipe(vereador_id);
```

## Dados de Exemplo

```sql
-- Categorias de demandas comuns
CREATE TABLE categorias_demandas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO categorias_demandas (nome) VALUES
('Infraestrutura'),
('Iluminação'),
('Limpeza'),
('Saúde'),
('Educação'),
('Transporte'),
('Segurança'),
('Meio Ambiente');
```

## Configuração do Supabase Auth

No painel do Supabase, configurar:

1. **Email Auth**: Habilitado
2. **Email Confirmation**: Opcional (recomendado para produção)
3. **Site URL**: URL da aplicação
4. **Redirect URLs**: URLs permitidas para redirecionamento

## APIs Externas Necessárias

1. **Google Maps JavaScript API**
   - Geocoding API (para converter endereços em coordenadas)
   - Maps JavaScript API (para exibir mapas)
   - Places API (para busca de endereços)

## Próximos Passos

1. Conectar o projeto Lovable ao Supabase
2. Executar o schema SQL no editor SQL do Supabase
3. Configurar as variáveis de ambiente
4. Implementar a autenticação
5. Conectar as APIs do Google Maps
6. Testar o multi-tenancy com diferentes vereadores
