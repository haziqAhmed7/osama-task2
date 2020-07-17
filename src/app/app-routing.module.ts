import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';

import {LoginComponent} from './login/login.component';
import {GalleryComponent} from './gallery/gallery.component';
import {AuthGuardService} from './services/auth.guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent,  pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'gallery', component: GalleryComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
GalleryComponent, LoginComponent
];