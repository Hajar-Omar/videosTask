import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosListComponent } from './videos-list/videos-list.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {
    path: "home",
    component: VideosListComponent
  },
  {
    path: "details/:id",
    component: DetailsComponent
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
