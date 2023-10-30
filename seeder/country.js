const Country = require("../models/countryModel")
const { countryArr } = require("../utils/constant")
countryArr


const setCountries = async () => {
    Country.bulkCreate(countryArr).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
        
    });

}
setCountries()