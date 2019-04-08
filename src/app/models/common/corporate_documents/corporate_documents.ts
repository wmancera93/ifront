import { Url } from '../url/url';

export interface Documents {
    base_url: Url;
    type_documents: TypeDocuments;
    documents: Docs;
}

export interface TypeDocuments {
    id: number;
    name: string;
}

export interface Docs {
    name: string;
    url: Url;
    added: string;
    type: number;
    extension: string;
    image: Url;
}
