import { Request, RequestHandler, Response } from 'express';
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
import ClassesService from '~/services/classServices';

export const createClassController = async (req: Request<any, any, ClassRequest>, res: Response) => {
  const result = await ClassesService.createNewClass(req.body);
  res.status(200).json({
    result,
    message: 'Create new tweet suscess'
  });
};
export const acceptMemberClassController = async (req: Request<any, any, AcceptClassRequest>, res: Response) => {
  const result = await ClassesService.acceptMemberClass(req.body);
  res.status(200).json({
    result,
    message: 'accepet member class suscess'
  });
};
export const joinMemberClassController = async (req: Request<any, any, jointClassRequest>, res: Response) => {
  const result = await ClassesService.jointMemberClass(req.body);
  res.status(200).json({
    result,
    message: 'Join classes suscess'
  });
};
export const getClassPendingController = async (req: Request<any, any, findClassPending>, res: Response) => {
  const result = await ClassesService.getClassPendingClass(req.body);
  res.status(200).json({
    result,
    message: 'get member class pending suscess'
  });
};
export const getClassAcceptController = async (req: Request<any, any, findClassAccept>, res: Response) => {
  const result = await ClassesService.getClassAcceptClass(req.body);
  res.status(200).json({
    result,
    message: 'get member class accept suscess'
  });
};
interface FindClassByCodeParams {
  code: string;
}
export const findClassByCodeController = async (req: Request<any, any, findClassCode>, res: Response) => {
  // Lấy giá trị từ req.params

  // Gọi hàm với giá trị từ params
  const result = await ClassesService.getClassbyCode(req.body);

  res.status(200).json({
    result,
    message: 'Get member class accept success'
  });
};

export const getClassController = async (req: Request<any, any, GetClassRequest>, res: Response) => {
  const result = await ClassesService.getMyClass(req.body);
  res.status(200).json({
    result,
    message: 'Get member class accept success'
  });
};

export const getMeetingTokenController = async (req: Request<any, any, GetMeetingTokenRequest>, res: Response) => {
  const token = await ClassesService.getMeetingToken(req.body);
  res.status(200).json({
    token,
    message: 'Get meeting token success'
  });
};
