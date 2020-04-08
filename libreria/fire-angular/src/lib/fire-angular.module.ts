import { NgModule,Injectable, Inject,InjectionToken, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule, FirebaseOptions, FirebaseAppConfig } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

export const KEY_CONFIG = new InjectionToken<any>('key_config');
console.log('KEY_CONFIG:',KEY_CONFIG);


@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(KEY_CONFIG),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,AngularFireAuthModule
  ],
  exports: [],
  providers: [
   
  ],
})

export class PalaFireAngularModule {

  static start(config:any):ModuleWithProviders<any> {
    return {
      ngModule:PalaFireAngularModule,
      providers:[
        { provide: KEY_CONFIG, useValue:config }
      ]
    }
   }
   constructor(@Inject(KEY_CONFIG) key_config:any) {
     console.log(key_config);
     return key_config
   }

}
