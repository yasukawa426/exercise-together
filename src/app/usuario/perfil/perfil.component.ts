import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;

  public lineChartData: ChartDataSets[] = [
    {data: null, label: "git status -s"}
  ];
  public lineChartLabels: Label[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(public usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService
      .getUsuarioEmail('usuario@usuario.com')
      .subscribe((dadosUsuario) => {
        console.log('O q recebi', dadosUsuario);
        this.usuario = {
          nome: dadosUsuario.nome,
          email: dadosUsuario.email,
          peso: dadosUsuario.peso,
          treinos: dadosUsuario.treinos,
        };
        console.log(this.usuario);
        this.lineChartData = [{ data: this.usuario.peso, label: 'Peso(kg)' }];
      });
  }
}
