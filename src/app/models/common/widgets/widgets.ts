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
    image: Url,
    themes: ThemesNewspaper[]
}

interface ThemesNewspaper {
    description: string
}

export interface EventsEmployess {
    name: string,
    event: string,
    posicion: string,
    image: Url,
    icon: string,
    description: string,
    color: string,
    background: string
}

interface Url {
    url: string
}
