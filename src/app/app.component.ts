import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { AfsUserService} from '@pala/fire-angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Observable<any[]>;

  constructor(private pala:AfsUserService) {
      // this.pala.obtenerColeccion(0)
    // this.items = afs.collection('items').valueChanges();
  }

  getFunca() {
    this.pala.agregarDocumento(0, { name:'funca' });
  }

}
