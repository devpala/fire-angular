import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PalaFireAngularModule} from '@pala/fire-angular';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PalaFireAngularModule.start(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
