export interface Transportation {
  id?: Number | String;
  plate: String;
  city: Number | String;
}

export interface TrasportationForm {
  open: boolean;
  readOnly: boolean;
  isNew: boolean;
  form: Transportation;
}

export interface TrayectBase {
  id?: string | number;
  origin: string | number;
  destiny: string;
  date_time_departure: string;
  durationTrayect: string | number;
  assigned_chairs: string;
}

export interface Trayect extends TrayectBase {
  destiny_name: string;
}
