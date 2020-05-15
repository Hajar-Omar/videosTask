import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IVideoDetails, IStatistics, IContentDetails } from '../../interfaces/videoDetails';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoDetailsService {

  constructor(private httpClient: HttpClient) { }

  /**
  *@description call part=snippet API to get video general info.
  */
  getVideoDetails(videoId: string): Observable<IVideoDetails> {
    return this.httpClient.get<IVideoDetails>
      (`${environment.BaseUrl}videos?part=snippet&key=${environment.G_API_Key}&id=${videoId}`)
      .pipe(shareReplay(1));
  }

  /**
  *@description call part=contentDetails API to get video duration
  */
  getContentDetails(videoId: string): Observable<IContentDetails> {
    return this.httpClient.get<IContentDetails>
      (`${environment.BaseUrl}videos?part=contentDetails&key=${environment.G_API_Key}&id=${videoId}`)
      .pipe(shareReplay(1));
  }

  /** 
  *@description call part=statistics API to get video likes and views
  */
  getStatistics(videoId: string): Observable<IStatistics> {
    return this.httpClient.get<IStatistics>
      (`${environment.BaseUrl}videos?part=statistics&key=${environment.G_API_Key}&id=${videoId}`)
      .pipe(shareReplay(1));
  }
}
