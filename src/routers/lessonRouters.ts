import { Router } from 'express';
import {
  createLessonController,
  deleteLessonController,
  getLessonByClassController,
  getLessonByIdController,
  updateLessonController
} from '~/controllers/lessonsController';
import { IsMemberOfClassValidator, IsTeacherOfClassValidator } from '~/middlewares/lessonMiddlewares';
import { accessTokenValidator } from '~/middlewares/usersMiddlewares';
import { catchError } from '~/utils/handler';

const router = Router();

router.post('/create', accessTokenValidator, IsTeacherOfClassValidator, catchError(createLessonController));
router.post('/getByClassId', accessTokenValidator, IsMemberOfClassValidator, catchError(getLessonByClassController));
router.put('/update', accessTokenValidator, IsTeacherOfClassValidator, catchError(updateLessonController));
router.delete('/delete', accessTokenValidator, IsTeacherOfClassValidator, catchError(deleteLessonController));
router.get('/:id', accessTokenValidator, IsMemberOfClassValidator, catchError(getLessonByIdController));

export default router;
