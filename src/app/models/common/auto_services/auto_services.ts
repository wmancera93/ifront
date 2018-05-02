import { Url } from "../url/url";

export interface Certificate{

    id: number,
    file: Url,
    op: string,
    pdf_type_ident: string,
    begda: string,
    company_id: number,
    priority: string
   

}