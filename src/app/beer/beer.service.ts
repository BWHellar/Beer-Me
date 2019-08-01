import { Injectable } from '@angular/core';

import { Beer } from './beer.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from './location.model';

interface BeerData {
  date: Date;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}


@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private _beer = new BehaviorSubject<Beer[]>([]);

  get beer() {
    return this._beer.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchBeer() {
    return this.http
    .get<{[key: string]: BeerData }>('https://bwh-beer-me.firebaseio.com/tapped-beer.json')
    .pipe(map(resData =>{
      const beer = [];
      for(const key in resData) {
        if(resData.hasOwnProperty(key)){
          beer.push(new Beer(
            key,  
            resData[key].title, 
            resData[key].description, 
            resData[key].imageUrl, 
            resData[key].price, 
            new Date(resData[key].date), 
            resData[key].userId,
            resData[key].location
            )
          );
        }
      }
      return beer;
    }),
    tap(beer => {
      this._beer.next(beer);
    })
    );
  }

  getBeer(id: string){
    return this.http
    .get<BeerData>(`https://bwh-beer-me.firebaseio.com/tapped-beer/${id}.json`
    )
    .pipe(
      map(beerData => {
        return new Beer(
          id, 
          beerData.
          title, 
          beerData.description,  
          beerData.imageUrl, 
          beerData.price, 
          new Date(beerData.date), 
          beerData.userId,
          beerData.location
          )
      })
    );
  }


  addBeer(
    title: string, 
    description: string, 
    price: number, 
    date: Date,
    location: PlaceLocation) {
    let generateId: string;
    const newBeer = new Beer(
    Math.random().toString(), 
    title, 
    description, 
    'https://blindtigerdesign.com/wp-content/uploads/2019/04/blackraven-can-kittykat.jpg', 
    price, 
    date,
    this.authService.userId,
    location
    );
    return this.http
      .post<{name: string}>('https://bwh-beer-me.firebaseio.com/tapped-beer.json', {...newBeer, id: null})
      .pipe(
        switchMap(resData => {
          generateId = resData.name;
          return this.beer;
        }),
        take(1),
        tap(beer => {
          newBeer.id = generateId;
          this._beer.next(beer.concat(newBeer));
        })
      );
    // return this.beer.pipe(
    //   take(1),
    //   delay(1000), 
    //   tap(beer => {
    //     this._beer.next(beer.concat(newBeer));
    //   })
    // );
  }

  updateBeer(beerId: string, title: string, description: string) {
    let updatedBeer:Beer[];
    return this.beer.pipe(
      take(1),
      switchMap(beer => {
        if(!beer || beer.length <= 0) {
          return this.fetchBeer();
        } else {
          return of(beer);
        }
  
    }),
    switchMap(beer => {
      const updatedBeerIndex = beer.findIndex(be => be.id === beerId);
      updatedBeer =  [...beer];
      const oldBeer = updatedBeer[updatedBeerIndex];
      updatedBeer[updatedBeerIndex] = new Beer(
        oldBeer.id, 
        title, 
        description, 
        oldBeer.imageUrl, 
        oldBeer.price, 
        oldBeer.date, 
        oldBeer.userId,
        oldBeer.location
        );
        return this.http.put(
          `https://bwh-beer-me.firebaseio.com/tapped-beer/${beerId}.json`,
        { ...updatedBeer[updatedBeerIndex], id: null}
      );
    }), 
    tap(() => {
      this._beer.next(updatedBeer);
    })
    );
  }
}
