import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'exercise-together';

  //muda o cabeçalho baseado em qual URL a gente ta
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      event instanceof NavigationEnd && this.handleRouteChange();
    });
  }
  
  titulo = "";

  handleRouteChange = () => {
    let url = this.router.url
    console.log('URL', url);

    if (url.includes("/criar")){
      this.titulo = "Adicionar Treino"
    }
    else if (url.includes("/treino")){
      this.titulo = localStorage.getItem('TreinoNome');
    }
    else if(url.includes("perfil")){
      this.titulo = "Perfil"
    }
    else{
      this.titulo = "Treinos Disponíves"
    }
  };
}
