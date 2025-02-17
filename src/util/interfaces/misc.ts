export interface CompanyInterface {
  id: number;
  name: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  user_email: string;
}

export interface ResponseInterface {
  success: boolean;
  message: string;
  data: CompanyInterface[];
}
