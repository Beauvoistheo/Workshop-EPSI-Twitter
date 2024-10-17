const express = require('express')
const db = require('./assets/js/db');
const app = express()
const port = "3000"

app.get('/', (req, res) => {
	console.log('Hello world')
})

app.get('/bdd', async (req, res) => {
	const result = await db.query("SELECT * FROM twitter");
    res.status(200).render("index", { result });
})
  
app.get('/record', async (req, res) => {
	const negative = await db.query("SELECT id,subject,message FROM twitter150 WHERE émotion = 'Negative'");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})