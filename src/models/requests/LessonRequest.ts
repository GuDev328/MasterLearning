import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { LessonTypeEnum } from "~/constants/enum";

export interface LessonCreateRequest{
    decodeAuthorization: JwtPayload;
    class_id:string;
    name: string;
    description:string
    type: LessonTypeEnum;
    media:string;
}
export interface LessonUpdateRequest{
    decodeAuthorization: JwtPayload;
    id:string;
    class_id?:ObjectId[];
    name?: string;
    description?:string
    type?: LessonTypeEnum;
    media?:string;
    updated_at:Date
}
export interface LessonDeleteRequest{
    id:string
}
export interface DeleteLesson{
    decodeAuthorization: JwtPayload;
    id:string
}
export interface findLesson{
    class_id:string;
}