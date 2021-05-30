const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require('@admin-bro/mongoose')

const mongoose = require ('mongoose');
const Usuario = require ('../models/usuario')
const Exercicio = require ('../models/exercicio')
const Treino = require ('../models/treino')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  resources: [Usuario, Exercicio, Treino],
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router
