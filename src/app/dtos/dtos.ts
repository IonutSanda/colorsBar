export interface Service {
  title: string;
  description: string;
  image: string;
  isCollapsed?: boolean;
}

export interface ContactInfo {
  phoneNr: string;
  email: string;
  address: string;
}
