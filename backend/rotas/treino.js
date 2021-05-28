//vai ser responsavel por ter os endpoinst envolvendo treino
const express = require("express");
const router = express.Router();
const Treino = require("../models/treino");
const multer = require("multer");

const armazenamento = multer.diskStorage({
  //requisiçao, arquivo extraido e uma funçao que indica um erro ou devolve o diretorio que as //fotos vao ficar
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype]
      ? null
      : new Error("Mime Type Inválido");
    callback(e, "backend/imagens");
  },
  filename: (req, file, callback) => {
    const nome = file.originalname.toLowerCase().split(" ").join("_");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    callback(null, `${nome}-${Date.now()}.${extensao}`);
  },
});

const MIME_TYPE_EXTENSAO_MAPA = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/bmp": "bmp",
};

//definindo o "schema"
// const clienteSchema = mongoose.Schema ({
//   nome: { type: String, required: true},
//   imagemURL: { type: String, required: true},
//   exercicios: { type: Exercicio, required: true}
// })

//pega tds os treinos da tabela treino endpoint : localhost:3000/api/treinos
router.get("", (req, res, next) => {
  console.log("Recebi um get de treinos!");
  treinos = Treino.find().then((documents) => {
    res.status(200).json({
      mensagem: "Tudo ok no get, toma os treinos",
      treinos: documents,
    });
    //isso printa tds os exercicios do terceiro treino (treino do saitama)
    // treinos = documents
    // for(let i = 0; i < treinos[1].exercicios.length; i++){
    //   console.log(treinos[2].exercicios[i]);
    // }
  });
});

//adiciona um treino na tabela treinos
router.post("", checkAuth, multer({ storage: armazenamento }).single("imagem"), (req, res, next) => {
    console.log("Recebi o post!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    body = req.body;
    const imagemURL = `${req.protocol}://${req.get("host")}`;
    //transofrmando os exercicios recebido como string em JSON array
    vetorExercicios = JSON.parse(body.exercicios)
    const treino = new Treino({
      nome: body.nome,
      imagemURL: `${imagemURL}/imagens/${req.file.filename}`,
      exercicios: vetorExercicios
    });
    //salva no banco
    treino.save().then((treinoInserido) => {
      res.status(201).json({
        mensagem: "Booooa, recebi seu treino e inseri no banco",
        treino: {
          nome: treinoInserido.nome,
          imagemURL: treinoInserido.imagem,
          exercicios: treinoInserido.exercicios,
        },
      });
    });
  }
);

//exportando
module.exports = router;
