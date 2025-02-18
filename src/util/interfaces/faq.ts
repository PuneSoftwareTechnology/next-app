export interface FAQ {
  id: string;
  question: string;
  answer: string;
  course_id: string;
  category_id: string;
  deleted: boolean;
  created_at: string; // ISO 8601 format timestamp
  updated_at: string; // ISO 8601 format timestamp
  user_email: string;
}

export interface FAQResponse {
  success: boolean;
  message: string;
  data: FAQ[];
}
