import { JwtPayload } from 'jsonwebtoken';
import User from '../schemas/UserSchema';
import { UserRole } from '~/constants/enum';

export interface RegisterRequest {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  role: UserRole;
  confirmPassword: string;
  date_of_birth: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface RefreshTokenRequest {
  decodeRefreshToken: JwtPayload;
  refreshToken: string;
}

export interface VerifyEmailRequest {
  emailVerifyToken: string;
  decodeEmailVerifyToken: JwtPayload;
}

export interface ResendVerifyEmailRequest {
  decodeAuthorization: JwtPayload;
}

export interface ForgotPasswordRequest {
  email: string;
  user: User;
}

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
  user: User;
  //forgotPasswordToken: string;
}

export interface GetMeRequest {
  decodeAuthorization: JwtPayload;
}

export interface UpdateMeRequest {
  decodeAuthorization: JwtPayload;
  name?: string;
  date_of_birth?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  decodeAuthorization: JwtPayload;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AddUsersToCircleRequest {
  decodeAuthorization: JwtPayload;
  userIds: string[];
}
