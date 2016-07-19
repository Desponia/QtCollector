var pg = require('pg');
var express = require('express');
var cookieParser = require('cookie-parser');

var connectionString = 'postgres://lzcvcflzbvvwcw:nPEEpYmhuDKAOuA_RNIxfB4GI_@ec2-54-221-246-85.compute-1.amazonaws.com:5432/d41lqf8abjm58s?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';

var params = {
    host: 'ec2-54-221-246-85.compute-1.amazonaws.com'
    ,user: 'lzcvcflzbvvwcw'
    ,password: 'nPEEpYmhuDKAOuA_RNIxfB4GI_'
    ,database: 'd41lqf8abjm58s'
    ,port: '5432'
    ,ssl: true
}
var app = express();

var client = new pg.Client(params);
client.connect();

var query = client.query('CREATE TABLE taglog( ' +
    ' rowId SERIAL PRIMARY KEY,' +
' cookieId VARCHAR(40) not null,' +
' value VARCHAR(1000),' +
' cookieExpires VARCHAR(20))'
);

query.on('end', function() { client.end(); });