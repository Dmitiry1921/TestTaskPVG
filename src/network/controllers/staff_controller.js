const {Router} = require('express')
const Stuff = require('../../services/staff_service');

const stuff = Router();

stuff.get('/', async  (req, res) => {
	try {
		console.log(req.query)
		const data = await Stuff.findAll(req.query);
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({error: 'Internal Server Error'})
	}
});
stuff.get('/:id', async  (req, res) => {
	try {
		const data = await Stuff.findOne(req.params.id);
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({error: 'Internal Server Error'})
	}
});
stuff.post('/', async  (req, res) => {
	try {
		const data = await Stuff.create(req.body);
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({error: 'Internal Server Error'})
	}
});
stuff.put('/:id', async  (req, res) => {
	try {
		const data = await Stuff.update(req.params.id, req.body);
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({error: 'Internal Server Error'})
	}
});
stuff.delete('/:id', async  (req, res) => {
	try {
		const data = await Stuff.delete(req.params.id);
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({error: 'Internal Server Error'})
	}
});

module.exports = stuff;
