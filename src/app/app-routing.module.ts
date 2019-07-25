import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'beer', pathMatch: 'full' },
  { path: 'auth', 
    loadChildren: './auth/auth.module#AuthPageModule' 
  },
  { path: 'beer', 
    loadChildren: './beer/beer.module#BeerPageModule', 
    canLoad: [AuthGuard] 
  },
  { path: 'tapped', 
    loadChildren: './tapped/tapped.module#TappedPageModule',
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
