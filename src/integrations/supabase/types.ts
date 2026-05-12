export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      brand_workbook_submissions: {
        Row: {
          answers: Json
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string | null
          page_url: string | null
          phone: string | null
          practice_name: string | null
          source: string | null
          user_agent: string | null
        }
        Insert: {
          answers?: Json
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name?: string | null
          page_url?: string | null
          phone?: string | null
          practice_name?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Update: {
          answers?: Json
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string | null
          page_url?: string | null
          phone?: string | null
          practice_name?: string | null
          source?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      cta_analytics: {
        Row: {
          created_at: string
          cta_id: string
          cta_text: string | null
          event_type: string
          id: string
          page_url: string | null
          section: string | null
          session_id: string | null
          user_agent: string | null
          viewport_width: number | null
        }
        Insert: {
          created_at?: string
          cta_id: string
          cta_text?: string | null
          event_type?: string
          id?: string
          page_url?: string | null
          section?: string | null
          session_id?: string | null
          user_agent?: string | null
          viewport_width?: number | null
        }
        Update: {
          created_at?: string
          cta_id?: string
          cta_text?: string | null
          event_type?: string
          id?: string
          page_url?: string | null
          section?: string | null
          session_id?: string | null
          user_agent?: string | null
          viewport_width?: number | null
        }
        Relationships: []
      }
      eligibility_submissions: {
        Row: {
          alignment: string | null
          brand_maturity: string | null
          career_horizon: string | null
          commitment: string | null
          created_at: string
          email: string
          first_name: string
          friction: string | null
          id: string
          important_areas: string[] | null
          is_partial: boolean
          last_completed_step: number
          last_name: string
          phone: string | null
          readiness: string | null
          real_cost: string[] | null
          real_cost_other: string | null
          role_type: string | null
          updated_at: string
          visibility: string | null
          years_in_practice: string | null
        }
        Insert: {
          alignment?: string | null
          brand_maturity?: string | null
          career_horizon?: string | null
          commitment?: string | null
          created_at?: string
          email: string
          first_name: string
          friction?: string | null
          id?: string
          important_areas?: string[] | null
          is_partial?: boolean
          last_completed_step?: number
          last_name: string
          phone?: string | null
          readiness?: string | null
          real_cost?: string[] | null
          real_cost_other?: string | null
          role_type?: string | null
          updated_at?: string
          visibility?: string | null
          years_in_practice?: string | null
        }
        Update: {
          alignment?: string | null
          brand_maturity?: string | null
          career_horizon?: string | null
          commitment?: string | null
          created_at?: string
          email?: string
          first_name?: string
          friction?: string | null
          id?: string
          important_areas?: string[] | null
          is_partial?: boolean
          last_completed_step?: number
          last_name?: string
          phone?: string | null
          readiness?: string | null
          real_cost?: string[] | null
          real_cost_other?: string | null
          role_type?: string | null
          updated_at?: string
          visibility?: string | null
          years_in_practice?: string | null
        }
        Relationships: []
      }
      lead_magnet_submissions: {
        Row: {
          city: string | null
          created_at: string
          dream_destination: string | null
          email: string
          first_name: string
          id: string
          source: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          dream_destination?: string | null
          email: string
          first_name: string
          id?: string
          source?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          dream_destination?: string | null
          email?: string
          first_name?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      popup_analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          page_url: string | null
          scroll_depth_percent: number | null
          session_id: string | null
          trigger_type: string | null
          user_agent: string | null
          viewport_width: number | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          page_url?: string | null
          scroll_depth_percent?: number | null
          session_id?: string | null
          trigger_type?: string | null
          user_agent?: string | null
          viewport_width?: number | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          page_url?: string | null
          scroll_depth_percent?: number | null
          session_id?: string | null
          trigger_type?: string | null
          user_agent?: string | null
          viewport_width?: number | null
        }
        Relationships: []
      }
      quiz_submissions: {
        Row: {
          answers: Json
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          page_url: string | null
          score: number
          score_label: string
          session_id: string | null
          user_agent: string | null
          viewport_width: number | null
        }
        Insert: {
          answers?: Json
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          page_url?: string | null
          score: number
          score_label: string
          session_id?: string | null
          user_agent?: string | null
          viewport_width?: number | null
        }
        Update: {
          answers?: Json
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          page_url?: string | null
          score?: number
          score_label?: string
          session_id?: string | null
          user_agent?: string | null
          viewport_width?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
