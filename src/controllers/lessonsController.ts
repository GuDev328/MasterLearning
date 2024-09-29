import { Request, Response } from "express";
import { DeleteLesson, findLesson, LessonCreateRequest, LessonUpdateRequest } from "~/models/requests/LessonRequest";
import lessonsService from "~/services/lessonServices";

export const createLessonController = async (req: Request<any, any, LessonCreateRequest>, res: Response) => {
    const result = await lessonsService.createNewLesson(req.body);
    res.status(200).json({
      result,
      message: 'Create new lesson suscess'
    });
  };
  export const getLessonByClassController = async (req: Request<any, any, findLesson>, res: Response) => {
    const result = await lessonsService.getLessonbyClass(req.body);
    res.status(200).json({
      result,
      message: 'get lesson by class id suscess'
    });
  };
  export const updateLessonController = async (req: Request<any, any, LessonUpdateRequest>, res: Response) => {
    const result = await lessonsService.updateLesson(req.body);
    res.status(200).json({
      result,
      message: 'update lesson suscess'
    });
  };
  export const deleteLessonController = async (req: Request<any, any, DeleteLesson>, res: Response) => {
    const result = await lessonsService.deleteLesson(req.body);
    res.status(200).json({
      result,
      message: 'delete lesson suscess'
    });
  };