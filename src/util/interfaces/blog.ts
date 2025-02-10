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

export interface OneBlogResponse {
  id: number;
  slug: string;
  title: string;
  featured_image: string;
  introduction: string;
  primary_content_title: string;
  primary_content_intro: string;
  primary_content_image: string;
  primary_content_text: string;
  secondary_content_title: string;
  secondary_content_intro: string;
  secondary_content_image: string;
  secondary_content_text: string;
  tertiary_content_title: string;
  tertiary_content_points: string;
  conclusion: string;
  author_id: string;
  status: string;
  category: string;
  deleted: boolean;
}

export interface FetchOneBlogResponse {
  success: boolean;
  data: OneBlogResponse;
  message: string;
}
