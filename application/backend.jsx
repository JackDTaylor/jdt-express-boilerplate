import express from 'express';

const base = '/utils/todo';
const app = express();

app.route(`${base}/api`)
.get(function(req, res) {
	res.send('Get a random book');
});

app.listen(3000);