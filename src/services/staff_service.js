const Stuff = require('../models/staff')
module.exports = {
	async findAll({name, email, phone}) {
		const finder = {};
		if(name) {
			finder.name = name;
		}
		if(email) {
			finder.email = email;
		}
		if(phone) {
			finder.phone = phone;
		}

		console.log(finder, Object.keys(finder).length);

		return Stuff.findAll(Object.keys(finder).length !== 0 ? { where: finder } : undefined);
	},
	async findOne(id) {
		return Stuff.findOne({where: {id}});
	},

	async update(id, {name, email, phone}) {
		await Stuff.update({
			name,
			email,
			phone,
		},{
			where: { id}
		})
		return Stuff.findOne({where: {id}});
	},

	async create({name, email, phone}) {
		return Stuff.create({
			name,
			email,
			phone,
		});
	},

	async delete(id) {
		return Stuff.destroy({where: { id }});
	}
}
