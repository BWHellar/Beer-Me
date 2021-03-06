import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BeerDetailPage } from './beer-detail.page';
import { CreateTappedComponent } from '../../../tapped/create-tapped/create-tapped.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BeerDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [BeerDetailPage, CreateTappedComponent],
  entryComponents: [CreateTappedComponent]
})
export class BeerDetailPageModule {}
