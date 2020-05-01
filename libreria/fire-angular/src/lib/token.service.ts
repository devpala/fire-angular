import { Injectable } from '@angular/core';
import { GetDbService } from './get_db.service';
import { IColecciones } from './interfaces/IColecciones.model';

@Injectable()
export class TokenService {

   constructor(private sv_get_db:GetDbService) { }

   prende(architecture_db:IColecciones):any { 
      this.sv_get_db.sendDb(architecture_db);
   }
   
}




