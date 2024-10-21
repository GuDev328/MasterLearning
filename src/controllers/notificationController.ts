import { Request, Response } from "express";
import { NotificationDeleteNotificationByClassId, NotificationDeleteNotificationById, NotificationDeleteNotificationByUserIdRecive, NotificationGetByClassRequest, NotificationGetByUserReciveRequest, NotificationRequest } from "~/models/requests/NotificationRequest";
import notificationService from "~/services/notificationServices";

export const createNotificationController = async (req: Request<any, any, NotificationRequest>, res: Response) => {
    const result = await notificationService.createNewNotification(req.body);
    res.status(200).json({
      result,
      message: 'Create new Notification suscess'
    });
  };
  export const getNotificationByClassController = async (req: Request<any, any, NotificationGetByClassRequest>, res: Response) => {
    const result = await notificationService.getNotificionByClassId(req.body);
    res.status(200).json({
      result,
      message: 'get notification by class suscess'
    });
  };
  export const getNotificationByUserReController = async (req: Request<any, any, NotificationGetByUserReciveRequest>, res: Response) => {
    const result = await notificationService.getNotificionByUserReciveId(req.body);
    res.status(200).json({
      result,
      message: 'get notification by user receive suscess'
    });
  };
  export const deleteNotificationById= async (req: Request<any, any, NotificationDeleteNotificationById>, res: Response) => {
    const result = await notificationService.deleteNotificionById(req.body);
    res.status(200).json({
      result,
      message: 'delete notification by user receive suscess'
    });
  };
  export const deleteNotificationByUserIdReceive= async (req: Request<any, any, NotificationDeleteNotificationByUserIdRecive>, res: Response) => {
    const result = await notificationService.deleteNotificionByUserIdReceive(req.body);
    res.status(200).json({
      result,
      message: 'delete notification by user receive suscess'
    });
  };
  export const deleteNotificationByClassId= async (req: Request<any, any, NotificationDeleteNotificationByClassId>, res: Response) => {
    const result = await notificationService.deleteNotificionByClassIdReceive(req.body);
    res.status(200).json({
      result,
      message: 'delete notification by class Id receive suscess'
    });
  };