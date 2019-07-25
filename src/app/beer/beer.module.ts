import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { BeerPage } from './beer.page';
import { BeerRoutingModule } from './beer-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BeerRoutingModule
  ],
  declarations: [BeerPage]
})
export class BeerPageModule {}
