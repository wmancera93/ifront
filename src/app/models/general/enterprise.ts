import { Url } from "../common/url/url";

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
    background_header_menu: Url,   
    show_approvals_licenses?: boolean,
    show_approvals_master_data?: boolean,
    show_approvals_requirements?:boolean,
    show_articles?: boolean,
    show_banners?: boolean,
    show_birthday?: boolean,
    show_certificates_income?: boolean,
    show_certificates_labor?:boolean,
    show_certificates_payroll?: boolean,
    show_certificates_vacations?: boolean,
    show_demographics_data?: boolean,
    show_document_management?:boolean,
    show_embargoes?: boolean,
    show_hoex?: boolean,
    show_income_and_withholdings?: boolean,
    show_indebtedness_levels?: boolean,
    show_inhabilities?: boolean,
    show_labor?:boolean
    show_licenses?: boolean,
    show_loans?: boolean,
    show_new_employees?: boolean,
    show_organizate_chart?: boolean,
    show_payments_and_deductions?: boolean,
    show_pdf_with_logo?:boolean,
    show_reports_rh?: boolean,
    show_salary_my_team?:boolean,
    show_scesa?: boolean,
    show_services_management?:boolean,
    show_severances?: boolean,
    show_shart_severance?: boolean,
    show_shart_severance_interest?: boolean,
    show_vacation_balance?: boolean,
    show_vacations?: boolean,
    show_vacations_c?: boolean,
    show_verification_code_pdf?: boolean,
    show_work_schedules?:boolean,
    make_request?: boolean,
    make_approvals?: boolean,
}
