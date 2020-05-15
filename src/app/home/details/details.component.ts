import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoDetailsService } from 'src/app/shared/services/videoDetails/video-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetails } from 'src/app/shared/interfaces/videoDetails';
import { Subscription } from 'rxjs';

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
  rate = 3;

  subscriptionDetails: Subscription;
  subscriptionContentDetails: Subscription;
  subscriptionStatistics: Subscription;

  constructor(private videoDetailsService: VideoDetailsService, private route: ActivatedRoute, private router: Router) {
    this.videoId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadVideoDetails()
  }

  /**
  *@description load video details by its id from the route, navigate to 404 when there is no items returned which means unavailable video id
  */
  loadVideoDetails() {
    this.subscriptionDetails = this.videoDetailsService.getVideoDetails(this.videoId).subscribe(res => {
      if (res.items.length) this.details = res.items[0];
      else this.router.navigate(['not-found']);
    })
    this.subscriptionContentDetails = this.videoDetailsService.getContentDetails(this.videoId).subscribe(res => { if (res.items.length) this.duration = res.items[0].contentDetails.duration })
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
  }
}