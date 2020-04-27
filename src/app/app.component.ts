import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AfsService } from '@pala/fire-angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: Observable<any[]>;

  constructor(private pala:AfsService) { }
  async ngOnInit() {
    this.users =  await this.pala.getCollection(0,10);

  }

  getFunca() {
    this.pala.addDoc(0, { name:'Pala!' });
  }


}
