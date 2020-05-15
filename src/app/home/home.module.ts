import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DetailsComponent } from './details/details.component';
import { VideosListComponent } from './videos-list/videos-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DetailsComponent, VideosListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
