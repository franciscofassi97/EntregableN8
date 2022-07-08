const ContenedorMongo = require("../../contenedores/ContenedorMongo");
const mongoose = require("mongoose");


const autorSchema = new mongoose.Schema(
	{
		nombre: { type: String },
		apellido: { type: String },
		edad: { type: Number },
		alias: { type: String },
		avatar: { type: String },
		mail: { type: String },
	});

const mensajesSchema = new mongoose.Schema(
	{
		mensaje: { type: String },
		autor: { type: autorSchema, _id: true },
		date: { type: String },
	},
	{ timestamps: true }
);

const Mensajes = mongoose.model("mensajes", mensajesSchema);

class ContenedorMensajesMongo extends ContenedorMongo {
	constructor(schema) {
		super(schema);
	}
}

const contenedorMensajesMongo = new ContenedorMensajesMongo(Mensajes);

module.exports = contenedorMensajesMongo;