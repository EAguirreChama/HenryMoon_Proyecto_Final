  
export default {
  beautifyCountries: (countriesData) => {
    const countriesArr = []
    for (let i = 0; i < countriesData.length; i++) {
      countriesArr.push(countriesData[i].name)
    }
    countriesArr.sort()
    return countriesArr
  }
}