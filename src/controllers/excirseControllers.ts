import { Request, Response } from 'express';
import { CreateExerciseRequest, UpdateExerciseRequest } from '~/models/requests/excirseRequest';
import { DeleteLesson, findLesson, LessonCreateRequest, LessonUpdateRequest } from '~/models/requests/LessonRequest';
import lessonsService from '~/services/lessonServices';
import excirseServices from '~/services/excirseServices';
import { ObjectId } from 'mongodb';

export const createExerciseController = async (req: Request<any, any, CreateExerciseRequest>, res: Response) => {
  const result = await excirseServices.createExcirse(req.body);
  res.status(200).json({
    result,
    message: 'Tạo bài tập thành công'
  });
};

export const updateExerciseController = async (req: Request<any, any, UpdateExerciseRequest>, res: Response) => {
  const result = await excirseServices.updateExcirse(req.body);
  res.status(200).json({
    result,
    message: 'Cập nhật bài tập thành công'
  });
};

export const getForTeacherController = async (req: Request<any, any, UpdateExerciseRequest>, res: Response) => {
  const user_id = new ObjectId(req.body.decodeAuthorization.payload.userId);
  const id = new ObjectId(req.params.id);
  const result = await excirseServices.getForTeacher({ id, user_id });
  res.status(200).json({
    result,
    message: 'Lấy thông tin bài tập thành công'
  });
};

export const getForStudentController = async (req: Request<any, any, UpdateExerciseRequest>, res: Response) => {
  const user_id = new ObjectId(req.body.decodeAuthorization.payload.userId);
  const id = new ObjectId(req.params.id);
  const result = await excirseServices.getForStudent({ id, user_id });
  res.status(200).json({
    result,
    message: 'Lấy thông tin bài tập thành công'
  });
};

export const deleteExerciseController = async (req: Request, res: Response) => {
  const user_id = new ObjectId(req.body.decodeAuthorization.payload.userId);
  const id = new ObjectId(req.body.id);
  const result = await excirseServices.deleteExcirse(id, user_id);
  res.status(200).json({
    result,
    message: 'Xoá bài tập thành công'
  });
};

export const getForTeacherExerciseController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req.body.decodeAuthorization.payload.userId;
  const result = await excirseServices.getForTeacher({
    id: new ObjectId(id),
    user_id: new ObjectId(user_id)
  });
  res.status(200).json({
    result,
    message: 'Lấy thông tin bài tập thành công'
  });
};
