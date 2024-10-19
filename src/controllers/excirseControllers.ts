import { Request, Response } from 'express';
import { CreateExerciseRequest } from '~/models/requests/excirseRequest';
import { DeleteLesson, findLesson, LessonCreateRequest, LessonUpdateRequest } from '~/models/requests/LessonRequest';
import lessonsService from '~/services/lessonServices';
import excirseServices from '~/services/excirseServices';

export const createExerciseController = async (req: Request<any, any, CreateExerciseRequest>, res: Response) => {
  const result = await excirseServices.createExcirse(req.body);
  res.status(200).json({
    result,
    message: 'Tạo bài tập thành công'
  });
};
