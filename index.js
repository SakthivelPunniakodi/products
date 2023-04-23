const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { app } = require("./config/lib/express.js");
const config = require("./config/config.json");
const fs=require('fs');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
global.config = config;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
const router = require("./router/router.js");
app.use(router);

const port = process.env.port || 7070;
const host = process.env.DB_HOST || 'localhost';

let server = app.listen(port, host, function () {
    console.log(`Server stated at ${host}:${port}`)
});

server.setTimeout(1500000);
server.keepAliveTimeout = 60000;
module.exports = server
