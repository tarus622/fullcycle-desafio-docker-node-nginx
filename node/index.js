const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const insertInitialData = () => {
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting:', err);
            return;
        }
        const sql = `INSERT INTO people(name) values('Davi')`;
        connection.query(sql, (err) => {
            if (err) {
                console.error('Error inserting data:', err);
            } else {
                console.log('Initial data inserted');
            }
            connection.end();
        });
    });
};

insertInitialData();

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting:', err);
            res.status(500).send('Database connection error');
            return;
        }

        const sql = `SELECT * FROM people`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Database query error');
            } else {
                const namesList = results.map(person => `<li>${person.name}</li>`).join('');
                res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
            }
            connection.end();
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
