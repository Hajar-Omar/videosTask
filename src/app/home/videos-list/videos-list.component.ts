import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Item } from 'src/app/shared/interfaces/videosList';
import { VideosService } from 'src/app/shared/services/videos/videos.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss']
})
export class VideosListComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['thumbnail', 'title', 'date', 'actions'];
  data: Item[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  nextPageToken: string;
  prevPageToken: string;
  pageToken: string = ''
  keyword: string = ''

  channelUrl: string = ''
  subscriptionVideosList: Subscription;

  constructor(private videosService: VideosService) { }

  ngAfterViewInit() {
    this.LoadVideosList()
  }

  /**
  *@description load videos list related to specific channel
  */
  LoadVideosList() {
    this.isLoadingResults = true;
    setTimeout(() => {
      this.subscriptionVideosList = merge(this.sort.sortChange)
        .pipe(
          startWith({}),
          switchMap(() => {
            return this.videosService!.getVideosList(this.sort.active, this.pageToken, this.keyword, this.channelUrl);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = false;

            this.resultsLength = data.pageInfo.totalResults;
            this.nextPageToken = data.nextPageToken;
            this.prevPageToken = data.prevPageToken;
            return data.items;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe((data: Item[]) => {
          this.data = data
        });
    }, 500)
  }

  ngOnDestroy(): void {
    this.subscriptionVideosList.unsubscribe();
  }
}
