import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  readonly favoritesCollection = 'favorites'

  constructor(private firestore: AngularFirestore) { }

  /**
    *@description add this video to my Favorites
    */
  add(videoId: string) {
    return this.firestore.collection(this.favoritesCollection).add({ videoId: videoId })
  }

  /**
  *@description get docment id for this video by its id, then delete it from my Favorites
  */
  delete(videoId: string) {
    this.firestore.collection(this.favoritesCollection, ref => ref.where('videoId', '==', videoId).limit(1)).snapshotChanges()
      .subscribe(x => {
        let docId = x.map(e => e.payload.doc.id)[0];
        this.firestore.doc(`${this.favoritesCollection}/${docId}`).delete();
      })
  }

  /**
    *@description check if this video in my favorites or not
    */
  isInMyFavorites(videoId: string) {
    return this.firestore.collection(this.favoritesCollection, ref => ref.where('videoId', '==', videoId).limit(1)).snapshotChanges()
  }

}
