import {RequestHandler} from 'express'
import createCountry from '../controllers/countryControllers/createCountry' 
import createManyCountries from '../controllers/countryControllers/createManyCountries' 
import getAllCountries from '../controllers/countryControllers/getAllCountries' 


export const createCountryHandler:RequestHandler = async (req, res) => {
  const countryData = req.body
  try {
    // hacer las comprobaciones aqui
    
    const newCountry = await createCountry(countryData)
    res.status(200).json(newCountry)

  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}

export const createManyCountriesHandler:RequestHandler = async (req, res) => {
  const manyCountries = req.body

  try {
    const rankings = await createManyCountries(manyCountries)
    res.status(200).json(rankings)

  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}


export const getAllCountriesHandler:RequestHandler = async (req, res) => {
  try {
    // hacer las comprobaciones aqui
    const countrys = await getAllCountries()
    res.status(200).json(countrys)

  } catch (err: any) {
    res.status(500).json({error: err.message})
  }
}
