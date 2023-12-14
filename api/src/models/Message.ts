import { prop, getModelForClass, Severity } from '@typegoose/typegoose'
import mongoose from 'mongoose'

class Message {

  @prop()
  content: string

  @prop({allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed})
  from: object

  @prop()
  socketid: string

  @prop()
  time: string

  @prop()
  date: string

  @prop()
  to: string

}

const MessageModel = getModelForClass(Message)

export default MessageModel