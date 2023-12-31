import User from '../../../models/User'
import Group from '../../../models/Group'


export async function  userHaveAccess(email:string) {

  const user:any = await User.findOne({email})

  // El usuario no existe
  if(!user) return {access: false, user:null}

  // El usuario existe pero está eliminado/baneado
  if(user.isDeleted) return {access: false, user}

  // Indicamos online

  user.status = 'online'
  await user.save()

  // Encontramos el grupo al que pertenece

  const group = await Group.find({
    $and: [
      {groupNumber: user.group},
      {cohort: user.cohort}
    ]
  })

  // el usuario existe y no esta eliminado/baneado
  return {
    access: true, 
    user,
    group
  }
}

// valida usuario y lanza un un error si no cumple
export function validateUser(userData: any){
 
  if(!userData.name) throw new Error("The name is undefined")
  if(!userData.cohort) throw new Error("The cohort is undefined")
  if(!userData.group) throw new Error("The group is undefined")
}