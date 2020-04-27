import { NgModule,InjectionToken,ModuleWithProviders, Inject} from '@angular/core';
import { TokenService } from './token.service';
import { IColecciones } from './interfaces/IColecciones.model';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { IStart } from './interfaces/start.model';


export const KEY_CONFIG = new InjectionToken<IStart>('START');



@NgModule({
  declarations: [],
  imports: [
      AngularFirestoreModule.enablePersistence(), 
      AngularFirestoreModule,
      AngularFireAuthModule 
  ],
  exports: [],
  providers:[]
})


export class PalaFireAngularModule {
  static start(architecture_db:IColecciones):ModuleWithProviders<any> {
    return {
      ngModule:PalaFireAngularModule,
      providers:[
        TokenService,
        { provide: KEY_CONFIG, useValue: architecture_db }
        
      ]
    }
  }
  constructor(
    private sv_token:TokenService,
    @Inject(KEY_CONFIG) start:IColecciones
    ) {
      this.sv_token.prende(start);
    }

}
