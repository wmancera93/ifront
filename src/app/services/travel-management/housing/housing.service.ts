import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

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

  bedrooms = {
    bedroom_1: [
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
    ],
    bedroom_2: [
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
    ],
    bedroom_3: [
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [{ label: '' }, { label: '' }, { label: '' }],
      },
      {
        label: '',
        beds: [
          { label: '' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: '' },
        ],
      },
      {
        label: '',
        beds: [
          { label: '' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: '' },
        ],
      },
    ],
  };
  constructor(private tokenService: Angular2TokenService) {}

  getHousingByCompany() {
    return this.housing;
  }

  getbedroomsByHousing(housing_id) {
    return this.bedrooms[`bedroom_${housing_id}`];
  }

  deleteHousingByCompany(housing_id: any) {
    return;
  }
  postNewHousing(object: any) {
    return this.tokenService.post('housing/', object)
    .map((data: any) => data.json());
  }
}
