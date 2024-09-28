import { Router } from 'express';
import {
  acceptMemberClassController,
  createClassController,
  findClassByCodeController,
  getClassAcceptController,
  getClassController,
  getClassPendingController,
  getMeetingTokenController,
  joinMemberClassController
} from '~/controllers/classControllers';
import { accessTokenValidator } from '~/middlewares/usersMiddlewares';
import { catchError } from '~/utils/handler';

const router = Router();

router.post('/create', accessTokenValidator, catchError(createClassController));
router.post('/join-class', accessTokenValidator, catchError(joinMemberClassController));
router.post('/accept-class', accessTokenValidator, catchError(acceptMemberClassController));
router.post('/get-member-pending', catchError(getClassPendingController));
router.post('/get-member-accept', catchError(getClassAcceptController));
router.post('/find-by-code', catchError(findClassByCodeController));
router.post('/get-meeting-token', accessTokenValidator, catchError(getMeetingTokenController));
router.get('/', accessTokenValidator, catchError(getClassController));

export default router;
