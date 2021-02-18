import { Component, OnInit } from '@angular/core';
import { VideogamecrudService } from './../core/videogamecrud.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  videogames: any;
  videogameName: string;
  videogameGenre: string;
  videogameDate: string;
  videogameCover: string;
  videogameDescription: string;

  constructor(private videogamecrudService: VideogamecrudService) { }
  ngOnInit() {
    this.videogamecrudService.read_Videogames().subscribe(data => {
      this.videogames = data.map(e => {
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
      console.log(this.videogames);
    });
  }
  CreateRecord() {
    let record = {};
    record['name'] = this.videogameName;
    record['genre'] = this.videogameGenre;
    record['date'] = this.videogameDate;
    record['cover'] = this.videogameCover;
    record['description'] = this.videogameDescription;
    this.videogamecrudService.create_Videogame(record).then(resp => {
      this.videogameName = "";
      this.videogameGenre = "";
      this.videogameDate = "";
      this.videogameCover = "";
      this.videogameDescription = "";
      this.videogameDate = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
  RemoveRecord(rowID) {
    this.videogamecrudService.delete_Videogame(rowID);
  }
  EditRecord(record) {

    record.isEdit = true;
    record.EditName = record.Name;
    record.EditGenre = record.Genre;
    record.EditDate = record.Date;
    record.EditCover = record.Cover;
    record.EditDescription = record.Description;
  }
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.EditName;
    record['genre'] = recordRow.EditGenre;
    record['date'] = recordRow.EditDate;
    record['cover'] = recordRow.EditCover;
    record['descrition'] = recordRow.EditDescription;
    this.videogamecrudService.update_Videogame(recordRow.id, record);
    recordRow.isEdit = false;
  }
}