import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class VideogamecrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Videogame(record) {
    return this.firestore.collection('Videogames').add(record);
  }
  read_Videogames() {
    return this.firestore.collection('Videogames').snapshotChanges();
  }
  update_Videogame(recordID, record) {
    this.firestore.doc('Videogames/' + recordID).update(record);
  }
  delete_Videogame(record_id) {
    this.firestore.doc('Videogames/' + record_id).delete();
  }
}