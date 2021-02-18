import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VideogamecrudService } from '../core/videogamecrud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ivideogame } from '../shared/interfaces';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  videogameId: number;
  videogame: Ivideogame;
  videogameForm: FormGroup;


  constructor(
    private router: Router,
    private activatedrouter: ActivatedRoute,
    private videogamecrudService: VideogamecrudService,
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

    // Leer el ID
    this.videogameId = parseInt(this.activatedrouter.snapshot.params['id']);

    // Mostrar valores
   /* this.videogamecrudService.getItem(this.videogameId).then(
      (data: Ivideogame) => {
        this.videogame = data;

        this.videogameForm = new FormGroup({
          name: new FormControl(this.videogame.name),
          genre: new FormControl(this.videogame.genre),
          date: new FormControl(this.videogame.date),
          cover: new FormControl(this.videogame.cover),
          description: new FormControl(this.videogame.description),
        });

      });
*/
    if (this.videogameForm) {
      this.videogameForm.reset();
    }

  }


  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar videojuego',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.editvideogame();
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
  editvideogame() {
    this.videogame = this.videogameForm.value;
    this.videogame.id = this.videogameId.toString();
    this.videogamecrudService.update_Videogame(this.videogame.id, this.videogame);
    console.warn(this.videogameForm.value);
  }
}