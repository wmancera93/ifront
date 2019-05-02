export interface Housing {
  id?: Number | String;
  name: String;
  city: Number | String;
}

export interface HousingForm {
  open: boolean;
  readOnly: boolean;
  isNew: boolean;
  form: Housing;
}
