export interface ReduxUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  imageUrl?: string | null;
}

export interface UserUpdatePayload {
  first_name: string;
  last_name: string;
  image_url?: string | null;
}
