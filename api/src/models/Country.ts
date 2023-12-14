import { prop, getModelForClass } from '@typegoose/typegoose'

class Country {
  
  @prop({required: true})
  name: string

  @prop()
  image: string


  @prop({required: true, default: false})
  isDeleted: boolean

}

const GroupModel = getModelForClass(Country)

export default GroupModel