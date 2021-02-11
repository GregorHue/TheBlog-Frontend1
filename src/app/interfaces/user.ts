import { Gender } from './gender';

export interface User {
  createdAt: Date;
  lastUpdatedAt: Date;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  city: string;
  street: string;
  houseNumber: number;
  postalCode: string;
  user_url: string;
  posts_url: string;
  deletedTs: Date;
  avatar: string;
}

export interface UserDtoList {
  users: User[];
}

