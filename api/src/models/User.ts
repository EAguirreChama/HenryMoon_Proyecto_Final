import { prop, pre, getModelForClass, Severity } from '@typegoose/typegoose'
import { isCohortValid } from '../helpers/validations'
import mongoose from 'mongoose';

@pre<User>('save', async function (next) {
  try {
    // Verificar alguna condición antes de permitir el guardado
    if (!isCohortValid(this.cohort)) {
      throw new Error('Cohort Name not allowed. Cannot save the document.');
    }
    
    this.cohort = this.cohort.toLocaleLowerCase()

    // Si no hay errores, llamar a `next` para continuar con el proceso de guardado
    next();
  } catch (error:any) {
    // Si hay un error, llamar a `next` con el error para evitar el guardado
    next(error);
  }
})


export class User {

  @prop({required: true, unique: true, lowercase: true })
  email: string

  @prop()
  password: string

  @prop()
  username: string

  // Cambia a mayúscula las primeras letras, de nada ;)
  @prop({required: true, set: (val: string) => val.toLowerCase().split(' ').map(s => s[0].toUpperCase() + s.substring(1)).join(' ')})
  name: string

  // También cambia a mayúscula las primeras letras.
  @prop({set: (val: string) => val.toLowerCase().split(' ').map(s => s[0].toUpperCase() + s.substring(1)).join(' ')})
  lastName: string
  
  @prop({required: true})
  cohort: string
  
  @prop({required: true})
  group: string

  // Fecha de nacimiento cualquier formato -> 10/12/2000 2000-10-06
  @prop()
  birthdate: Date

  // país
  @prop()
  country: string

  // Método de autenticación, un objeto con los métodos
  // {type: 'google', token: 'valor del token'}
  @prop({ allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed })
  authMethod: object

  @prop({required: true, default: false})
  isBanned: boolean

  @prop({required: true, default: false})
  isDeleted: boolean

  @prop()
  image: string

  // ! ////////

  // New chat props

  @prop({default: {test: 'required_property'}, allowMixed: Severity.ALLOW, type: () => mongoose.Schema.Types.Mixed})
  newMessages: object

  @prop({default: 'offline'})
  status: string

  // ! ////////

  // TA props

  @prop({default: false})
  isTA: boolean

  @prop({default: null})
  TAcohort: string

  @prop({default: null})
  TAgroup: string

  // ! ///////

}


const UserModel = getModelForClass(User)

export default UserModel