import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class HotelsService {

  constructor(private tokenService: Angular2TokenService) { }
  
  getshowHotels(id_city) {
    return this.tokenService.get('geographic_locations/show_hotels/'+ id_city)
      .map((data: any) => data.json());
  }
}
