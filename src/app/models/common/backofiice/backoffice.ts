export interface Result {
  data: InfoEmployye[];
  success: boolean;
}

export interface InfoEmployye {
  posicion: string;
  unidad_org: string;
  area: string;
  division_per: string;
  subdivision_per: string;
  fecha_ingreso: string;
  short_name: string;
  id: number | string;
  is_locked: boolean;
}
