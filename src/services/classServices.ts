import { AcceptClassRequest, ClassRequest, findClassAccept, findClassCode, findClassPending, jointClassRequest } from "~/models/requests/ClassRequest";
import Classes from "~/models/schemas/Classes";
import db from "./databaseServices";
import { ClassTypeEnum, MemberClassTypeEnum } from "~/constants/enum";
import Members from "~/models/schemas/MemberClasses";
import { ObjectId } from "mongodb";
import { ErrorWithStatus } from "~/models/Errors";
import { httpStatus } from "~/constants/httpStatus";

class ClassesService {
    constructor() {}
    async createNewClass(payload: ClassRequest){
        if (!Object.values(ClassTypeEnum).includes(payload.type)) {
            throw new ErrorWithStatus({
                message: 'Type not found',
                status: httpStatus.BAD_REQUEST
              });
        }
        const generateCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = '';
            for (let i = 0; i < 5; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return code;
        };
        if(payload.type == ClassTypeEnum.Security){
            if(payload.password == "" || !payload.password){
                throw new ErrorWithStatus({
                    message: 'require password',
                    status: httpStatus.BAD_REQUEST
                  });
            }
        }
        const classes = new Classes({
            name : payload.name,
            type : payload.type,
            teacher_id:payload.decodeAuthorization.payload.userId,
            description : payload.description,
            topic : payload.topic,
            password:payload.password,
            code : generateCode(),
          });
          const createClass = await db.classes.insertOne(classes);
          return createClass.insertedId;
    }
    async acceptMemberClass(payload:AcceptClassRequest){
        const member = await db.members.findOne({
            _id: new ObjectId(payload.id),
        });
        
        if (!member) {
            throw new ErrorWithStatus({
                message: 'member not found',
                status: httpStatus.BAD_REQUEST
              });
        } else {
           const classes = await db.classes.findOne({_id:new ObjectId(member.class_id),teacher_id:payload.decodeAuthorization.payload.userId});
           if(!classes){
            throw new ErrorWithStatus({
                message: 'the teacher not right',
                status: httpStatus.BAD_REQUEST
              });
           }
            const updateMember = await db.members.updateOne(
                {
                    _id: new ObjectId(payload.id),
                },
                {
                    $set: { status: MemberClassTypeEnum.Accept } // Cập nhật trường status thành 'accept'
                }
            );
        
            return updateMember; // Có thể trả về kết quả của update nếu cần
        }

    }
    async jointMemberClass(payload:jointClassRequest){
        const userId = new ObjectId(payload.decodeAuthorization.payload.userId);
        const classId = new ObjectId(payload.classId);
        const user = await db.users.findOne({ _id: userId });
        if (!user) {
            throw new ErrorWithStatus({
                message: 'User not found',
                status: httpStatus.BAD_REQUEST
              });
        }
        
        // Tìm class
        const classes = await db.classes.findOne({ _id: classId });

        if (!classes) {
            throw new ErrorWithStatus({
                message: 'Class not found',
                status: httpStatus.BAD_REQUEST
              });
        }
        const studentExits = await db.members.findOne({user_id:userId,class_id:classId})
        if(studentExits){
            throw new ErrorWithStatus({
                message: 'User exits',
                status: httpStatus.BAD_REQUEST
              });
        }
        if(classes.type == ClassTypeEnum.Public){
            const member = new Members({
                user_id : userId,
                class_id : classId,
                status: MemberClassTypeEnum.Accept
              });
              const createClass = await db.members.insertOne(member);
              return createClass.insertedId;
        }else if(classes.type == ClassTypeEnum.Pending){
            const member = new Members({
                user_id : userId,
                class_id : classId,
                status: MemberClassTypeEnum.Pending
              });
              const createClass = await db.members.insertOne(member);
              return createClass.insertedId;
        }else if(classes.type == ClassTypeEnum.Security ){
            if(classes.password != payload.password){
                throw new ErrorWithStatus({
                    message: 'Password not correct',
                    status: httpStatus.BAD_REQUEST
                  });
            }else{
                const member = new Members({
                    user_id : userId,
                    class_id : classId,
                    status: MemberClassTypeEnum.Accept
                  });
                  const createClass = await db.members.insertOne(member);
                  return createClass.insertedId;
            }
        }
     
    }
    async getClassPendingClass (payload:findClassPending){
        const classes = await db.classes.findOne({_id:new ObjectId(payload.classId),teacher_id:payload.decodeAuthorization.payload.userId});
        if(classes){
            const member = await db.members.find({ class_id: new ObjectId(payload.classId),status:MemberClassTypeEnum.Pending }).toArray();;
            return member;
        }else{
            throw new ErrorWithStatus({
                message: 'u cant get',
                status: httpStatus.BAD_REQUEST
              });
        }
    }
    async getClassAcceptClass(payload:findClassAccept){
        const member = await db.members.find({ class_id: new ObjectId(payload.classId),status:MemberClassTypeEnum.Accept }).toArray();;
        return member;
    }
    async getClassbyCode(payload:findClassCode){
        const member = await db.classes.findOne({ code: payload.code});
        return member;
    }
}
const classService = new ClassesService();
export default classService;