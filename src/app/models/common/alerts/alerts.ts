export interface Alerts {
    type: string,
    title: string,
    message: string,
    confirmation?: boolean,
    redirect?: Redirect
}

export interface Redirect {
    url: string
}
