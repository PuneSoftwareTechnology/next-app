export interface TestimonialInterface {
  name: string;
  course: string;
  star_ratings: number;
  testimonial: string;
}

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

export interface ReposneInterFace {
  success: boolean;
  message: string;
  data: FetchTestimonialResponse[];
}
