import { ObjectId } from 'mongodb';
import { Media, ClassTypeEnum, NotificationTypeEnum } from '~/constants/enum';

interface NotificationType {
  _id?: ObjectId;
  user_id:string
  content: string;
  type: NotificationTypeEnum;
  class_id_receive:string
  user_id_receive:string
  media: string;
  created_at?: Date;
  updated_at?: Date;
}

export default class Notification {
    _id?: ObjectId;
    user_id:string
    content: string;
    type: NotificationTypeEnum;
    class_id_receive:string
    user_id_receive:string
    media: string;
    created_at?: Date;
    updated_at?: Date;

  constructor(classes: NotificationType) {
    this._id = classes._id || new ObjectId();
    this.content = classes.content || '';
    this.user_id = classes.user_id || '';
    this.user_id_receive = classes.user_id_receive || '';
    this.class_id_receive = classes.class_id_receive || '';
    this.type = classes.type || NotificationTypeEnum.user;
    this.media = classes.media || '';
    this.created_at = classes.created_at || new Date();
    this.updated_at = classes.updated_at || new Date();
  }
}