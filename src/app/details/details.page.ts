import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { videogamedbService } from '../core/videogamedbservice.service';
import { Ivideogame } from '../shared/interfaces';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public videogame: Ivideogame;
  videogameForm: FormGroup;


  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private videogamedbService: videogamedbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.videogamedbService.getItem(this.id).then(
      (data: Ivideogame) => {
        this.videogame = data;
      }
    );
    this.videogameForm = new FormGroup({
      name: new FormControl(''),
      genre: new FormControl(''),
      date: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
    
  }

  editRecord(videogame) {
    this.router.navigate(['edit', videogame.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar película',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.videogamedbService.remove(id);
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
}