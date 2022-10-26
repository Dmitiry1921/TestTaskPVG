const { faker } = require('@faker-js/faker');

const fetchAPI = require('./units/network');


function createStuff() {
	return fetchAPI('POST', '/stuff', {
		name: faker.internet.userName(),
		email: faker.internet.email(),
		phone: faker.phone.number(),
	})
}

describe('Stuff API tests', () => {
	let stuff1;
	let stuff2;
	let stuff3;
	let stuff4;
	let stuff5;
	let stuff6;
	describe('POST /stuff', () => {
		it('should create new stuff in db', async () => {
			const result = await Promise.all([
				createStuff(),
				createStuff(),
				createStuff(),
				createStuff(),
				createStuff(),
				createStuff(),
			]);

			result.forEach(stuff => {
				expect(stuff).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						name: expect.any(String),
						email: expect.any(String),
						phone: expect.any(String),
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					}),
				);
			});
			[
				stuff1,
				stuff2,
				stuff3,
				stuff4,
				stuff5,
				stuff6,
			] = result;
		});
	});
	describe('GET /stuff', () => {
		it('should return all stuff', async () => {
			const res = await fetchAPI('GET', '/stuff');
			expect(res).toEqual(expect.arrayContaining([
				expect.objectContaining(stuff1),
				expect.objectContaining(stuff2),
				expect.objectContaining(stuff3),
				expect.objectContaining(stuff4),
				expect.objectContaining(stuff5),
				expect.objectContaining(stuff6),
			]))
		});
	});
	describe('GET /stuff/:id', () => {
		it('should return one stuff by id', async () => {
			const res = await fetchAPI('GET', `/stuff/${stuff5.id}`);
			expect(res).toEqual(expect.objectContaining(stuff5));
		});
	});
	describe('PUT /stuff/:id', () => {
		it('should update new stuff in db', async () => {
			const newName = faker.internet.userName();
			const expected = {
				...stuff3,
				name: newName,
			}
			const res = await fetchAPI('PUT', `/stuff/${stuff3.id}`, {
				...stuff3,
				name: newName,
			});
			delete res.updatedAt;
			delete expected.updatedAt;
			expect(res).toEqual(expect.objectContaining(expected));
		});
	});
	describe('GET /stuff?phone=data', () => {
		it('should get stuff list with ?phone=data', async () => {
			const res = await fetchAPI('GET', `/stuff/?phone=${stuff2.phone}`);
			expect(res).toEqual(expect.arrayContaining([
				expect.objectContaining(stuff2)
			]));
		});
	});
	describe('GET /stuff?email=data', () => {
		it('should get stuff list with ?email=data', async () => {
			const res = await fetchAPI('GET', `/stuff/?email=${stuff4.email}`);
			expect(res).toEqual(expect.arrayContaining([
				expect.objectContaining(stuff4)
			]));
		});
	});
	describe('GET /stuff?name=data', () => {
		it('should get stuff list with ?name=data', async () => {
			const res = await fetchAPI('GET', `/stuff/?name=${stuff1.name}`);
			expect(res).toEqual(expect.arrayContaining([
				expect.objectContaining(stuff1)
			]));
		});
	});
	describe('DELETE /stuff/:id', () => {
		it('should create new stuff in db', async () => {
			await Promise.all([
				fetchAPI('DELETE', `/stuff/${stuff1.id}`),
				fetchAPI('DELETE', `/stuff/${stuff2.id}`),
				fetchAPI('DELETE', `/stuff/${stuff3.id}`),
				fetchAPI('DELETE', `/stuff/${stuff4.id}`),
				fetchAPI('DELETE', `/stuff/${stuff5.id}`),
				fetchAPI('DELETE', `/stuff/${stuff6.id}`),
			]);

			const res2 = await fetchAPI('GET', '/stuff');

			expect(res2).not.toEqual(expect.arrayContaining([
				expect.objectContaining(stuff1),
				expect.objectContaining(stuff2),
				expect.objectContaining(stuff3),
				expect.objectContaining(stuff4),
				expect.objectContaining(stuff5),
				expect.objectContaining(stuff6),
			]))
		});
	});
});
