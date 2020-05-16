import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoDetailsService } from 'src/app/shared/services/videoDetails/video-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetails } from 'src/app/shared/interfaces/videoDetails';
import { Subscription } from 'rxjs';
import { RatingService } from 'src/app/shared/services/rating/rating.service';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  videoId: string;
  details: IDetails;
  likes: string;
  views: string
  duration: string;
  rate = 0;

  isFavorite: boolean;

  subscriptionDetails: Subscription;
  subscriptionContentDetails: Subscription;
  subscriptionStatistics: Subscription;

  subscriptionRating: Subscription

  constructor(private videoDetailsService: VideoDetailsService, private route: ActivatedRoute, private router: Router,
    private ratingService: RatingService, private favoritesService: FavoritesService, private _snackBar: MatSnackBar) {
    this.videoId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadVideoDetails()
    this.checkOnLoadIfFavorites()

    // get default rate, then set its value
    this.ratingService.findThenAddRateOrUpdate('load', { videoId: this.videoId })
    this.subscriptionRating = this.ratingService.rating.subscribe(d => this.rate = d)
  }

  /**
  *@description show messages
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  /**
  *@description rate selected video or update it if rated before
  */
  hitRate() {
    this.ratingService.findThenAddRateOrUpdate('rate', { videoId: this.videoId, rate: this.rate })
  }

  /**
  *@description add this video to my Favorites
  */
  addToFavorites() {
    this.favoritesService.add(this.videoId).then(d => {
      this.isFavorite = true;
      this.openSnackBar('Added to your favorites', 'x');
    })
      .catch(e => this.openSnackBar('Try later!', 'x'))
  }

  /**
    *@description remove this video from my Favorites
    */
  RemoveToFavorites() {
    this.favoritesService.delete(this.videoId)
    this.isFavorite = false;
    this.openSnackBar('  Removed from your favorites', 'x')
  }

  /**
  *@description check if this video on my favorites or not, then show the suitable button either add or remove
  */
  checkOnLoadIfFavorites() {
    this.favoritesService.isInMyFavorites(this.videoId).subscribe(res => {
      if (res.length) this.isFavorite = true;
      else this.isFavorite = false;
    })
  }

  /**
  *@description load video details by its id from the route, navigate to 404 when there is no items returned which means unavailable video id
  */
  loadVideoDetails() {
    this.subscriptionDetails = this.videoDetailsService.getVideoDetails(this.videoId).subscribe(res => {
      if (res.items.length) this.details = res.items[0];
      else this.router.navigate(['not-found']);
    })
    this.subscriptionContentDetails = this.videoDetailsService.getContentDetails(this.videoId).subscribe(res => {
      if (res.items.length) this.duration = res.items[0].contentDetails.duration
    })
    this.subscriptionStatistics = this.videoDetailsService.getStatistics(this.videoId).subscribe(res => {
      if (res.items.length) {
        this.likes = res.items[0].statistics.likeCount;
        this.views = res.items[0].statistics.viewCount;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionDetails.unsubscribe()
    this.subscriptionContentDetails.unsubscribe()
    this.subscriptionStatistics.unsubscribe()

    this.subscriptionRating.unsubscribe()
  }
}