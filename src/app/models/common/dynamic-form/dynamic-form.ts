export class QuestionBase<T> {
    value: T;
    key: string;
    text: string;
    required: boolean;
    order: number;
    controlType: string;
}

export class DropDownQuestion extends QuestionBase<string> {
    options = [];
    controlType = 'dropdown';
    constructor() {
        super();
    }
}
export class TextboxQuestion extends QuestionBase<string> {
    type: string;
    controlType = 'textbox';
    constructor() {
        super();
    }
}
