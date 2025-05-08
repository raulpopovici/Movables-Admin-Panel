export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  isGoogleUser: boolean;
  cartId?: string;
};
