import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { publicGuard } from './auth/guards/public.guard';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[publicGuard],
    canMatch:[publicGuard]
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate:[authGuard],
    canMatch:[authGuard]
  },
  {
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'heroes',
    pathMatch:'full' // Nos aseguramos que redireccione al path exacto, en este caso heroes
  },
  {
    path:'**',
    redirectTo:'404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
