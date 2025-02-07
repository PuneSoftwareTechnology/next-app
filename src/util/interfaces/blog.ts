export interface Blog {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  author_id: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
}

export interface FetchBlogResponse {
  success: boolean;
  data: Blog[];
  message: string;
}
