import { Injectable } from '@angular/core';

import { Beer } from './beer.model';


@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private _beer: Beer[] = [
    new Beer (
      'a1',
      'Brother',
      'Some dank beer',
      'https://static1.squarespace.com/static/5386bf34e4b0f6a71c87ce6a/596d3d6c15d5db847920a022/596d40ea6f4ca3599c80b8f9/1523045709779/Fremont-Brother-12oz-can.png', 
      14.99,
      new Date()
      ),
    new Beer (
      'a2',
      'Alphadelic',
      'Some dank beer',
      'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h79/hd6/11196073771038.png', 
      11.99,
      new Date()
      ),
      new Beer (
        'a3',
        'Kitty Kat Blues',
        'Some dank beer',
        'https://blindtigerdesign.com/wp-content/uploads/2019/04/blackraven-can-kittykat.jpg', 
        10.99,
        new Date()
        )
  ];

  get beer() {
    return [...this._beer];
  }

  constructor() { }

  getBeer(id: string){
    return {...this._beer.find(
      b => b.id === id
    )};
  }
}
