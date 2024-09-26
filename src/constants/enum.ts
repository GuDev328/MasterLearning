export enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

export enum UserRole {
  Undefined,
  Student,
  Teacher,
  Admin
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  FogotPasswordToken,
  VerifyEmailToken
}
export enum ClassTypeEnum {
  Public = 'Public',
  Private = 'Private',
  Security = 'Security'
}
export enum MemberClassTypeEnum {
  Pending = 'Pending',
  Accept = 'Accept'
}
export interface Media {
  url: string;
  type: MediaType; // video, image
}
export enum MediaType {
  Image,
  Video,
  VideoHLS,
  PDF
}

export enum TweetTypeEnum {
  Tweet,
  Comment
}

export enum SendEmail {
  VerifyEmail,
  FogotPassword
}
