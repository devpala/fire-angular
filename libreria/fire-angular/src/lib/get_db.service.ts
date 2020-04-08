import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';
import { IColecciones } from './interfaces/IColecciones.model';

@Injectable({
    providedIn:'root'
})
export class GetDbService {
    S$:Subject<IColecciones> = new Subject<IColecciones>();

    getDb():Observable<IColecciones> {
      return this.S$.asObservable()
    }

    sendDb(value:IColecciones) {
        this.S$.next(value)
    }
}