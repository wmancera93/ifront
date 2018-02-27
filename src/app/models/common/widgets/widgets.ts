import { Employee } from "../../general/user";

export interface NotificationPrimary {
    title: string,
    number: string,
    comment: string,
    icon: string,
    color_icon: string,
    background: string,
    color: string
}

export interface NotificationSecundary {
    title: string,
    number: string,
    comment: string,
    icon_primary: string,
    icon_secundary: string,
    color_iconPrimary: string,
    color_icon_secundary: string,
    background: string;
    color: string
}

export interface Estadistics {
    title: string,
    number: string,
    comment: string,
    canvas: any,
    background: string;
    color: string
}

export interface Calendar {
    nameDay: string,
    numberDay: string,
    namemonth: string,
    numberYear: string,
    color: string,
    background: string
}

export interface Newspaper {
    id: number,
    titulo: string,
    imagen: Url,
    cuerpo: string,
    ini: string,
    publicado: boolean,
    created_at: Date,
    themes: string[],
    total_views: number,
    total_comments: number,
    created_by: Employee,
}

export interface EventsEmployess {
    id: Number,
    name: string,
    lastname: string
    image: Url,
    posicion: string,
    fecha_ingreso: Date,
    name_event: string,
    event: string,
    icon: string,
    color: string,
    background: string,
    short_name: string,
    description: string
}

interface Url {
    url: string
}


export interface ProgressPrimary {
    title: string,
    nameProgress: string,
    numberProgress: string,
    percentProgress: string,
    iconProgress: string
}
