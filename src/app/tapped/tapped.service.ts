import { Injectable } from '@angular/core';

import { Tapped } from './tapped.model';
import { BehaviorSubject, pipe } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface TappedData {
    beerId: string;
    beerImage: string;
    beerTitle: string;
    date: Date;
    name: string;
    state: string;
    userId: string;
}

@Injectable({ providedIn: 'root'})


export class TappedService {
    private _tapped = new BehaviorSubject<Tapped[]>([]);

    get tapped(){
        return this._tapped.asObservable();
    }
    
    constructor(private authService: AuthService, private http: HttpClient) {}

    addTapped(
        beerId: string, 
        beerTitle: string, 
        beerImage: string, 
        name: string, 
        state: string, 
        date: Date
        ) {
            let generateId: string;
            const newTapped = new Tapped(Math.random().toString(), 
                beerId, 
                this.authService.userId, 
                beerTitle, 
                date, 
                state, 
                beerImage, 
                name
                );
                    return this.http.post<{name: string}>(
                        'https://bwh-beer-me.firebaseio.com/tapped-beer/tapped.json', 
                        { ...newTapped, id: null}
                    ).pipe(switchMap(resData => {
                        generateId = resData.name;
                        return this.tapped;
                    }),
                    take(1), 
                    tap(tapped => {
                        newTapped.id = generateId;
                        this._tapped.next(tapped.concat(newTapped));
                    }
                )
            );
        }

    cancelTapped(tappedId: string) {
        return this.http.delete(`https://bwh-beer-me.firebaseio.com/tapped-beer/tapped${tappedId}.json`
        ).pipe(switchMap(() => {
            return this.tapped;
        }), 
        take(1),
        tap(tapped => {
            this._tapped.next(tapped.filter(t => t.id !== tappedId));
        }));
        
    }

    fetchTapped() {
        return this.http
        .get<{ [key: string]: TappedData}>(`https://bwh-beer-me.firebaseio.com/tapped.json?orderBy="userId"&equalTo="${this.authService.userId}"`
        ).pipe(map(tappedData => {
            const tapped = [];
            for(const key in tappedData) {
                if(tappedData.hasOwnProperty(key)){
                    tapped.push(new Tapped(key, tappedData[key].beerId, tappedData[key].beerImage, tappedData[key].beerTitle, new Date(tappedData[key].date),  tappedData[key].name, tappedData[key].state, tappedData[key].userId
                    ));
                }
            }
            return tapped;
        }));
    }
}