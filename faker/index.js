const { faker } = require("@faker-js/faker")

const prodoductosMock = () => {
    return {
        title: faker.lorem.word(),
        price: faker.random.numeric(3),
        thumbnail: faker.image.abstract(200, 150, true)
    }
}

const prodoductos = (cantidad) => {
    let productos = [];
    for (let i = 0; i < cantidad; i++) {
        productos.push(prodoductosMock());
    }
    return productos;
};

module.exports = { prodoductos };