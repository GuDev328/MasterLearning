import { Router } from "express";
import { createLessonController, deleteLessonController, getLessonByClassController, updateLessonController } from "~/controllers/lessonsController";
import { accessTokenValidator } from "~/middlewares/usersMiddlewares";
import { catchError } from "~/utils/handler";

const router = Router();

router.post('/create', accessTokenValidator, catchError(createLessonController));
router.post('/getByClassId', accessTokenValidator, catchError(getLessonByClassController));
router.put('/update', accessTokenValidator, catchError(updateLessonController));
router.delete('/delete', accessTokenValidator, catchError(deleteLessonController));

export default router;
