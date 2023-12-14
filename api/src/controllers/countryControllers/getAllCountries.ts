import Country from '../../models/Country'

const getAllCountries = async () => {

  const rankings = await Country.find({isDeleted: false})

  return rankings
}

export default getAllCountries