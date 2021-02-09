import { Component, OnInit } from '@angular/core';
import { Ivideogame } from '../shared/interfaces';
import { videogamedbService } from '../core/videogamedbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public videogames: Ivideogame[];
  videogamesinit: Ivideogame[] = [{
    id: '1',
    name: 'Dark Souls',
    genre: 'Rol de acción',
    date: '2011-2012',
    cover:
      'assets/img/darksouls.jpg',
    description: "Dark Souls es un RPG de acción en tercera persona, que se caracteriza por una atmósfera oscura y una dificultad muy por encima de los estándares actuales. El juego recibió excelentes críticas debido a su jugabilidad desafiante, su atmósfera absorbente, sus controles prácticos y a su innovador modo multijugador, la mayoría de estos aspectos importados de su predecesor espiritual Demon's Souls."
  },
  {
    id: '2',
    name: 'Bloodborne',
    genre: 'ARPG',
    date: '2015',
    cover:
      'assets/img/bloodborne.jpg',
    description: "El juego tiene lugar en la ciudad gótica decrépita de Yharnam, conocida por sus avances médicos basados en el uso de la sangre como principal elemento.3​ Con los años, muchos peregrinos viajaron a la ciudad en busca del remedio para curar sus aflicciones. El jugador, por razones desconocidas, emprende el viaje a Yharnam buscando una poderosa sangre conocida como «Sangre pálida» que más tarde descubriremos, proviene de unos seres adorados como dioses apodados los grandes, cuyo diseño parece inspirado en las criaturas del escritor H. P. Lovecraft. "
  }
  ]
  constructor(private videogamedbService: videogamedbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.videogames !== undefined) {
      this.videogames.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.videogamedbService.empty()) {
      this.videogamesinit.forEach(videogame => {
        this.videogamedbService.setItem(videogame.id, videogame);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.videogamedbService.getAll().then(
      (data) => this.videogames = data
    );
  }
  videogameTapped(videogame) {
    this.route.navigate(['details', videogame.id]);
  }
}