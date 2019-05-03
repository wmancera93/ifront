import { Injectable } from '@angular/core';

@Injectable()
export class TransportationLogisticsService {
  vehicle = [
    {
      created_date: '03/10/2018',
      id: 1,
      vehicle_plate: 'CJG 123',
      driver: 'Chimuelo Mancera',
      company: 2,
      number_positions: 25,
      type_service: 1,
      phone_driver: '3130012457',
      journey: [
        { origin: 'Bogota', destiny: 'Jazmin', date_time_departure: '04/05/2019 7:00 am', durationTrayect: '3:00:00' },
        { origin: 'Jazmin', destiny: 'Bogota', date_time_departure: '04/05/2019 12:00 m', durationTrayect: '3:00:00' },
      ],
      state_journey: 'Disponible',
    },
  ];

  constructor() {}

  getVehicle(param) {
    return this.vehicle.find(({ id }) => id === param);
  }
}
