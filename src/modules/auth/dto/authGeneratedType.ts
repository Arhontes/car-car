import { UserResponseType } from '../../../common/types/users-types';

export type AuthGeneratedType = {
  access_token: string;
  refresh_token: string;
  user: UserResponseType;
};