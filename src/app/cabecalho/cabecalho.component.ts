import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioServiceAuth } from '../auth/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  @Input() titulo: string;

  private authObserver: Subscription;
  public autenticado: boolean = false;
  constructor(private usuarioService: UsuarioServiceAuth) {}

  ngOnInit(): void {
    this.usuarioService.getStatusSubject().subscribe((autenticado) => {
      this.autenticado = autenticado;
    })
  }

  ngOnDestroy(){
    this.authObserver.unsubscribe()
  }
}
