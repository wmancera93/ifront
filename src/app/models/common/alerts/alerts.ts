export interface Alerts {
    type: string,
    title: string,
    message: string,
    confirmation?: boolean,
    typeConfirmation?: string

}

export interface Redirect {
    url: string
}
