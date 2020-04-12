export interface Location {
  city: string;
  country: string;
}

export interface CreateUserInput {
  email: string;
  password?: string;
  providerId?: string;
  provider?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  location?: Location;
}
