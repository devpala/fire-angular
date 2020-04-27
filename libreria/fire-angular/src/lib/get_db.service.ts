import { Injectable } from '@angular/core';
import {  Observable, BehaviorSubject} from 'rxjs';
import { IColecciones } from './interfaces/IColecciones.model';

@Injectable({
    providedIn:'root'
})
export class GetDbService {
    S$:BehaviorSubject<IColecciones> = new BehaviorSubject<IColecciones>(null);

    getDb():Observable<IColecciones> {
      return this.S$.asObservable()
    }
    
    sendDb(value:IColecciones) {
        this.S$.next(value)
    }

}