export interface FetchTestimonialResponse {
  id: number;
  name: string;
  star_ratings: 5;
  testimonial: string;
  course: string;
  created_at: string;
  deleted: boolean;
  user_email: string;
}

export interface ResponseInterFace {
  success: boolean;
  message: string;
  data: FetchTestimonialResponse[];
}

export interface CreateTestimonialInterface {
  name: string;
  course: string;
  star_ratings: number;
  testimonial: string;
}

export interface TestimonialResponse {
  success: boolean;
  message: string;
}
