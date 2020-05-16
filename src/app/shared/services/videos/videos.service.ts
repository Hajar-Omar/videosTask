import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideosList } from '../../interfaces/videosList';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private httpClient: HttpClient) { }

  /**
  *@description call search API to search and get videos list depends on some search criteria
  */
  getVideosList(sortActive: string, pageToken: string = '', query: string = '', channelUrl: string): Observable<IVideosList> {
    let channelId = ''
    if (channelUrl.search('channel/') > -1 && channelUrl !== '' && channelUrl !== undefined) channelId = channelUrl.split('/')[4]
    else channelId = environment.channelId

    return this.httpClient.get<IVideosList>
      (`${environment.BaseUrl}search?part=snippet&maxResults=10&type=video&order=${sortActive}&q=${query}&pageToken=${pageToken}&channel_id=${channelId}&key=${environment.G_API_Key}`)
      .pipe(shareReplay(1));
  }
}
