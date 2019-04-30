import { Injectable } from '@angular/core';

@Injectable()
export class HousingService {
  housing = [
    {
      action_housing_index_view: {
        watch: { state: true },
        delete: { state: true },
        edit: { state: false },
      },
      created_date: '03/10/2018',
      id: 1,
      name: 'Paloquemado',
      total_bed: 25,
      city_id: 1,
      assigned_bed: 18,
      busy_bed: 4,
      available_bed: 3,
    },
    {
      action_housing_index_view: {
        watch: { state: false },
        delete: { state: true },
        edit: { state: true },
      },
      created_date: '03/10/2018',
      id: 2,
      name: 'Paloquemado',
      total_bed: 23,
      city_id: 2,
      assigned_bed: 18,
      busy_bed: 4,
      available_bed: 3,
    },
    {
      action_housing_index_view: {
        watch: { state: true },
        delete: { state: false },
        edit: { state: true },
      },
      created_date: '03/10/2018',
      id: 3,
      name: 'Paloquemado',
      total_bed: 33,
      city_id: 3,
      assigned_bed: 18,
      busy_bed: 4,
      available_bed: 3,
    },
  ];
  constructor() {}

  getHousingByCompany() {
    return this.housing;
  }

  deleteHousingByCompany(housing_id: any) {
    return;
  }
}
