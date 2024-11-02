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
import { CreateExerciseRequest, UpdateExerciseRequest } from '~/models/requests/excirseRequest';

class ExcirseServices {
  constructor() {}

  async isTeacherClass(class_id: ObjectId, user_id: ObjectId) {
    const classFind = await db.classes.findOne({ _id: class_id });
    if (!classFind) throw new ErrorWithStatus({ status: httpStatus.NOT_FOUND, message: 'Không tìm thấy lớp học' });
    if (!user_id.equals(classFind.teacher_id)) return false;
    else return true;
  }

  async isMemberClass(class_id: ObjectId, user_id: ObjectId) {
    const classFind = await db.classes.findOne({ _id: class_id });
    if (!classFind) throw new ErrorWithStatus({ status: httpStatus.NOT_FOUND, message: 'Không tìm thấy lớp học' });
    if (user_id.equals(classFind.teacher_id)) return true;
    const isMember = await db.members.findOne({
      class_id: classFind._id,
      user_id: user_id,
      status: MemberClassTypeEnum.Accept
    });
    console.log(isMember);
    if (!isMember) return false;
    else return true;
  }

  async createExcirse(payload: CreateExerciseRequest) {
    const excirse = new Excirse({
      name: payload.name,
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

  async getForTeacher({ id, user_id }: { id: ObjectId; user_id: ObjectId }) {
    const excirse = await db.excirse
      .aggregate([
        {
          $match: { _id: id }
        },
        {
          $lookup: {
            from: 'Users',
            localField: 'created_by',
            foreignField: '_id',
            as: 'created_by_info'
          }
        },
        {
          $project: {
            created_by_info: {
              password: 0,
              emailVerifyToken: 0,
              forgotPasswordToken: 0
            }
          }
        }
      ])
      .toArray();
    if (!excirse || excirse.length === 0)
      throw new ErrorWithStatus({ status: httpStatus.NOT_FOUND, message: 'Không tìm thấy' });
    const check = await this.isTeacherClass(excirse[0].class_id, user_id);
    if (!check) throw new ErrorWithStatus({ status: httpStatus.FORBIDDEN, message: 'Bạn không có quyền' });
    return excirse[0];
  }

  async getForStudent({ id, user_id }: { id: ObjectId; user_id: ObjectId }) {
    const excirse = await db.excirse
      .aggregate([
        {
          $match: { _id: id }
        },
        {
          $lookup: {
            from: 'Users',
            localField: 'created_by',
            foreignField: '_id',
            as: 'created_by_info'
          }
        },
        {
          $project: {
            answers: {
              answer: 0
            },
            created_by_info: {
              password: 0,
              emailVerifyToken: 0,
              forgotPasswordToken: 0
            }
          }
        }
      ])
      .toArray();
    if (!excirse) throw new ErrorWithStatus({ status: httpStatus.NOT_FOUND, message: 'Không tìm thấy bài tập' });
    const check = await this.isMemberClass(excirse[0].class_id, user_id);
    if (!check) throw new ErrorWithStatus({ status: httpStatus.FORBIDDEN, message: 'Bạn không là thành viên của lớp' });
    else return excirse[0];
  }

  async updateExcirse(payload: UpdateExerciseRequest) {
    const user_id = new ObjectId(payload.decodeAuthorization.payload.userId);
    const excirse = await db.excirse.findOne({ _id: new ObjectId(payload.excirse_id) });
    if (!excirse) throw new ErrorWithStatus({ status: httpStatus.NOT_FOUND, message: 'Không tìm thấy' });
    const check = await this.isTeacherClass(excirse.class_id, user_id);
    if (!check) throw new ErrorWithStatus({ status: httpStatus.FORBIDDEN, message: 'Bạn không có quyền' });
    const saveData = await db.excirse.findOneAndUpdate(
      { _id: new ObjectId(payload.excirse_id) },
      {
        $set: {
          name: payload.name,
          file: payload.file,
          password: payload.password,
          time_limit: payload.time_limit,
          deadline: payload.deadline,
          times_to_do: payload.times_to_do,
          time_to_enable: payload.time_to_enable,
          is_test: payload.is_test,
          student_role: payload.student_role,
          point_type: payload.point_type,
          max_point: payload.max_point,
          answers: payload.answers
        }
      },
      { returnDocument: 'after' }
    );
    return saveData;
  }

  async deleteExcirse(id: ObjectId, user_id: ObjectId) {
    const excirse = await db.excirse.findOne({ _id: new ObjectId(id) });
    if (!excirse) throw new ErrorWithStatus({ status: httpStatus.NOT_FOUND, message: 'Không tìm thấy' });
    const check = await this.isTeacherClass(excirse.class_id, user_id);
    if (!check) throw new ErrorWithStatus({ status: httpStatus.FORBIDDEN, message: 'Bạn không có quyền' });
    const result = await db.excirse.findOneAndDelete({ _id: id });
    return result;
  }

  async getListClassForStudent(user_id: ObjectId, class_id: ObjectId) {
    const check = await this.isMemberClass(class_id, user_id);
    if (!check) throw new ErrorWithStatus({ status: httpStatus.FORBIDDEN, message: 'Bạn không là thành viên của lớp' });
    const excirse = await db.excirse
      .aggregate([
        {
          $match: { class_id: class_id }
        },
        {
          $lookup: {
            from: 'Users',
            localField: 'created_by',
            foreignField: '_id',
            as: 'created_by_info'
          }
        },
        {
          $project: {
            answers: {
              answer: 0
            },
            created_by_info: {
              password: 0,
              emailVerifyToken: 0,
              forgotPasswordToken: 0
            }
          }
        }
      ])
      .toArray();
    return excirse;
  }

  async getListClassForTeacher(user_id: ObjectId, class_id: ObjectId) {
    const check = await this.isTeacherClass(class_id, user_id);
    if (!check) throw new ErrorWithStatus({ status: httpStatus.FORBIDDEN, message: 'Bạn không là thành viên của lớp' });
    const excirse = await db.excirse
      .aggregate([
        {
          $match: { class_id: class_id }
        },
        {
          $lookup: {
            from: 'Users',
            localField: 'created_by',
            foreignField: '_id',
            as: 'created_by_info'
          }
        },
        {
          $project: {
            created_by_info: {
              password: 0,
              emailVerifyToken: 0,
              forgotPasswordToken: 0
            }
          }
        }
      ])
      .toArray();
    return excirse;
  }
}
const excirseServices = new ExcirseServices();
export default excirseServices;
