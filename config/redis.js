const { createClient }  =  require('redis');

const client = createClient();

const connectRedies = async () => {
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    console.log('redis connected') 
}


module.exports = {
    connectRedies,
    client
} 