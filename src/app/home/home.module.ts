import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DetailsComponent } from './details/details.component';
import { VideosListComponent } from './videos-list/videos-list.component';


@NgModule({
  declarations: [DetailsComponent, VideosListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
