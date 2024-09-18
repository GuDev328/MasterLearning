import { Router } from "express";
import { acceptMemberClassController, createClassController, findClassByCodeController, getClassAcceptController, getClassController, getClassPendingController, joinMemberClassController } from "~/controllers/classControllers";
import { catchError } from "~/utils/handler";

const router = Router();

router.post(
    '/create',catchError(createClassController)
  );
  router.post(
    '/join-class',catchError(joinMemberClassController)
  );
  router.post(
    '/accept-class',catchError(acceptMemberClassController)
  );
  router.post(
    '/get-member-pending',catchError(getClassPendingController)
  );
  router.post(
    '/get-member-accept',catchError(getClassAcceptController)
  );
  router.post(
    '/find-by-code',catchError(findClassByCodeController)
  );
  router.get(
    '/',catchError(getClassController)
  );
export default router;