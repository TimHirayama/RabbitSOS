export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          role: "super_admin" | "admin" | "volunteer";
          full_name: string | null;
          phone: string | null;
          role_title: string | null;
          national_id: string | null;
          address: string | null;
          note: string | null;
          avatar_url: string | null;
          avatar_color: string | null;
          status: "active" | "suspended";
          created_at: string | null;
        };
        Insert: {
          id: string;
          email?: string | null;
          role?: "super_admin" | "admin" | "volunteer";
          full_name?: string | null;
          phone?: string | null;
          role_title?: string | null;
          national_id?: string | null;
          address?: string | null;
          note?: string | null;
          avatar_url?: string | null;
          avatar_color?: string | null;
          status?: "active" | "suspended";
          created_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string | null;
          role?: "super_admin" | "admin" | "volunteer";
          full_name?: string | null;
          phone?: string | null;
          role_title?: string | null;
          national_id?: string | null;
          address?: string | null;
          note?: string | null;
          avatar_url?: string | null;
          avatar_color?: string | null;
          status?: "active" | "suspended";
          created_at?: string | null;
        };
      };
      feature_flags: {
        Row: {
          key: string;
          label: string;
          description: string | null;
          is_enabled: boolean;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          key: string;
          label: string;
          description?: string | null;
          is_enabled?: boolean;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          key?: string;
          label?: string;
          description?: string | null;
          is_enabled?: boolean;
          updated_at?: string | null;
          updated_by?: string | null;
        };
      };
      rabbits: {
        Row: {
          id: string;
          name: string;
          status:
            | "open"
            | "reserved"
            | "medical"
            | "closed"
            | "adopted"
            | "rainbow";
          gender: "M" | "F" | "unknown" | null;
          age_year: number | null;
          location: string | null;
          description: string | null;
          image_urls: string[] | null;
          is_featured: boolean | null;
          deleted_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          status?:
            | "open"
            | "reserved"
            | "medical"
            | "closed"
            | "adopted"
            | "rainbow";
          gender?: "M" | "F" | "unknown" | null;
          age_year?: number | null;
          location?: string | null;
          description?: string | null;
          image_urls?: string[] | null;
          is_featured?: boolean | null;
          deleted_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          status?:
            | "open"
            | "reserved"
            | "medical"
            | "closed"
            | "adopted"
            | "rainbow";
          gender?: "M" | "F" | "unknown" | null;
          age_year?: number | null;
          location?: string | null;
          description?: string | null;
          image_urls?: string[] | null;
          is_featured?: boolean | null;
          deleted_at?: string | null;
          created_at?: string | null;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          category: "news" | "knowledge" | "event" | "rescue" | "financial";
          content: string | null;
          cover_image: string | null;
          file_url: string | null;
          published: boolean | null;
          published_at: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          category?: "news" | "knowledge" | "event" | "rescue" | "financial";
          content?: string | null;
          cover_image?: string | null;
          file_url?: string | null;
          published?: boolean | null;
          published_at?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          category?: "news" | "knowledge" | "event" | "rescue" | "financial";
          content?: string | null;
          cover_image?: string | null;
          file_url?: string | null;
          published?: boolean | null;
          published_at?: string | null;
          created_at?: string | null;
        };
      };
      donations: {
        Row: {
          id: string;
          user_id: string | null;
          donor_name: string;
          donor_phone: string | null;
          donor_email: string | null;
          donor_tax_id: string | null;
          amount: number;
          transfer_date: string | null;
          last_5_digits: string | null;
          proof_image_url: string | null;
          receipt_title: string | null;
          receipt_address: string | null;
          receipt_status: "pending" | "verified" | "issue";
          receipt_no: string | null;
          admin_note: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          donor_name: string;
          donor_phone?: string | null;
          donor_email?: string | null;
          donor_tax_id?: string | null;
          amount: number;
          transfer_date?: string | null;
          last_5_digits?: string | null;
          proof_image_url?: string | null;
          receipt_title?: string | null;
          receipt_address?: string | null;
          receipt_status?: "pending" | "verified" | "issue";
          receipt_no?: string | null;
          admin_note?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          donor_name?: string;
          donor_phone?: string | null;
          donor_email?: string | null;
          donor_tax_id?: string | null;
          amount?: number;
          transfer_date?: string | null;
          last_5_digits?: string | null;
          proof_image_url?: string | null;
          receipt_title?: string | null;
          receipt_address?: string | null;
          receipt_status?: "pending" | "verified" | "issue";
          receipt_no?: string | null;
          admin_note?: string | null;
          created_at?: string | null;
        };
      };
      banners: {
        Row: {
          id: string;
          title: string | null;
          image_path: string;
          link_url: string | null;
          display_mode: "contained" | "full";
          sort_order: number | null;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title?: string | null;
          image_path: string;
          link_url?: string | null;
          display_mode?: "contained" | "full";
          sort_order?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string | null;
          image_path?: string;
          link_url?: string | null;
          display_mode?: "contained" | "full";
          sort_order?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
