import { ObjectId } from "mongodb";
import { ClassTypeEnum, MemberClassTypeEnum } from "~/constants/enum";

export interface ClassRequest {
    type: ClassTypeEnum;
    name: string;
    description:string;
    topic:string;
    code:string;
  }
  export interface AcceptClassRequest {
    id: ObjectId;
  }
  export interface jointClassRequest {
    userId: ObjectId;
    classId: ObjectId;
    status:MemberClassTypeEnum
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
  
  