var pg = require('pg');
var connectionString = process.env.DATABASE_URL ;

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE login( ' +
    ' rowId SERIAL PRIMARY KEY,' +
    ' cookieId VARCHAR(40) not null,' +
    ' value VARCHAR(1000)' +
    ' cookieExpires VARCHAR(20)'
);
query.on('end', function() { client.end(); });