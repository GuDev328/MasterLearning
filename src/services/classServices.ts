import { AcceptClassRequest, ClassRequest, findClassAccept, findClassCode, findClassPending, jointClassRequest } from "~/models/requests/ClassRequest";
import Classes from "~/models/schemas/Classes";
import db from "./databaseServices";
import { MemberClassTypeEnum } from "~/constants/enum";
import Members from "~/models/schemas/MemberClasses";
import { ObjectId } from "mongodb";
import { ErrorWithStatus } from "~/models/Errors";
import { httpStatus } from "~/constants/httpStatus";

class ClassesService {
    constructor() {}
    async createNewClass(payload: ClassRequest){
       try{
        const classes = new Classes({
            name : payload.name,
            type : payload.type,
            description : payload.description,
            topic : payload.topic, 
            code : payload.code,
          });
          const createClass = await db.classes.insertOne(classes);
          return createClass.insertedId;
       }catch(err){
            console.log(err);
       }
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
        console.log("check pay",payload)
        const userId = new ObjectId(payload.userId);
        const classId = new ObjectId(payload.classId);
        const user = await db.users.findOne({ _id: userId });
        console.log('user',user);
        if (!user) {
            throw new ErrorWithStatus({
                message: 'User not found',
                status: httpStatus.BAD_REQUEST
              });
        }

        // Tìm class
        const classes = await db.classes.findOne({ _id: classId });
        console.log('classes',classes);

        if (!classes) {
            throw new ErrorWithStatus({
                message: 'Class not found',
                status: httpStatus.BAD_REQUEST
              });
        }
        const member = new Members({
            user_id : userId,
            class_id : classId,
            status:payload?.status
          });
          const createClass = await db.members.insertOne(member);
          console.log("crea",createClass)
          return createClass.insertedId;
    }
    async getClassPendingClass (payload:findClassPending){
        const member = await db.members.find({ class_id: new ObjectId(payload.classId),status:MemberClassTypeEnum.Pending }).toArray();;
        return member;
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