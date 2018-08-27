const express = require('express');
const router = express.Router();

// PG SETUP
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'message_board', // name of database
    host: 'localhost',
    port: 5432,
    max: 10, // max number of concurrent connections
    idleTimeoutMillis: 10000 // attepmt to connect for 10 seconds
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('postgresql connected!!!');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});

router.post('/', function (req, res) {
    const messageToAdd = req.body; // This the data we sent
    console.log('In POST route - product:', messageToAdd); // Has a name, size and cost
    const query = 'INSERT INTO "messages" ("name", "message") VALUES ($1, $2);';
    // $ with index (e.g. $1) will help improve the security of your db
    // Avoids SQL injection -- see bobby drop table comic
    pool.query(query, [messageToAdd.name, messageToAdd.message]).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

// http://localhost:5002/shoes will go here
router.get('/', function (req, res) {
    console.log('In GET route');
    // The query we want to run
    const query = 'SELECT * FROM "messages";';
    pool.query(query).then((results) => {
        console.log(results); // This is an object
        res.send(results.rows); // result.rows is an Array of shoes
    }).catch((error) => {
        console.log('Error making GET', error);
        res.sendStatus(500);
    });
}); // END GET ROUTE

module.exports = router;