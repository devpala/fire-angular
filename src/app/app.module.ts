import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { PalaFireAngularModule } from '@pala/fire-angular';

const my_architecture_db = { 
  coleccion:['name-col'], 
  documento:['name-doc'],
  subcoleccion:['name-subcol'],
  subdocumento:['name-subdoc'] 
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase,),
    PalaFireAngularModule.start(my_architecture_db)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
