const { createClient }  =  require('redis');

const client = createClient({ legacyMode: true });

const connectRadies = async () => {
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    console.log('redies connected') 
}




module.exports = {
    connectRadies,
    client
}