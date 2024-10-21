import { Router } from "express";
import { createNotificationController, deleteNotificationByClassId, deleteNotificationById, deleteNotificationByUserIdReceive, getNotificationByClassController, getNotificationByUserReController } from "~/controllers/notificationController";
import { accessTokenValidator } from "~/middlewares/usersMiddlewares";
import { catchError } from "~/utils/handler";

const router = Router();
router.post('/create', accessTokenValidator, catchError(createNotificationController));
router.post('/getByClassRe', accessTokenValidator, catchError(getNotificationByClassController));
router.post('/getByUserRe', accessTokenValidator, catchError(getNotificationByUserReController));
router.delete('/deleteById', accessTokenValidator, catchError(deleteNotificationById));
router.delete('/deleteByUserIdRe', accessTokenValidator, catchError(deleteNotificationByUserIdReceive));
router.delete('/deleteByClassIdRe', accessTokenValidator, catchError(deleteNotificationByClassId));
export default router;
