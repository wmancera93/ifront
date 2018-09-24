export interface DataMaster {
    id: number,
    title: string,
    is_editable: boolean,
    value: string
}

export interface ListDataMaster {
    code: number,
    description: string,
    method_name: string
}

export class FormDinamic {
    class_input: string;
    class_label: string;
    control: string;
    id: number;
    is_prerequisite: false;
    name_label: string;
    option: FormDinamicOptions[];
    order: number;
    place_holder: string;
    prerequisite_id: string;
    required: boolean;
    type: string;
    value: string;
}

export class FormDinamicOptions {
    code:string;
    description: string;
    filtrer?: string;
}