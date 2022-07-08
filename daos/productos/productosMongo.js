const ContenedorMongo = require("../../contenedores/ContenedorMongo");
const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema(
	{
		title: { type: String },
		price: { type: String },
		thumbnail: { type: String },
	},
	{ timestamps: true }
);

const Productos = mongoose.model("productos", productosSchema);

class ContenedorProductosMongo extends ContenedorMongo {
	constructor(schema) {
		super(schema);
	}
}

const contenedorProductosMongo = new ContenedorProductosMongo(Productos);

module.exports = contenedorProductosMongo;