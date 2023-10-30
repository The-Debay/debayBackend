const { date } = require("joi");
const { client } = require("./radies");

exports.getRadiesValue = async (key) => {
    let value = await client.get(key);
    return value
}

exports.setRadiesValue = async (key,data) => {
    try {
        let value = await client.get(key,data);
        return value
    } catch (error) {
        return  error   
    }
}

exports.setRadiesHSetValue  = async (key,date) => {
    try {
        let value = await client.hSet(key,data);
        return value
    } catch (error) {
        return  error   
    }
}

exports.getRadiesHSetValue = async ( key ) => {
    try {
        let value = await client.hGetAll(key);
        return JSON.stringify(value, null, 2) 
    } catch (error) {
        return  error   
    }
}