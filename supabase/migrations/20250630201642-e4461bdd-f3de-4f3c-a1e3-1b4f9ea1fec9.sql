
-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create vereadores (councilors/legislators) table
CREATE TABLE IF NOT EXISTS public.vereadores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  partido VARCHAR(10),
  cidade VARCHAR(100),
  logo_url TEXT,
  cor_primaria VARCHAR(7) DEFAULT '#64748b',
  cor_secundaria VARCHAR(7) DEFAULT '#f1f5f9',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cidadaos (citizens) table
CREATE TABLE IF NOT EXISTS public.cidadaos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vereador_id UUID REFERENCES public.vereadores(id) ON DELETE CASCADE NOT NULL,
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

-- Create demandas (demands/requests) table
CREATE TABLE IF NOT EXISTS public.demandas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vereador_id UUID REFERENCES public.vereadores(id) ON DELETE CASCADE NOT NULL,
  cidadao_id UUID REFERENCES public.cidadaos(id) ON DELETE SET NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('saude', 'educacao', 'transporte', 'infraestrutura', 'seguranca', 'meio-ambiente', 'assistencia-social', 'outros')),
  status VARCHAR(20) DEFAULT 'nova' CHECK (status IN ('nova', 'em-andamento', 'resolvida')),
  prioridade VARCHAR(10) DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta')),
  endereco TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create equipe (team) table
CREATE TABLE IF NOT EXISTS public.equipe (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vereador_id UUID REFERENCES public.vereadores(id) ON DELETE CASCADE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(255),
  acesso_sistema BOOLEAN DEFAULT false,
  permissoes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create arquivos_demandas (demand files) table
CREATE TABLE IF NOT EXISTS public.arquivos_demandas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  demanda_id UUID REFERENCES public.demandas(id) ON DELETE CASCADE NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  url_arquivo TEXT NOT NULL,
  tipo_arquivo VARCHAR(50),
  tamanho_arquivo INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.vereadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cidadaos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demandas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipe ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arquivos_demandas ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vereadores (users can only see/modify their own profile)
CREATE POLICY "vereadores_own_data" ON public.vereadores
  FOR ALL USING (auth.uid() = user_id);

-- Security definer function to get current vereador_id
CREATE OR REPLACE FUNCTION public.get_current_vereador_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT id FROM public.vereadores WHERE user_id = auth.uid() LIMIT 1;
$$;

-- RLS Policies for cidadaos (vereador can only see their own citizens)
CREATE POLICY "cidadaos_vereador_access" ON public.cidadaos
  FOR ALL USING (vereador_id = public.get_current_vereador_id());

-- RLS Policies for demandas (vereador can only see their own demands)
CREATE POLICY "demandas_vereador_access" ON public.demandas
  FOR ALL USING (vereador_id = public.get_current_vereador_id());

-- RLS Policies for equipe (vereador can only see their own team)
CREATE POLICY "equipe_vereador_access" ON public.equipe
  FOR ALL USING (vereador_id = public.get_current_vereador_id());

-- RLS Policies for arquivos_demandas (based on demanda ownership)
CREATE POLICY "arquivos_demandas_vereador_access" ON public.arquivos_demandas
  FOR ALL USING (
    demanda_id IN (
      SELECT id FROM public.demandas WHERE vereador_id = public.get_current_vereador_id()
    )
  );

-- Function to automatically create vereador profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.vereadores (user_id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Trigger to create vereador profile on user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_vereadores_updated_at BEFORE UPDATE ON public.vereadores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cidadaos_updated_at BEFORE UPDATE ON public.cidadaos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_demandas_updated_at BEFORE UPDATE ON public.demandas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_equipe_updated_at BEFORE UPDATE ON public.equipe
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos', 'logos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('demandas', 'demandas', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for logos (public read, authenticated upload)
CREATE POLICY "Public logos access" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Authenticated can upload logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');

-- Storage policies for demanda files (restricted to vereador)
CREATE POLICY "Vereador demandas access" ON storage.objects
  FOR ALL USING (
    bucket_id = 'demandas' AND
    (storage.foldername(name))[1] = public.get_current_vereador_id()::text
  );

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cidadaos_vereador_id ON public.cidadaos(vereador_id);
CREATE INDEX IF NOT EXISTS idx_cidadaos_bairro ON public.cidadaos(bairro);
CREATE INDEX IF NOT EXISTS idx_demandas_vereador_id ON public.demandas(vereador_id);
CREATE INDEX IF NOT EXISTS idx_demandas_status ON public.demandas(status);
CREATE INDEX IF NOT EXISTS idx_demandas_categoria ON public.demandas(categoria);
CREATE INDEX IF NOT EXISTS idx_equipe_vereador_id ON public.equipe(vereador_id);
CREATE INDEX IF NOT EXISTS idx_arquivos_demandas_demanda_id ON public.arquivos_demandas(demanda_id);
