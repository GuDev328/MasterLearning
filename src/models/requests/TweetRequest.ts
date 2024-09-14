import { JwtPayload } from 'jsonwebtoken';
import { Media, TweetTypeEnum } from '~/constants/enum';
import Tweet from '../schemas/TweetSchema';

export interface TweetRequest {
  decodeAuthorization: JwtPayload;
  type: TweetTypeEnum;
  content: string;
  parent_id: null | string; //  chỉ null khi tweet gốc
  medias: Media[];
}

export interface getTweetRequest {
  decodeAuthorization: JwtPayload;
  tweet: Tweet;
}
