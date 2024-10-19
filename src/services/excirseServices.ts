import Excirse from '~/models/schemas/Excirse';
import {
  AcceptClassRequest,
  ClassRequest,
  findClassAccept,
  findClassCode,
  findClassPending,
  GetClassRequest,
  GetMeetingTokenRequest,
  jointClassRequest
} from '~/models/requests/ClassRequest';
import Classes from '~/models/schemas/Classes';
import db from './databaseServices';
import { ClassTypeEnum, LessonTypeEnum, MemberClassTypeEnum } from '~/constants/enum';
import Members from '~/models/schemas/MemberClasses';
import { ObjectId } from 'mongodb';
import { ErrorWithStatus } from '~/models/Errors';
import { httpStatus } from '~/constants/httpStatus';
import { env } from '~/constants/config';
import { RtcRole, RtcTokenBuilder } from 'agora-token';
import { DeleteLesson, findLesson, LessonCreateRequest, LessonUpdateRequest } from '~/models/requests/LessonRequest';
import Lessons from '~/models/schemas/Lessons';
import { CreateExerciseRequest } from '~/models/requests/excirseRequest';

class ExcirseServices {
  constructor() {}
  async createExcirse(payload: CreateExerciseRequest) {
    const excirse = new Excirse({
      created_by: payload.decodeAuthorization.payload.userId,
      class_id: new ObjectId(payload.class_id),
      file: payload.file,
      times_to_do: payload.times_to_do,
      password: payload.password,
      time_limit: payload.time_limit,
      deadline: payload.deadline,
      time_to_enable: payload.time_to_enable,
      is_test: payload.is_test,
      student_role: payload.student_role,
      point_type: payload.point_type,
      max_point: payload.max_point,
      answers: payload.answers
    });
    const createExcirse = await db.excirse.insertOne(excirse);
    return createExcirse.insertedId;
  }
}
const excirseServices = new ExcirseServices();
export default excirseServices;
