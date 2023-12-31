import { prop, getModelForClass, Severity } from '@typegoose/typegoose'
import mongoose, { ObjectId } from 'mongoose'

class Group {
  
  // 02, 01
  @prop({required: true})
  groupNumber: string

  @prop({default: null, allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed})
  idGroupTA: ObjectId

  @prop({default: null})
  TAname: string

  @prop({required: true})
  cohort: string

  // obligatorio para todas las colecciones
  @prop({required: true, default: false})
  isDeleted: boolean

}

const GroupModel = getModelForClass(Group)

export default GroupModel