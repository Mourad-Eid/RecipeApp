import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuPage } from './side-menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: SideMenuPage,
    children: [
      {path: 'home',
      loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
    }
    ]
  },
  {
    path: '',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
