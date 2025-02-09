export interface Blog {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  author_id: string;
  introduction: string;
  featured_image: string;
}

export interface FetchBlogResponse {
  success: boolean;
  data: Blog[];
  message: string;
}
