const { client } = require("../config/radis");


exports.setRedisKey = async (key, value, expirationInSeconds) => {
  try {
    if (expirationInSeconds !== null) {
      await client.set(key, value, 'EX', expirationInSeconds);
      return true
    } else {
      await client.set(key, value);
      return true
    }
  } catch (err) {
      console.error(`Error setting key ${key}:`, err);
      return false
  }
};
  

exports.getRedisKey = async (key) => {
  try {
    const value = await client.getAsync(key);
    return value || false;
  } catch (err) {
    console.error(`Error getting key ${key}:`, err);
    return false;
  }
};


exports.deleteRedisKey = async (key) => {
    try {
        const reply = await client.del(key);
        return reply
    } catch (err) {
        console.error(`Error deleting key ${key}:`, err);
        return false
    }
};


// key examples
// for otp key = `otp__${userId} value = otp`
// for otp key = `pass__${userId} value = otp`