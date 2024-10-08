import { Router } from 'express';
import {
  createLessonController,
  deleteLessonController,
  getLessonByClassController,
  getLessonByIdController,
  updateLessonController
} from '~/controllers/lessonsController';
import { accessTokenValidator } from '~/middlewares/usersMiddlewares';
import { catchError } from '~/utils/handler';

const router = Router();

router.post('/create', accessTokenValidator, catchError(createLessonController));
router.post('/getByClassId', accessTokenValidator, catchError(getLessonByClassController));
router.put('/update', accessTokenValidator, catchError(updateLessonController));
router.delete('/delete', accessTokenValidator, catchError(deleteLessonController));
router.get('/:id', accessTokenValidator, catchError(getLessonByIdController));

export default router;
