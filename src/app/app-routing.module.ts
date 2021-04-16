import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './main/dashboard/dashboard.component';
import {HeroesComponent} from './main/heroes/heroes.component';
import {HeroDetailComponent} from './main/hero-detail/hero-detail.component';
import {GoogleAuthComponent} from './google-auth/google-auth.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'auth-by-google', component: GoogleAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
