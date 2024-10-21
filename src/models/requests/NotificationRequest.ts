import { JwtPayload } from "jsonwebtoken";
import { NotificationTypeEnum } from "~/constants/enum";

export interface NotificationRequest{
    decodeAuthorization: JwtPayload;
    content: string;
    type: NotificationTypeEnum;
    class_id_receive:string
    user_id_receive:string
    media: string;
}
export interface NotificationGetByClassRequest{
    class_id:string
}
export interface NotificationGetByUserReciveRequest{
    user_recive_id:string
}
export interface NotificationDeleteNotificationById {
    decodeAuthorization: JwtPayload;
    id:string;
}
export interface NotificationDeleteNotificationByUserIdRecive {
    decodeAuthorization: JwtPayload;
    id:string;
}
export interface NotificationDeleteNotificationByUserIdRecive {
    decodeAuthorization: JwtPayload;
    userId:string;
}
export interface NotificationDeleteNotificationByClassId {
    decodeAuthorization: JwtPayload;
    classId:string;
}