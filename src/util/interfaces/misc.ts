export interface CompanyInterface {
  id: number;
  company_name: string;
  company_logo: string;
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
