import Country from '../../models/Country'

const createRanking = async (countryData: any) => {
  const newRanking = await Country.create(countryData)

  return newRanking
}

export default createRanking