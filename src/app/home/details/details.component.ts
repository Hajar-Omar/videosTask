import { Component, OnInit } from '@angular/core';
import { VideoDetailsService } from 'src/app/shared/services/videoDetails/video-details.service';
import { ActivatedRoute } from '@angular/router';
import { IDetails } from 'src/app/shared/interfaces/videoDetails';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  videoId: string;
  details: IDetails;
  likes: string;
  views: string
  duration: string;
  cssRate = 4;

  constructor(private videoDetailsService: VideoDetailsService, private route: ActivatedRoute) {
    this.videoId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadVideoDetails()
  }

  loadVideoDetails() {
    this.videoDetailsService.getVideoDetails(this.videoId).subscribe(res => this.details = res.items[0])
    this.videoDetailsService.getContentDetails(this.videoId).subscribe(res => this.duration = res.items[0].contentDetails.duration)
    this.videoDetailsService.getStatistics(this.videoId).subscribe(res => {
      this.likes = res.items[0].statistics.likeCount;
      this.views = res.items[0].statistics.viewCount;
    })
  }
}