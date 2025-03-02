export interface DemoInterface {
  name: string;
  phone: string;
  email: string;
  message: string;
  course: string;
}

export interface DemoResponse {
  success: boolean;
  message: string;
}

export interface Consultation {
  name: string;
  phone_number: number;
  message: string;
}

export interface ConsultationResponse {
  success: boolean;
  message: string;
}
