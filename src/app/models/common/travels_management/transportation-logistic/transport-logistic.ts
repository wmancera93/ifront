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
