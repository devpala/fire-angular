import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IColecciones } from './interfaces/IColecciones.model';
import { GetDbService } from './get_db.service';


@Injectable({
  providedIn: 'root'
})

export class AfsUserService {
  coleccion$:Observable<any>;
  documento$:Observable<any>;
  subColeccion$:Observable<any>;
  subDocumento$:Observable<any>;
  uid:string = '';
  db:IColecciones;

  constructor(
    private sv_get_db:GetDbService,
    private afs:AngularFirestore
  ) {  
    this.sv_get_db.getDb().subscribe( value => this.db = value );
  }


async obtenerColeccion(num:number,cantidad:number = 10000000000000):Promise<Observable<any>> { 
    return this.coleccion$ = this.afs.collection(`${this.db.coleccion[num]}`, 
    ref => ref.limit(cantidad))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid:any = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }

async obtenerColeccionAsc(num:number,cantidad:number = 10000000000000,orden?:string):Promise<Observable<any>> { 
    return this.coleccion$ = this.afs.collection(`${this.db.coleccion[num]}`, 
    ref => ref.orderBy(`${orden}`,'asc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }

async obtenerColeccionDesc(num:number,cantidad:number = 10000000000000,orden?:string):Promise<Observable<any>> { 
    return this.coleccion$ = this.afs.collection(`${this.db.coleccion[num]}`, 
    ref => ref.orderBy(`${orden}`,'desc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }




  async obtenerSubColeccion(num:number,documento:string,subNum:number,cantidad:number = 100000000000):Promise<Observable<any>> { 
    return this.subColeccion$ = this.afs.collection(`${this.db.coleccion[num]}`)
    .doc(`${documento}`)
    .collection(`${this.db.subcoleccion[subNum]}`,ref => ref.limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data }
      })
      ))
  }

  async obtenerSubColeccionAsc(num:number,documento:string,subNum:number,cantidad:number = 100000000000,orden?:string):Promise<Observable<any>> { 
    return this.subColeccion$ = this.afs.collection(`${this.db.coleccion[num]}`)
    .doc(`${documento}`)
    .collection(`${this.db.subcoleccion[subNum]}`,ref => ref.orderBy(`${orden}`,'asc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data }
      })
      ))
  }
   
  async obtenerSubDocumento(num:number,documento:string,num2:number,subdocumento:string) {

    return this.subDocumento$ = this.afs.doc<any>(`${this.db.coleccion[num]}/${documento}/${this.db.subcoleccion[num2]}/${subdocumento}`)
    .snapshotChanges()
    .pipe(
      map((a:any) => {
      if(a.payload.exists === false) {
        return null
      } else {
        const uid = a.payload.id;
        const data = a.payload.data() as any;
        return { uid, ...data };
      }
    })) 
  }
  
  async obtenerDocumento(num:number,documento:string):Promise<Observable<any>> {
    return this.documento$ = this.afs.doc(`${this.db.coleccion[num]}/${documento}`)
    .snapshotChanges()
    .pipe(
      map((a:any) => {
        if(a.payload.exists === false) {
          return null
        } else {
          const uid = a.payload.id;
          const data = a.payload.data();
          return { uid, ...data };
        }
    }))
  }
  
  async agregarDocumento(num:number,documento:any){
    this.afs.collection<any>(`${this.db.coleccion[num]}`).add(documento);
  }

  async agregarSubDocumento(num:number,documento:string,subcoleccion:string,subdocumento:any){
    await  this.afs.collection(`${this.db.coleccion[num]}`)
      .doc(`${documento}`)
      .collection(`${subcoleccion}`)
      .add(subdocumento);
  }

  async actualizarDocumento(num:number,documento:string,datos:any){
    await this.afs.doc<any>(`${this.db.coleccion[num]}/${documento}`).update(datos);
  }

  async actualizarSubDocumento(num:number,documento:string,subcoleccion:string,subdocumento:string,datos:any){
    await this.afs.doc<any>(`${this.db.coleccion[num]}/${documento}/${subcoleccion}/${subdocumento}`)
    .update(datos);
  }


}