import { JwtPayload } from 'jsonwebtoken';
import { PointType, StudentViewRoleExercise, IAnswer } from '~/constants/enum';

export interface CreateExerciseRequest {
  decodeAuthorization: JwtPayload;
  class_id: string;
  file: string;
  password?: string;
  time_limit?: number; //minute
  deadline?: Date;
  times_to_do: number;
  time_to_enable?: Date;
  is_test?: boolean;
  student_role: StudentViewRoleExercise;
  point_type: PointType;
  max_point: number;
  answers: IAnswer[];
}
