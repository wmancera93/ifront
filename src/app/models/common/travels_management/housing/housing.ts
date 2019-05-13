export interface Housing {
  id?: string;
  name: string;
  city: string;
}

export interface HousingForm {
  open: boolean;
  readOnly: boolean;
  isNew: boolean;
  form: Housing;
}
