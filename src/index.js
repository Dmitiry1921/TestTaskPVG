const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/db');
const app = express();

const staffController = require('./network/controllers/staff_controller')

const port = 3000;

db.sync().then(() => {
	console.log('connected to database')
}).catch((err) => {
	console.log(err)
});

app.use(bodyParser.json())

app.use('/stuff', staffController);

app.listen(port, () => {
	console.log(`Server app listening on port ${port}`)
})
