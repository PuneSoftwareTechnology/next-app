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
