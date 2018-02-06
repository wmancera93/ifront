export interface Enterprise {
    id: number,
    name: string,
    name_file_css?: string,
    primary_color: string,
    text_primary_color: string,
    body_text: string,
    background_wrapper_color: string,
    logo_inside: Url,
    logo_dashboard: Url,
    background_login: Url,
    background_lockscreen: Url,
    background_header_menu: Url
}

export interface Url {
    url: string
}