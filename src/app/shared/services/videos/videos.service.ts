import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideosList } from '../../interfaces/videosList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private httpClient: HttpClient) { }

  /**
  *@description call search API to search and get videos list depends on some search caiteria
  */
  getVideosList(sortActive: string, pageToken: string = '', query: string = ''): Observable<IVideosList> {
    return this.httpClient.get<IVideosList>
      (`${environment.BaseUrl}search?part=snippet&maxResults=10&order=${sortActive}&q=${query}&pageToken=${pageToken}&channel_id=${environment.channelId}&key=${environment.G_API_Key}`);
  }
}
