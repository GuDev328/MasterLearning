import { Router } from 'express';
import {
  changePasswordController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  loginGoogleController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/usersControllers';
import { filterMiddleware } from '~/middlewares/commonMiddlewares';
import {
  accessTokenValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  getProfileValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  setUserCirclesValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyEmailValidator,
  verifyForgotPasswordValidator
} from '~/middlewares/usersMiddlewares';
import { UpdateMeRequest } from '~/models/requests/UserRequests';
import { catchError } from '~/utils/handler';
const router = Router();

router.post('/login', loginValidator, catchError(loginController));
router.get('/oauth/google', catchError(loginGoogleController));
router.post('/register', registerValidator, catchError(registerController));
router.post('/logout', accessTokenValidator, refreshTokenValidator, catchError(logoutController));
router.post('/refresh-token', refreshTokenValidator, catchError(refreshTokenController));
router.post('/verify-email', accessTokenValidator, verifyEmailValidator, catchError(verifyEmailController));
router.post('/resend-verify-email', accessTokenValidator, catchError(resendVerifyEmailController));
router.post('/forgot-password', forgotPasswordValidator, catchError(forgotPasswordController));
router.post(
  '/reset-password',
  resetPasswordValidator,
  verifyForgotPasswordValidator,
  catchError(resetPasswordController)
);
router.get('/get-me', accessTokenValidator, catchError(getMeController));
router.patch(
  '/update-me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeRequest>(['decodeAuthorization', 'name', 'date_of_birth', 'avatar']),
  catchError(updateMeController)
);

router.get(
  '/get-profile/:id',
  getProfileValidator,
  accessTokenValidator,
  verifiedUserValidator,
  catchError(getProfileController)
);

router.post('/change-password', accessTokenValidator, changePasswordValidator, catchError(changePasswordController));

export default router;
