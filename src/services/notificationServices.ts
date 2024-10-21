
  import Classes from '~/models/schemas/Classes';
  import db from './databaseServices';
  import { ClassTypeEnum, MemberClassTypeEnum, NotificationTypeEnum } from '~/constants/enum';
  import Members from '~/models/schemas/MemberClasses';
  import { ObjectId } from 'mongodb';
  import { ErrorWithStatus } from '~/models/Errors';
  import { httpStatus } from '~/constants/httpStatus';
import { NotificationDeleteNotificationByClassId, NotificationDeleteNotificationById, NotificationDeleteNotificationByUserIdRecive, NotificationGetByClassRequest, NotificationGetByUserReciveRequest, NotificationRequest } from '~/models/requests/NotificationRequest';
import Notification from '~/models/schemas/NotificationSchema';
  
  class NotificationService {
    constructor() {}
    async createNewNotification(payload: NotificationRequest) {
      if (!Object.values(NotificationTypeEnum).includes(payload.type)) {
        throw new ErrorWithStatus({
          message: 'Type not found',
          status: httpStatus.BAD_REQUEST
        });
      }
      if (payload.type == NotificationTypeEnum.class) {
        if (!ObjectId.isValid(payload.class_id_receive)) {
          throw new ErrorWithStatus({
              message: 'Invalid ObjectId',
              status: httpStatus.BAD_REQUEST
            });
        }
        const checkClassExit = db.classes.findOne({_id:new ObjectId(payload.class_id_receive)});
        if(!checkClassExit){
          throw new ErrorWithStatus({
            message: 'Class recive not found',
            status: httpStatus.BAD_REQUEST
          });
        }
      }
      if (payload.type == NotificationTypeEnum.user) {
        if (!ObjectId.isValid(payload.user_id_receive)) {
          throw new ErrorWithStatus({
              message: 'Invalid ObjectId',
              status: httpStatus.BAD_REQUEST
            });
        }
        const checkClassExit = db.users.findOne({_id:new ObjectId(payload.user_id_receive)});
        if(!checkClassExit){
          throw new ErrorWithStatus({
            message: 'user recive not found',
            status: httpStatus.BAD_REQUEST
          });
        }
      }
      const notification = new Notification({
        user_id: payload.decodeAuthorization.payload.userId,
        content: payload.content,
        class_id_receive:payload.class_id_receive,
        user_id_receive:payload.user_id_receive,
        media: payload.media,
        type: payload.type,
      });
      const createNoti = await db.notificitions.insertOne(notification);
      return createNoti.insertedId;
    }
    async getNotificionByClassId(payload: NotificationGetByClassRequest){
      const notifications = await db.notificitions
      .find({ class_id_receive: payload.class_id })
      .toArray();
      return notifications;
    }
    async getNotificionByUserReciveId(payload: NotificationGetByUserReciveRequest){
      const notifications = await db.notificitions
      .find({ user_id_receive: payload.user_recive_id })
      .toArray();
      return notifications;
    }
    async deleteNotificionById(payload: NotificationDeleteNotificationById){
      if (!ObjectId.isValid(payload.id)) {
        throw new ErrorWithStatus({
            message: 'Invalid ObjectId',
            status: httpStatus.BAD_REQUEST
          });
      }
      const NotiEx = await db.notificitions.findOne({
        _id: new ObjectId(payload.id),
        user_id: payload.decodeAuthorization.payload.userId
      });
      if (!NotiEx) {
        throw new ErrorWithStatus({
          message: 'the teacher not right or not Exit notification',
          status: httpStatus.BAD_REQUEST
        });
      }
      const notifications = await db.notificitions
      .deleteOne({ _id: new ObjectId(payload.id) })
      return notifications;
    }
    async deleteNotificionByUserIdReceive(payload: NotificationDeleteNotificationByUserIdRecive){
      if (!ObjectId.isValid(payload.userId)) {
        throw new ErrorWithStatus({
            message: 'Invalid ObjectId',
            status: httpStatus.BAD_REQUEST
          });
      }
      const notifications = await db.notificitions
      .deleteMany({ user_id: payload.decodeAuthorization.payload.userId,user_id_receive:payload.userId})
      return notifications;
    }
    async deleteNotificionByClassIdReceive(payload: NotificationDeleteNotificationByClassId){
      if (!ObjectId.isValid(payload.classId)) {
        throw new ErrorWithStatus({
            message: 'Invalid ObjectId',
            status: httpStatus.BAD_REQUEST
          });
      }
      const notifications = await db.notificitions
      .deleteMany({ user_id: payload.decodeAuthorization.payload.userId,class_id_receive:payload.classId})
      return notifications;
    }
  }
  const notificationService = new NotificationService();
  export default notificationService;
  