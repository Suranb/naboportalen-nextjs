export interface Database {
  public: {
    Tables: {
      subdomains: {
        Row: {
          id: string;
          subdomain: string;
          emoji: string;
          name: string;
          description: string | null;
          banner_image_url: string | null;
          about_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subdomain: string;
          emoji: string;
          name: string;
          description?: string | null;
          banner_image_url?: string | null;
          about_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subdomain?: string;
          emoji?: string;
          name?: string;
          description?: string | null;
          banner_image_url?: string | null;
          about_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          subdomain_id: string | null;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "admin" | "board_member" | "resident";
          apartment_number: string | null;
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          subdomain_id?: string | null;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "board_member" | "resident";
          apartment_number?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subdomain_id?: string | null;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "board_member" | "resident";
          apartment_number?: string | null;
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          subdomain_id: string;
          author_id: string | null;
          category_id: string | null;
          title: string | null;
          content: string;
          post_type: "discussion" | "announcement" | "event" | "document";
          is_pinned: boolean;
          is_urgent: boolean;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subdomain_id: string;
          author_id?: string | null;
          category_id?: string | null;
          title?: string | null;
          content: string;
          post_type?: "discussion" | "announcement" | "event" | "document";
          is_pinned?: boolean;
          is_urgent?: boolean;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subdomain_id?: string;
          author_id?: string | null;
          category_id?: string | null;
          title?: string | null;
          content?: string;
          post_type?: "discussion" | "announcement" | "event" | "document";
          is_pinned?: boolean;
          is_urgent?: boolean;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      // ... more table types would be added here
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
