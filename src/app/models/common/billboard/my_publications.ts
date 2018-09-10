import { Url } from "../url/url";

export interface Article {
    message: string,
    data: PublicArticle,
}
export interface PublicArticle {
    id: number,
    employee_id: number,
    title: string,
    creation_date: string,
    image: Url,
    body: string,
    summary: string,
    publish: boolean,
    themes: string,
    total_comments: number,
    total_views: number,
    created_by: image,
    short_name: string,
    comments_articles: Comments,
}
export interface Comments {

    id: number,
    comment_text: string,
    employee_id: number,
    created_by: image,
    short_name: string
}

export interface image {
    image: Url
}