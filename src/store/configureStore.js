const isProduction = process.env.NODE_ENV == 'production';
module.exports = require(`.configStore.${isProduction ? 'prd' : 'dev'}`);