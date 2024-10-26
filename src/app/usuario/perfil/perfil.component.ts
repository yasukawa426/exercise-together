import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PushNotificationsService } from 'ng-push';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  //esse vetor vai conter tds os pesos (em kg)
  arrayPeso = [];
  arrayData = [];
  ultimoPeso: number;
  public lineChartData: ChartDataSets[] = [
    { data: null, label: 'git status -s' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  //email de quem ta logado
  email: string;
  constructor(
    public usuarioService: UsuarioService,
    private _bottomSheet: MatBottomSheet,
    private _pushNotifications: PushNotificationsService
  ) {}

  ngOnInit() {
    this.email = localStorage.getItem('emailLogado');
    this.usuarioService
      .getUsuarioEmail(this.email)
      .subscribe((dadosUsuario) => {
        console.log('O q recebi', dadosUsuario);
        this.usuario = {
          nome: dadosUsuario.nome,
          email: dadosUsuario.email,
          peso: dadosUsuario.peso,
          treinos: dadosUsuario.treinos,
        };
        console.log(this.usuario);
        //vai pegar tds os pesos do json ({peso:number, data:string}) e colocar dentro de um vetor de peso (number)
        this.usuario.peso.forEach((peso) => {
          this.arrayPeso.push(peso.peso);
          this.arrayData.push(peso.data);
        });
        this.lineChartData = [{ data: this.arrayPeso, label: 'Peso(kg)' }];
        this.lineChartLabels = this.arrayData;
        //ultimo peso = ao ultimo peso do arrayPeso
        this.ultimoPeso = this.arrayPeso[this.arrayPeso.length - 1];

        this._pushNotifications.requestPermission();
      });
  }

  abrirAtualizarPeso() {
    this._bottomSheet
      .open(BottomSheet, {
        data: this.ultimoPeso,
      })
      .afterDismissed()
      .subscribe((dados) => {
        //quando o bottomSheet fechar, isso acontece
        this.ultimoPeso = dados.pesoAtualizado;
        this.arrayPeso.push(this.ultimoPeso);
        this.arrayData.push(dados.data);
        this.lineChartData = [{ data: this.arrayPeso, label: 'Peso(kg)' }];
        this.lineChartLabels = this.arrayData;
      });
  }

  async lembrar() {
    this._bottomSheet
      .open(Lembrar)
      .afterDismissed()
      .subscribe((dados) => {
        console.log(
          'Dados para salvar no banco no email (data, email): ',
          dados.dataFormatada,
          this.usuario.email
        );
        this.usuarioService.lembrar(this.usuario.email, dados.dataFormatada);
        // vai fazer isso dps de fechar
        // this.usuarioService.lembrar(this.usuario.email);
      });

    // this._pushNotifications.create('Lembre de Treinar!', {body: 'Ta na hora do treino, bora!'}).subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    //   )
  }
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
})
export class BottomSheet {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheet>,
    private _snackBar: MatSnackBar,
    public usuarioService: UsuarioService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: number
  ) {}
  pesoAtual: number;
  atualizarPeso() {
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let dataFormatada: string = dia + '/' + mes;
    console.log('Data: ', dataFormatada);
    const pesoData = {
      peso: this.pesoAtual,
      data: dataFormatada,
    };
    this.usuarioService.atualizarPeso(
      localStorage.getItem('emailLogado'),
      pesoData
    );

    this._bottomSheetRef.dismiss({
      pesoAtualizado: this.pesoAtual,
      data: dataFormatada,
    });
    this._snackBar.open('Peso atualizado!', 'X', {
      duration: 3000,
    });
  }
}

@Component({
  selector: 'app-lembrar',
  templateUrl: './lembrar.component.html',
  styleUrls: ['./lembrar.component.css'],
})
export class Lembrar {
  dataEscolhida = new FormControl(
    { value: new Date(), disabled: true },
    { validators: [Validators.required] }
  );
  dataMinima: Date;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheet>,
    private _snackBar: MatSnackBar,
    public usuarioService: UsuarioService
  ) {
    let date = new Date();
    let dia = String(date.getDate()).padStart(2, '0');
    let mes = String(date.getMonth()).padStart(2, '0');
    let ano = date.getFullYear();

    //o usuario só pode escolher o dia atual + 1 em frente
    this.dataMinima = new Date(ano, +mes, +dia + 1);
  }
  agendarLembrete() {
    console.log(this.dataEscolhida.value);
    let dia = String(this.dataEscolhida.value.getDate()).padStart(2, '0');
    let mes = String(this.dataEscolhida.value.getMonth() + 1).padStart(2, '0');
    let ano = this.dataEscolhida.value.getFullYear();
    let dataFormatada = Number(ano + mes + dia);
    console.log('getDate: ', dia);
    console.log('getMonth: ', mes);
    console.log('getYear: ', ano);
    // console.log("Data Formatada: ", dataFormatada)

    this._bottomSheetRef.dismiss({
      dataFormatada: dataFormatada,
    });
    this._snackBar.open('Lembrete salvo!', 'X', {
      duration: 3000,
    });
  }
}
