export interface NotificationPrimary {
    title: string,
    number: string,
    comment: string,
    icon: string,
    colorIcon: string,
    background: string,
    color: string
}

export interface NotificationSecundary {
    title: string,
    number: string,
    comment: string,
    iconPrimary: string,
    iconSecundary: string,
    colorIconPrimary: string,
    colorIconSecundary: string,
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
    title: string,
    description: string,
    image: string,
    themes: ThemesNewspaper[]
}

export interface ThemesNewspaper {
    descripcion: string
}