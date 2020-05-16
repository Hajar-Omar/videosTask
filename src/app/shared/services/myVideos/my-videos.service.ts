import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyVideoRating } from 'src/app/models/my-video-rating.model';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyVideosService {

  readonly videoRatingCollection = 'videoRating'
  readonly favoritesCollection = 'favorites'
  subscription: Subscription;

  rating = new BehaviorSubject<number>(0);

  constructor(private firestore: AngularFirestore) { }

  /**
  *@description first, find if the doc is there or not then call addORupdate() if state is 'rate'
  * if docId is there then update, if not then add
  * if state 'load' or anthing else, means to get the default rate if existing or not
  */
  findThenAddRateOrUpdate(state: string, myVideoRating: MyVideoRating) {
    let docId = ''
    this.subscription = this.firestore.collection(this.videoRatingCollection).snapshotChanges().subscribe(d => {
      let collection = d.map(e => { return { doc: e.payload.doc.data(), docId: e.payload.doc.id } });
      let filtered = collection.filter(e => e.doc['videoId'] == myVideoRating.videoId);
      if (filtered.length !== 0) docId = filtered[0].docId;
      let rate = docId === '' ? 0 : filtered[0].doc['rate']

      if (state === 'rate') this.addORupdate(docId, myVideoRating)
      else this.getVideoRating(docId, rate)
    })
  }

  /**
    *@description if docId is there then emit existing rate, if not then emit 0 as a default rate
    */
  getVideoRating(docId: string, rate: number) {
    if (docId !== '') {  // existing so emit its value
      this.rating.next(rate)
      this.subscription.unsubscribe()
    } else { // not existing so default 0
      this.rating.next(0)
      this.subscription.unsubscribe()
    }
  }

  /**
    *@description if docId is there then update, if not then add
    */
  addORupdate(docId: string, myVideoRating: MyVideoRating) {
    if (docId !== '') {  // existing so update
      this.firestore.collection(this.videoRatingCollection).doc(docId).update({ rate: myVideoRating.rate })
      this.subscription.unsubscribe()
    } else { // not existing so add
      this.firestore.collection(this.videoRatingCollection).add(myVideoRating)
      this.subscription.unsubscribe()
    }
  }
}
