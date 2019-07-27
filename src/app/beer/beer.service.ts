import { Injectable } from '@angular/core';

import { Beer } from './beer.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private _beer = new BehaviorSubject<Beer[]>([new Beer (
    'a1',
    'Brother',
    'Some dank beer',
    'https://static1.squarespace.com/static/5386bf34e4b0f6a71c87ce6a/596d3d6c15d5db847920a022/596d40ea6f4ca3599c80b8f9/1523045709779/Fremont-Brother-12oz-can.png', 
    14.99,
    new Date(),
    'abc'
    ),
  new Beer (
    'a2',
    'Alphadelic',
    'Some dank beer',
    'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h79/hd6/11196073771038.png', 
    11.99,
    new Date(),
    'abc'
    ),
  new Beer (
    'a3',
    'Kitty Kat Blues',
    'Some dank beer',
    'https://blindtigerdesign.com/wp-content/uploads/2019/04/blackraven-can-kittykat.jpg', 
    10.99,
    new Date(),
    'abc'
    )
]);

  get beer() {
    return this._beer.asObservable();
  }

  constructor(private authService: AuthService) { }

  getBeer(id: string){
    return this.beer.pipe(
      take(1),
      map(beer => {
        return {...beer.find(
          b => b.id === id) };
      })
    );
  }


  addBeer(title: string, description: string, price: number, date: Date) {
    const newBeer = new Beer(Math.random().toString(), 
    title, 
    description, 
    'https://blindtigerdesign.com/wp-content/uploads/2019/04/blackraven-can-kittykat.jpg', 
    price, 
    date,
    this.authService.userId
    );
    this.beer.pipe(take(1)).subscribe(beer => {
      this._beer.next(beer.concat(newBeer));
    });
  }
}
