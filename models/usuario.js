module.exports = function (app) {

    const db = require('../middleware/dbconnection');
    const Schema = require('mongoose').Schema;

    const contato = Schema({
        nome: String,
        email: String
    });

    const usuario = Schema({
        nome: { type: String, required: true },
        email: { type: String, required: true, index: {unique:true}},
        contatos: [contato]
    });

    db.model('usuarios', usuario);

};