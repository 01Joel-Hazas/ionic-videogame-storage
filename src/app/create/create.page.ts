import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { videogamedbService } from '../core/videogamedbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ivideogame } from '../shared/interfaces';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  videogame: Ivideogame;
  videogameForm: FormGroup;
  constructor(
    private router: Router,
    private videogamedbService: videogamedbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.videogameForm = new FormGroup({
      name: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar videojuego',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.savevideogame();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  savevideogame() {
    this.videogame = this.videogameForm.value;
    let nextKey = this.videogame.name.trim();
    this.videogame.id = nextKey;
    this.videogamedbService.setItem(nextKey, this.videogame);
    console.warn(this.videogameForm.value);
  }
}