import { Router } from 'express';
import {
  createTweetController,
  deleteTweetController,
  getNewsFeedController,
  getTweetChildrenController,
  getTweetController,
  updateTweetController
} from '~/controllers/tweetsControllers';
import {
  createTweetValidator,
  getNewsFeedValidator,
  getTweetChildrenValidator,
  isMemberOfClassValidator,
  isTweetOwnerValidator,
  tweetIdValidator
} from '~/middlewares/tweetsMiddlewares';
import { accessTokenValidator, isLoginValidator, verifiedUserValidator } from '~/middlewares/usersMiddlewares';
import { catchError } from '~/utils/handler';
const router = Router();

router.post(
  '/create',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  catchError(createTweetController)
);

router.post(
  '/update/:id',
  tweetIdValidator,
  accessTokenValidator,
  verifiedUserValidator,
  isTweetOwnerValidator,
  catchError(updateTweetController)
);

router.get(
  '/delete/:id',
  tweetIdValidator,
  accessTokenValidator,
  verifiedUserValidator,
  isTweetOwnerValidator,
  catchError(deleteTweetController)
);

router.get(
  '/tweet/:id',
  tweetIdValidator,
  accessTokenValidator,
  verifiedUserValidator,
  isMemberOfClassValidator,
  catchError(getTweetController)
);

/**
Header: {Authorization?: Bearer <access_token>}
Query: {limit: number, page: number, tweet_type: TweetType}
 */
router.get(
  '/tweet/:id/children',
  getTweetChildrenValidator,
  tweetIdValidator,
  accessTokenValidator,
  verifiedUserValidator,
  //isMemberOfClassValidator,
  catchError(getTweetChildrenController)
);

/**
 * Description: Get new feeds
 * Header: {Authorization: Bearer <access_token>}
 * Query: {limit: number, page: number}
 */
router.get('/', getNewsFeedValidator, accessTokenValidator, verifiedUserValidator, catchError(getNewsFeedController));
export default router;
