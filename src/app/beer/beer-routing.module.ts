import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BeerPage } from './beer.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: BeerPage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadChildren: './discover/discover.module#DiscoverPageModule'
                    },
                    {
                        path: ':beerId',
                        loadChildren: './discover/beer-detail/beer-detail.module#BeerDetailPageModule'
                    }
                ]
            },
            {
                path: 'info',
                children: [
                    {
                        path: '',
                        loadChildren: './info/info.module#InfoPageModule'
                    },
                    {
                        path: 'new',
                        loadChildren: './info/new-beer/new-beer.module#NewBeerPageModule'
                    },
                    {
                        path: 'edit/:beerId',
                        loadChildren: './info/edit-beer/edit-beer.module#EditBeerPageModule'
                    },
                    {
                        path: ':beerId',
                        loadChildren: './info/my-beers/my-beers.module#MyBeersPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'beer/tabs/discover',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/beer/tabs/discover',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BeerRoutingModule {}