import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IColecciones } from './interfaces/IColecciones.model';
import { GetDbService } from './get_db.service';


@Injectable({
  providedIn:'root'
})
export class AfsService {
  coleccion$:Observable<any>;
  documento$:Observable<any>;
  subColeccion$:Observable<any>;
  subDocumento$:Observable<any>;
  uid:string = '';
  architecture_db:IColecciones;

  constructor(
    private sv_get_db:GetDbService,
    private afs:AngularFirestore
  ) {  
    this.sv_get_db.getDb().subscribe( value => this.architecture_db = value );
  }

// func 1
async getCollection(num:number,cantidad:number = 10000000000000):Promise<Observable<any>> { 
  
  
    console.log('getCollection;', this.architecture_db)
  return this.coleccion$ = this.afs.collection(this.architecture_db.coleccion[num], 
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

//func 2
async getCollectionAsc(num:number,cantidad:number = 10000000000000,orden?:string):Promise<Observable<any>> { 
    return this.coleccion$ = this.afs.collection(this.architecture_db.coleccion[num], 
    ref => ref.orderBy(`${orden}`,'asc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }

// func 3
async getCollectionDesc(num:number,cantidad:number = 10000000000000,orden?:string):Promise<Observable<any>> { 
    return this.coleccion$ = this.afs.collection(`${this.architecture_db.coleccion[num]}`, 
    ref => ref.orderBy(`${orden}`,'desc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data };
      }))
    );
  }
// func 4
  async getSubCollection(num:number,documento:string,subNum:number,cantidad:number = 100000000000):Promise<Observable<any>> { 
    return this.subColeccion$ = this.afs.collection(`${this.architecture_db.coleccion[num]}`)
    .doc(`${documento}`)
    .collection(`${this.architecture_db.subcoleccion[subNum]}`,ref => ref.limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data }
      })
      ))
  }

  async getSubCollectionAsc(num:number,documento:string,subNum:number,cantidad:number = 100000000000,orden?:string):Promise<Observable<any>> { 
    return this.subColeccion$ = this.afs.collection(`${this.architecture_db.coleccion[num]}`)
    .doc(`${documento}`)
    .collection(`${this.architecture_db.subcoleccion[subNum]}`,ref => ref.orderBy(`${orden}`,'asc').limit(cantidad))
    .snapshotChanges().pipe(
      map(actions => actions.map((a:any) => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data }
      })
      ))
  }
   
  async getSubDoc(num:number,documento:string,num2:number,num4:number) {

    return this.subDocumento$ = this.afs.doc<any>(`${this.architecture_db.coleccion[num]}/${documento}/${this.architecture_db.subcoleccion[num2]}/${this.architecture_db.subdocumento[num4]}`)
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
  
  async getDoc(num:number,documento:string):Promise<Observable<any>> {
    return this.documento$ = this.afs.doc(`${this.architecture_db.coleccion[num]}/${documento}`)
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
  
  async addDoc(num:number,documento:any){
    this.afs.collection<any>(`${this.architecture_db.coleccion[num]}`).add(documento);
  }

  async addSubDoc(num:number,documento:string,num2:number,subdocumento:any){
    await  this.afs.collection(this.architecture_db.coleccion[num])
      .doc(`${documento}`)
      .collection(this.architecture_db.subcoleccion[num2])
      .add(subdocumento);
  }

  async updateDoc(num:number,documento:string,datos:any){
    await this.afs.doc<any>(`${this.architecture_db.coleccion[num]}/${documento}`).update(datos);
  }

  async updateSubDoc(num:number,documento:string,num2:number,subdocumento:string,datos:any){
    await this.afs.doc<any>(`${this.architecture_db.coleccion[num]}/${documento}/${this.architecture_db.subcoleccion[num2]}/${subdocumento}`)
    .update(datos);
  }


}