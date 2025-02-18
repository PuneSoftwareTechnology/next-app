import { Blog } from "./blog";
import { FAQ } from "./faq";
import { FetchTestimonialResponse } from "./testimonial";

export interface Category {
  id: string | number;
  name: string;
  category_enum?: string;
}

export interface Course {
  id: string | number;
  name: string;
  category_id?: string | number;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface CoursesResponse {
  success: boolean;
  message: string;
  data: Course[];
}

export interface Courses {
  id: string;
  name: string;
  description: string;
  slug: string;
  featured_image: string;
}

export interface AllCoursesResponse {
  success: boolean;
  message: string;
  data: Courses[];
}
export interface CourseDetail {
  id: string;
  name: string;
  intro: string[];
  featured_image: string;
  description: string;
  training_procedure: boolean;
  slug: string;
  module_heading: string;
  modules: string[];
  prerequisite: string[];
  created_at: string;
  updated_at: string;
  user_email: string;
  deleted: boolean;
  category_id: string;
  related_courses: RelatedCourse[];
}

export interface RelatedCourse {
  id: string;
  name: string;
  slug: string;
  featured_image: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Syllabus {
  course_id: string;
  courses_syllabus: Module[];
}

export interface Module {
  module_name: string;
  lessons: string[];
}

export interface Job {
  id: string;
  name: string;
  description: string;
}

export interface FullCourseDetails {
  course: CourseDetail;
  projects: Project[];
  syllabus: Syllabus[];
  jobs: Job[];
  blogs: Blog[];
  faqs: FAQ[];
  testimonials: FetchTestimonialResponse[];
}

export interface FullCourseDetailResponse {
  success: boolean;
  message: string;
  data: FullCourseDetails;
}
