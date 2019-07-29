import { Injectable } from '@angular/core';

import { Tapped } from './tapped.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})


export class TappedService {
    private _tapped = new BehaviorSubject<Tapped[]>([]);

    get tapped(){
        return this._tapped.asObservable();
    }
    
    constructor(private authService: AuthService) {}

    addTapped(
        beerId: string, 
        beerTitle: string, 
        beerImage: string, 
        name: string, 
        state: string, 
        date: Date
        ) {
            const newTapped = new Tapped(Math.random().toString(), 
                beerId, 
                this.authService.userId, 
                beerTitle, 
                date, 
                state, 
                beerImage, 
                name
                );
                    return this.tapped.pipe(
                        take(1), 
                        delay(1000),
                        tap(tapped => {
                            this._tapped.next(tapped.concat(newTapped));
                    }
                )
            );
    }

    cancelTapped(tappedId: string) {
        return this.tapped.pipe(
            take(1),
            delay(1000),
            tap(tapped => {
                this._tapped.next(tapped.filter(t => t.id !== tappedId));
            })
        );
    }
}