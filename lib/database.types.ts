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
      inovasi: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          nama: string;
          slug: string;
          deskripsi: string;
          deskripsi_panjang: string | null;
          tech_stack: string[];
          tags: string[];
          status: "aktif" | "dalam-pembangunan" | "arkib";
          tahun: number;
          link_demo: string | null;
          link_github: string | null;
          gambar_url: string | null;
          ikon: string;
          warna_tema: string;
          is_published: boolean;
          urutan: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["inovasi"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["inovasi"]["Insert"]
        >;
      };
    };
  };
}

export type Inovasi = Database["public"]["Tables"]["inovasi"]["Row"];
