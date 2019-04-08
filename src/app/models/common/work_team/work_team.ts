import { Url } from '../url/url';

export interface MyPosition {
    id?: number;
    email: string;
    pernr: number;
    posicion: string;
    short_name: string;
    name_complete?: string;
    relationship: number;
    image: Url;
    work_team?: Work_team[];

}

export interface Work_team {
    email: string;
    pernr: number;
    posicion: string;
    short_name: string;
    relationship: number;
    total_work_team?: number;
    image: Url;
    work_team?: Work_team[];
    pernr_boss?: number;
    page?: number;
}

