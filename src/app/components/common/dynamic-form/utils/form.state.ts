import {
  FormCasesInterface,
  forms,
} from '../../../../models/common/dynamic-form/dynamic-form';

export class FormState implements FormCasesInterface {
  public forms: forms;
  public caseForm;

  constructor({ cases, allCases }: forms) {
    this.forms = { cases, allCases } as forms;
  }

  public setCaseForm(caseForm: string): FormCasesInterface {
    this.caseForm = caseForm;
    return this;
  }

  public run(form: string): boolean {
    const { cases, allCases } = this.forms as forms;
    try {
      return { ...allCases, ...cases[this.caseForm] }[form] || false;
    } catch (e) {
      return false;
    }
  }
}
