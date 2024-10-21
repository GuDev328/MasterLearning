import { Router } from 'express';
import {
  createExerciseController,
  deleteExerciseController,
  getForStudentController,
  getForTeacherController,
  updateExerciseController
} from '~/controllers/excirseControllers';
import { IsMemberOfClassValidator, IsTeacherOfClassValidator } from '~/middlewares/lessonMiddlewares';
import { accessTokenValidator } from '~/middlewares/usersMiddlewares';
import { catchError } from '~/utils/handler';

const router = Router();

router.post('/create', accessTokenValidator, IsTeacherOfClassValidator, catchError(createExerciseController));
router.put('/update', accessTokenValidator, catchError(updateExerciseController));
router.delete('/delete', accessTokenValidator, catchError(deleteExerciseController));
router.get('/for-teacher/:id', accessTokenValidator, catchError(getForTeacherController));
router.get('/for-student/:id', accessTokenValidator, catchError(getForStudentController));

export default router;
