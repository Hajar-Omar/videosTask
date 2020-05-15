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

  getVideosList(sortActive: string, orderDir: string, pageToken: string = '', query: string = ''): Observable<IVideosList> {
    return this.httpClient.get<IVideosList>
      (`${environment.BaseUrl}search?part=snippet&maxResults=10&order=${sortActive}&q=${query}&pageToken=${pageToken}&channel_id=${environment.channelId}&key=${environment.G_API_Key}`);
  }
}
