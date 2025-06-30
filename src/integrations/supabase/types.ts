export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      arquivos_demandas: {
        Row: {
          created_at: string | null
          demanda_id: string
          id: string
          nome_arquivo: string
          tamanho_arquivo: number | null
          tipo_arquivo: string | null
          url_arquivo: string
        }
        Insert: {
          created_at?: string | null
          demanda_id: string
          id?: string
          nome_arquivo: string
          tamanho_arquivo?: number | null
          tipo_arquivo?: string | null
          url_arquivo: string
        }
        Update: {
          created_at?: string | null
          demanda_id?: string
          id?: string
          nome_arquivo?: string
          tamanho_arquivo?: number | null
          tipo_arquivo?: string | null
          url_arquivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "arquivos_demandas_demanda_id_fkey"
            columns: ["demanda_id"]
            isOneToOne: false
            referencedRelation: "demandas"
            referencedColumns: ["id"]
          },
        ]
      }
      cidadaos: {
        Row: {
          bairro: string | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          endereco: string
          genero: string | null
          id: string
          latitude: number | null
          longitude: number | null
          multiplicador: boolean | null
          nome: string
          observacoes: string | null
          recebe_informativos: boolean | null
          telefone: string | null
          updated_at: string | null
          vereador_id: string
        }
        Insert: {
          bairro?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco: string
          genero?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          multiplicador?: boolean | null
          nome: string
          observacoes?: string | null
          recebe_informativos?: boolean | null
          telefone?: string | null
          updated_at?: string | null
          vereador_id: string
        }
        Update: {
          bairro?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string
          genero?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          multiplicador?: boolean | null
          nome?: string
          observacoes?: string | null
          recebe_informativos?: boolean | null
          telefone?: string | null
          updated_at?: string | null
          vereador_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cidadaos_vereador_id_fkey"
            columns: ["vereador_id"]
            isOneToOne: false
            referencedRelation: "vereadores"
            referencedColumns: ["id"]
          },
        ]
      }
      demandas: {
        Row: {
          categoria: string
          cidadao_id: string | null
          created_at: string | null
          descricao: string
          endereco: string | null
          id: string
          latitude: number | null
          longitude: number | null
          prioridade: string | null
          status: string | null
          titulo: string
          updated_at: string | null
          vereador_id: string
        }
        Insert: {
          categoria: string
          cidadao_id?: string | null
          created_at?: string | null
          descricao: string
          endereco?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          prioridade?: string | null
          status?: string | null
          titulo: string
          updated_at?: string | null
          vereador_id: string
        }
        Update: {
          categoria?: string
          cidadao_id?: string | null
          created_at?: string | null
          descricao?: string
          endereco?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          prioridade?: string | null
          status?: string | null
          titulo?: string
          updated_at?: string | null
          vereador_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "demandas_cidadao_id_fkey"
            columns: ["cidadao_id"]
            isOneToOne: false
            referencedRelation: "cidadaos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandas_vereador_id_fkey"
            columns: ["vereador_id"]
            isOneToOne: false
            referencedRelation: "vereadores"
            referencedColumns: ["id"]
          },
        ]
      }
      equipe: {
        Row: {
          acesso_sistema: boolean | null
          cargo: string
          created_at: string | null
          email: string | null
          id: string
          nome: string
          permissoes: string[] | null
          telefone: string | null
          updated_at: string | null
          vereador_id: string
        }
        Insert: {
          acesso_sistema?: boolean | null
          cargo: string
          created_at?: string | null
          email?: string | null
          id?: string
          nome: string
          permissoes?: string[] | null
          telefone?: string | null
          updated_at?: string | null
          vereador_id: string
        }
        Update: {
          acesso_sistema?: boolean | null
          cargo?: string
          created_at?: string | null
          email?: string | null
          id?: string
          nome?: string
          permissoes?: string[] | null
          telefone?: string | null
          updated_at?: string | null
          vereador_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipe_vereador_id_fkey"
            columns: ["vereador_id"]
            isOneToOne: false
            referencedRelation: "vereadores"
            referencedColumns: ["id"]
          },
        ]
      }
      vereadores: {
        Row: {
          cidade: string | null
          cor_primaria: string | null
          cor_secundaria: string | null
          created_at: string | null
          email: string
          id: string
          logo_url: string | null
          nome: string
          partido: string | null
          telefone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cidade?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          created_at?: string | null
          email: string
          id?: string
          logo_url?: string | null
          nome: string
          partido?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cidade?: string | null
          cor_primaria?: string | null
          cor_secundaria?: string | null
          created_at?: string | null
          email?: string
          id?: string
          logo_url?: string | null
          nome?: string
          partido?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_vereador_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
