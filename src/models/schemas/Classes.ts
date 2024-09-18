import { ObjectId } from 'mongodb';
import { Media, ClassTypeEnum } from '~/constants/enum';

interface ClassesType {
  _id?: ObjectId;
  type: ClassTypeEnum;
  name: string;
  description:string;
  topic:string;
  code:string;
  created_at?: Date;
  updated_at?: Date;
}

export default class Classes {
    _id?: ObjectId;
    type: ClassTypeEnum;
    name: string;
    description:string;
    topic:string;
    code:string;
    created_at?: Date;
    updated_at?: Date;

  constructor(tweet: ClassesType) {
    this._id = tweet._id || new ObjectId();
    this.name = tweet.name || '';
    this.type = tweet.type || ClassTypeEnum.Public;
    this.description = tweet.description || '';
    this.topic = tweet.topic || ''; 
    this.code = tweet.code || '';
    this.created_at = tweet.created_at || new Date();
    this.updated_at = tweet.updated_at || new Date();
  }
}
