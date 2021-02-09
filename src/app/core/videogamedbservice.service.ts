import { Injectable } from '@angular/core';
import { Ivideogame } from '../shared/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class videogamedbService {
  auxvideogame: Ivideogame;
  auxvideogameList: Ivideogame[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: Ivideogame) {
    this.storage.set(reference, {
      id: value.id, name: value.name, genre:
        value.genre, date: value.date, cover: value.cover, description:
        value.description
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<Ivideogame> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }


  // Retrieving all values
  getAll(): Promise<Ivideogame[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: Ivideogame) => this.auxvideogameList.push(data)
        );
 });

      return this.auxvideogameList;
    });
  }


  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }


  
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
}