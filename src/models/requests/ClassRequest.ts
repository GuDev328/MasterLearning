import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { ClassTypeEnum, MemberClassTypeEnum } from "~/constants/enum";

export interface ClassRequest {
    type: ClassTypeEnum;
    name: string;
    description:string;
    topic:string;
    password:string;
    code:string;
  }
  export interface AcceptClassRequest {
    id: ObjectId;
  }
  export interface jointClassRequest {
    decodeAuthorization: JwtPayload;
    classId: ObjectId;
    password:string;
  }
  export interface findClassPending {
    classId: ObjectId;
  }
  export interface findClassAccept {
    classId: ObjectId;
  }
  export interface findClassCode {
    code: string;
  }
  
  