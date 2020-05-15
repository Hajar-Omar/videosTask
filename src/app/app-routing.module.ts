import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';


const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./home/home.module").then(mod => mod.HomeModule)
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "not-found",
    component: NotFoundComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
