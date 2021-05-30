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

//por enquanto ta pegando a senha direto daqui
const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@admin.com',
  password: process.env.ADMIN_PASSWORD || 'senha123'
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,
  {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'senha-super-secreta',
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password){
        return ADMIN
      }
      return null
    }
  });

module.exports = router
