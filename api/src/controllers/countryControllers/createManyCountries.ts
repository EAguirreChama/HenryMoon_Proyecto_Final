import Country from '../../models/Country'
import * as fs from 'fs';


const createManyCountry = async (manyCountriessData: any) => {
  const newCountrys = await Country.insertMany(manyCountriessData)

  return newCountrys
}

export default createManyCountry