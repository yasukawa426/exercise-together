const express = require ('express');
const app = express ();
const mongoose = require ('mongoose');

const treino = [
  {
    nome: 'Treino do Michael Felps',
    imagem: 'https://www.olimpiadatododia.com.br/wp-content/uploads/2020/06/Michael-Phelps-recordista-de-medalhas-de-ouro-numa-u%CC%81nica-edic%CC%A7a%CC%83o-dos-Jogos-Oli%CC%81mpicos-Pequim-2008-1280x720.jpg',
    exercicios: [
      {
        nome: 'Flexao',
          repeticao: 2,
          series: 1,
          imagem: "https://image.shutterstock.com/shutterstock/photos/454190938/display_1500/stock-vector-step-instruction-for-push-up-of-woman-cartoon-illustration-about-work-out-454190938.jpg",
          descricao: "Abaixe o corpo de forma uniforme até que o peito fique a uma mão travessa do solo, sem lhe tocar e de seguida regresse a posição inicial"
      },
      {
        nome: 'Abdominal',
        repeticao: 10,
        series: 1,
        imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
        descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão"
      }
    ],
  },

  {
    nome: 'Tanquinho em 20 dias',
    imagem: 'https://images-na.ssl-images-amazon.com/images/I/81PyTDtJlnL.png',
    exercicios: [
      {
        nome: 'Abdominal Oblíquo',
        repeticao: 12,
        series: 3,
        imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
        descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão"
      },
      {
        nome: 'Abdominal Infra',
        repeticao: 12,
        series: 3,
        imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
        descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão"
      },
    ],
  },

  {
    nome: 'Treino do Saitama',
    imagem: 'https://www.technofuss.com/wp-content/uploads/2021/02/One-Punch-Man.png',
    exercicios: [
      {
        nome: 'Flexao',
        repeticao: 2,
        series: 1,
        imagem: "https://image.shutterstock.com/shutterstock/photos/454190938/display_1500/stock-vector-step-instruction-for-push-up-of-woman-cartoon-illustration-about-work-out-454190938.jpg",
        descricao: "Abaixe o corpo de forma uniforme até que o peito fique a uma mão travessa do solo, sem lhe tocar e de seguida regresse a posição inicial"
      },
      {
        nome: 'Abdominal',
        repeticao: 10,
        series: 1,
        imagem: "https://image.shutterstock.com/shutterstock/photos/715195228/display_1500/stock-vector-woman-who-was-fat-doing-sit-up-on-mat-illustration-about-correct-exercise-posture-715195228.jpg",
        descricao: "Com a força do abdômen, levante a parte superior do seu corpo até onde conseguir, sem necessidade de tentar encostar o peitoral nos joelhos. Não levante a lombar do chão"
      },
      {
        nome: 'Agachamento',
        repeticao: 100,
        series: 1,
        imagem: "https://image.shutterstock.com/shutterstock/photos/1303854643/display_1500/stock-vector-exercise-guide-by-woman-doing-air-squat-in-steps-in-side-view-illustration-about-workout-1303854643.jpg",
        descricao: "Abaixe os quadris a partir de uma posição em pé e depois se levante"
      },
      {
        nome: 'Corrida',
        repeticao: 100,
        series:1,
        imagem: "https://image.shutterstock.com/z/stock-vector-running-design-over-white-background-vector-illustration-272049824.jpg",
        descricao: "Corrida é quando só um pé está no chão e ao saltar os dois pés estão no ar"
      }
    ],
  },
];

mongoose.connect ('mongodb+srv://x2_admin:x20123@clusterx2.2ajvc.mongodb.net/x2Database?retryWrites=true&w=majority').then(() => {
  console.log ("Conexão OK")
}).catch((err) => {
  console.log(err)
  console.log("Conexão NOK")
});

app.use('/api/treino',(req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
  });
});

module.exports = app;
