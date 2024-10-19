import { Router } from 'express';
import { createExerciseController } from '~/controllers/excirseControllers';
import { IsMemberOfClassValidator, IsTeacherOfClassValidator } from '~/middlewares/lessonMiddlewares';
import { accessTokenValidator } from '~/middlewares/usersMiddlewares';
import { catchError } from '~/utils/handler';

const router = Router();

router.post('/create', accessTokenValidator, IsTeacherOfClassValidator, catchError(createExerciseController));

export default router;
