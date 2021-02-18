import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideogamecrudService } from '../core/videogamecrud.service';
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
    private videogamecrudService: VideogamecrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.videogamecrudService.read_Videogames().subscribe(data => {
      let videogames = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          genre: e.payload.doc.data()['genre'],
          date: e.payload.doc.data()['date'],
          cover: e.payload.doc.data()['cover'],
          description: e.payload.doc.data()['description']
        };
      })
      console.log(videogames);
      videogames.forEach(element => {
          if(element.id == this.id){
            this.videogame = element;
          }
      });
    });
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
            this.videogamecrudService.delete_Videogame(id);
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