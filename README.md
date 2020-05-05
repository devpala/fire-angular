
# **Installation** #
    npm install @pala/fire-angular @angular/fire firebase --save

# **initializing** #
    const my_architecture_db = { 
      coleccion:['name-col'], 
      documento:['name-doc'],
      subcoleccion:['name-subcol'],
      subdocumento:['name-subdoc'] 
    }
    AngularFireModule.initializeApp(environment.firebase,),
    PalaFireAngularModule.start(my_architecture_db)

# **ejemplo initializing** #
    import { NgModule } from '@angular/ core';
    import { BrowserModule } from '@angular/    platform-browser';
    import { AppComponent } from './app.    component';
    import { environment } from 'src/   environments/environment';
    import { AngularFireModule } from   '@angular/fire';
    import { PalaFireAngularModule } from   '@pala/fire-angular';

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
        AngularFireModule.initializeApp (environment.firebase,),
        PalaFireAngularModule.start (my_architecture_db)
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }



# **Interface for architecture database** #
    Interfaz IColecciones {
        coleccion:string[];
        documento:string[];
        subcoleccion:string[];
        subdocumento:string[];
    }

# **Example**

    Interfaz IColecciones {
        coleccion:string['usuarios'];
        documento:string['producto'];
        subcoleccion:string['chats'];
        subdocumento:string['compra'];
    }

#### **WARNING:** 
 *se puede realizar hasta 2 profundidades de colecciones, recuerde que fire-angular solo facilita las funciones de @angular/fire no remplaza sino lo complementa por lo que es libre de realizar las profundidades que desee llamando a @angular/fire.* 

 *fire-angular esta construido con @angular/fire*

 for more examples visit [https://paladev-paladesing.firebaseapp.com](https://paladev-paladesing.firebaseapp.com/)