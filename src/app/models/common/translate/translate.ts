export interface Translate {
    app: App
}

interface App {
    frontEnd: FrontEnd,
}
interface FrontEnd {
    components: Components,
    pages: Pages,
    services: Services,
}
interface Components {
    common: Common,
    layout: Layout,
}
interface Common {
    alerts: Alerts,
    approvals_details: Approvals_details,
    calendar_detail: Calendar_detail,
    calendar_modal: Calendar_modal,
    comment_article: Comment_article,
    data_table: Data_table,
    draw_calendar: Draw_calendar,
    dynamic_form: Dynamic_form,
    employee: Employee,
    error_page_http: Error_page_http,
    file_upload: File_upload,
    gerencial_modal: Gerencial_modal,
    show_events: Show_events,
    time_line_approvers: Time_line_approvers,
    travels: Travels,
    widgets: Widgets,
}
interface Alerts {
    button_confirm: string,
    button_cancel: string,
    button_close: string,
}
interface Approvals_details {
    apply_for: string,
    status: string,
    since: string,
    until: string,
    requested_days: string,
    last_update: string,
    creation: string,
    approver: string,
    observations: string,
    attached: string,
    manage_request: string,
    see_details: string,
    accept: string,
    rejected: string,
    approved: string,
    description: string,
    save: string,
    loading: string,
    level_approver: string,
    lack_details: string,
    button_close: string,
}

interface Calendar_detail {
    details: string,
    activity_descrption: string,
    theoretical_hours: string,
    hour_begin: string,
    hour_end: string,
    calendar_text: string,
    description_work: string,
}

interface Calendar_modal {
    schedule: string,
}

interface Comment_article {
    themes: string,
    see_comments: string,
    hide_comments: string,
    views: string,
    comment: string,
    the_day: string,
    save: string,
    loading: string,
    btn_close: string,
    type_alert_confirmation_ts: string,
    msg_alert_save_ts: string,
    type_alert_denied_ts: string,
    msg_alert_erase_ts: string
}

interface Data_table {
    records_show: string,
    without_reports: string,
    employee: string,
}
interface Draw_calendar {
    today: string,
}
interface Dynamic_form {
    save: string,
    loading: string,
}
interface Employee {
    employee_info: Employee_info,
}
interface Employee_info {
    working_information: string,
    email: string,
    phone: string,
    position: string,
    unit_org: string,
    area: string,
    boss: string,
    division: string,
    sub_division: string,
    date_admission: string,
    contract: string,
    personal_information: string,
    birth_date: string,
    identification: string,
    personal_phone: string,
    address: string,
    button_close: string,
}

interface Error_page_http {
    start: string,
}

interface File_upload {
    upload: string,
}
interface Gerencial_modal {
    without_reports: string,
    employee: string,
    button_close: string,
}
interface Show_events {
    button_close: string,
}
interface Time_line_approvers {
    request: string,
    date_begin: string,
    date_end: string,
    requested_days: string,
    attached: string,
    see_attached: string,
    observations: string,
    created: string,
    status: string,
    approver: string,
    pending: string,
    button_close: string,
    detail_requests: string
}
interface Travels {
    approvals_details_travels: Approvals_details_travels,
}
interface Approvals_details_travels {
    show_dist_spends: Show_dist_spends,
    show_hotels_journey: Show_hotels_journey,
    pdf_travel: Pdf_travel,
    travel_requests: string,
    applicants: string,
    status: string,
    date_begin: string,
    date_end: string,
    upgrade: string,
    create: string,
    approvers: string,
    see_travels: string,
    see_attach: string,
    see_advance: string,
    see_spend: string,
    see_attach_spend: string,
    approver: string,
    request_manage: string,
    see_details: string,
    accept: string,
    rejected: string,
    approved: string,
    description: string,
    save: string,
    loading: string,
    approver_level: string,
    for: string,
    negative_observation: string,
    negative_detail: string,
    button_close: string,
}
interface Show_dist_spends {
    distribution_cost: string,
    back: string,
    code_spending: string,
    type_expense: string,
    amount: string,
    date: string,
    imputation_element: string,
    cost_center: string,
    graph: string,
    operation: string,
    order: string,
    account_contable: string,
    distribution: string,
    negative_distribution: string,
}
interface Show_hotels_journey {
    change_travel: string,
    back: string,
    hotel_assigned: string,
    hotel: string,
    date_begin: string,
    date_end: string,
    negative_hoteL: string,
}
interface Pdf_travel {
    pdf: string,
}
interface Widgets {
    calendar: Calendar,
    estadistics: Estadistics,
    events_employees: Events_employees,
    newspaper: Newspaper,
    notification_primary: Notification_primary,
    notification_secundary: Notification_secundary,
    progress_primary: Progress_primary,
}
interface Calendar {
    negative_message: string
}
interface Estadistics {
    hour_night_festive: string,
    hour_diurnal: string,
    hour_night_continue: string,
    hour_ordinary: string,
    hour_diurnal_festive: string,
    hour_night_ordinary: string,
    hour_night: string,
    hour_field: string,
    hour_night_field: string,
    hour_continue_festive: string,
    hour_planned: string,
    tittle_ts: string,
}
interface Events_employees {
    negative_message: string,
}
interface Newspaper {
    news: string,
    theme: string,
    comment: string,
    visit: string,
    negative_news: string,
}
interface Notification_primary {
    negative_message: string,
}
interface Notification_secundary {
    negative_message: string,
}
interface Progress_primary {
    negative_message: string,
}
interface Layout {
    contacts_list: Contacts_list,
    header: Header,
    menu_navigation: Menu_navigation,
}
interface Contacts_list {
    partner: string,
    negative_message: string,
}
interface Header {
    partner: string,
    out_door: string,
}
interface Menu_navigation {
    start: string,
    org_chart: string,
    my_data: string,
    self_service: string,
    certificate_work: string,
    receipts: string,
    certificate_ing_ret: string,
    letter_vacations: string,
    queries: string,
    ing_ret: string,
    pay_deduc: string,
    historical_cesa: string,
    distress: string,
    payday: string,
    enjoyed_vacation: string,
    compensated_vacation: string,
    balance_vacation: string,
    pass: string,
    inability: string,
    extra_hour: string,
    anniversary: string,
    historical_posts: string,
    iva_movements: string,
    time_evaluations: string,
    hour_extra: string,
    reports_rh: string,
    request_report: string,
    user_permits: string,
    approver_Request: string,
    billboards: string,
    news: string,
    own_puplication: string,
    requests: string,
    approvers: string,
    pending: string,
    managed: string,
    queries_approver: string,
    banners: string,
    evaluations: string,
    performance_evaluation: string,
    query_evaluation: string,
    query_objetive: string,
    manage_travel: string,
    manage_training: string,
    agreements_training: string,
    report_training: string,
    docs_org: string,
    help: string,
}

interface Pages {
    approver_request: Approver_request,
    authentication: Authentication,
    auto_services: Auto_services,
    billboard: Billboard,
    corporate_documents: Corporate_documents,
    dashboard: Dashboard,
    error_page: Error_page,
    evaluations: Evaluations,
    events_management: Events_management,
    help: Help,
    hierarchical_chart: Hierarchical_chart,
    master_data: Master_data,
    my_team: My_team,
    performance_evaluation: Performance_evaluation,
    queries: Queries,
    reports_rh: Reports_rh,
    requests_rh: Requests_rh,
    travel_management: Travel_management,
}
interface Approver_request {
    managed: Managed,
    pendings: Pendings,
}
interface Managed {
    title_ppprovals_managed: string,
    message_approvals: string,
    text_ticket: string,
    text_created_on: string,
    text_Applicant: string,
    text_status: string,
    icon_watch: string,
}
interface Pendings {
    title_ppprovals_pending: string,
    icon_return: string,
    msg_pending_request_one: string,
    msg_pending_request_two: string,
    msg_pending_requests_one: string,
    msg_pending_requests_two: string,
    msg_no_pending_requests_one: string,
    msg_no_pending_requests_two: string,
    text_ticket: string,
    text_Applicant: string,
    text_created_on: string,
    icon_watch: string,
    msg_sf_transaction_ts: string,
    msg_cf_transaction_ts: string,
}
interface Authentication {
    confirm_reset_account: Confirm_reset_account,
    locket_screen: Locket_screen,
    login: Login,
    reset_account: Reset_account,
}
interface Confirm_reset_account {
    title_welcome: string,
    text_system_hr: string,
    text_reset_account: string,
    text_reset: string,
    title_warning_ts: string,
    msg_new_password_ts: string,
    ts_warning_text_two: string,
    msg_characters_minimum_ts: string,
    msg_not_match_ts: string,
    msg_enter_again_ts: string,
}
interface Locket_screen {
    text_enter_mail: string,
    btn_start: string,
    title_warning_ts: string,
    title_warning_ts_one: string,
    msg_required_password_ts: string,
    title_warning_ts_two: string,
    msg_characters_minimum_ts: string,
}
interface Login {
    title_welcome: string,
    text_system_hr: string,
    text_login: string,
    btn_start: string,
    text_remember: string,
    text_forget_pass: string,
    title_warning_ts_one: string,
    msg_characters_minimum_ts: string,
    msg_email_is_required_ts: string,
    msg_tincorrect_format_ts: string,
    msg_enter_your_data_ts: string,
}
interface Reset_account {
    title_welcome: string,
    text_restore_password: string,
    text_mail_reset_password: string,
    text_restore: string,
    text_login: string,
    title_warning_ts: string,
    msg_email_is_required_ts: string,
    msg_wrong_email_format_ts: string,
}
interface Auto_services {
    certificate_income_withholding: Certificate_income_withholding,
    holiday_letter: Holiday_letter,
    labor_certificates: Labor_certificates,
    payroll_receipts: Payroll_receipts,
}
interface Certificate_income_withholding {
    title_income_withholdings: string,
    text_certificate_not_found: string,
    text_income_withholdings: string,
    text_for_the_employee: string,
}
interface Holiday_letter {
    title_letter_vacation: string,
    text_vacation_letter_not_found: string,
    text_vacation: string,
    text_for_the_employee: string,
}
interface Labor_certificates {
    title_work_letter: string,
    text_letter_not_found: string,
    text_work_letter: string,
    text_for_the_employee: string,
    text_code_work_letter: string,
    msg_verification_code_one: string,
    msg_verification_code_two: string,
    msg_verification_code_three: string,
    btn_accept: string,
    btn_cancel: string,
}
interface Payroll_receipts {
    tittle: string,
    message_one: string,
    message_two: string,
    message_tree: string,
}

interface Billboard {
    my_publication: My_publication,
    news: News,
}
interface My_publication {
    title_my_publications: string,
    btn_create_news: string,
    text_my_news: string,
    text_total_news: string,
    text_hide_post: string,
    text_visits: string,
    text_comments: string,
    text_edit: string,
    text_remove: string,
    title_confirmation_ts_one: string,
    msg_confirmation_ts: string,
    msg_elimination_confirmation_ts: string,
    edit_publication: Edit_publication,
    new_article_form: New_article_form,
}
interface Edit_publication {
    title_form_news: string,
    text_title: string,
    text_summary: string,
    text_topic: string,
    text_upload_image: string,
    btn_save: string,
    text_loading: string,
    btn_close: string,
    title_status_news_ts: string,
    msg_edited_news_ts: string,
}
interface New_article_form {
    title_form_news: string,
    text_title: string,
    text_summary: string,
    text_topic: string,
    text_upload_image: string,
    btn_save: string,
    text_loading: string,
    btn_close: string,
    msg_denied_request_ts: string,
    msg_empty_fields_ts: string,
    text_status_news_ts: string,
    msg_saved_news_ts: string,
}
interface Corporate_documents {
    title_corporate_documents: string,
}
interface Dashboard {
    text_management_dashboard: string,
    tittle: string,
}
interface Error_page {
    title_not_found: string,
    text_not_found: string,
    text_go_to_home: string,
}
interface News {
    title_news: string,
    text_not_exist_one: string,
    text_not_exist_two: string,
    text_not_exist_three: string,
    text_topics: string,
    text_statistics: string,
    text_views: string,
    tex_comments: string,
}
interface Evaluations {
    evaluated: Evaluated,
}
interface Evaluated {
    title_valuation_status: string,
    text_pending_evaluations_one: string,
    text_pending_evaluations_four: string,
    text_pending_evaluations_two: string,
    text_pending_evaluations_three: string,
    text_present: string,
    text_managed: string,
    text_managed_evaluations_one: string,
    text_managed_evaluations_two: string,
    text_managed_evaluations_three: string,
    icon_watch: string,
    fill_evalaution: Fill_evalaution,
    show_evaluation: Show_evaluation,
}
interface Fill_evalaution {
    btn_save: string,
    text_loading: string,
    btn_close: string,
    text_success_ts: string,
    ts_warning_text: string,
    msg_denied_request_ts: string,
    msg_continue_ts: string,
}
interface Show_evaluation {
    text_total_questions: string,
    text_totalcorrect_questions: string,
    text_totalcorrect_questions_one: string,
    text_not_apply: string,
    text_correct
    text_incorrect: string,
    btn_close: string,

}
interface Events_management {
    training: Training,
}
interface Training {
    text_trainings: string,
    report_training: Report_training,
    view_training: View_training,
}
interface Report_training {
    title_report_training: string,
    text_Query_filters: string,
    text_employee_code: string,
    text_training_code: string,
    text_training_status: string,
    text_select: string,
    text_accepted: string,
    text_pending: string,
    text_start_date: string,
    text_end_date: string,
    text_query: string,
    text_no_records_found: string,
    text_training_agreements_ts: string,
}
interface View_training {
    title_training_agreements: string,
    text_x: string,
    text_start: string,
    text_end: string,
    text_duration_days: string,
    text_days: string,
    text_duration_hours: string,
    text_hours_day: string,
    text_view_pdf: string,
    text_observations: string,
    btn_accept: string,
    btn_decline: string,
    title_confirmation_ts: string,
    text_status_training: string,
    title_warning_ts: string,
}
interface Help {
    title_help: string,
    text_dashboard_ts: string,
    text_operation_dashboard_ts: string,
    text_organization_chart_ts: string,
    text_functioning_organization_chart_ts: string,
    text_my_data_ts: string,
    text_functioning_my_datat_ts: string,
}
interface Hierarchical_chart {
    title_organization_chart: string,
    text_superior: string,
    text_my_position: string,
    text_subordinates: string,
    text_up_position: string,
    masg_click_button_ts: string,
}
interface Master_data {
    title_my_data: string,
    text_no_information: string,
    text_available: string,
    text_edit: string,
    ts_warningone_text_one: string,
    msg_denied_request_ts: string,
    msg_no_modification_ts: string,
    title_confirmation_ts: string;
    title_contact_information_ts: string;
    title_family_information_ts: string;
    title_academic_information_ts: string;
    title_business_information_ts: string;
    title_Bank_information_ts: string;
    title_beneficiaries_information_ts: string;
    title_social_security_information_ts: string;
    title_withholding_information_ts: string;
}
interface My_team {
    title_my_team: string,
    btn_back: string
    my_team_reports: my_team_reports,
}
interface my_team_reports {
    text_information_employee: string,
    btn_back: string,
}
interface Performance_evaluation {
    evaluation_objetives: Evaluation_objetives,
    planning_evaluation: Planning_evaluation,
}
interface Evaluation_objetives {
    edit_evaluation_objetives: Edit_evaluation_objetives,
    view_evaluation_objetives: View_evaluation_objetives,
    tittle: string,
    sub_tittle: string,
    message_begin: string,
    message_continue: string,
    message_end: string,
    date_create: string,
    status: string,
    evaluator: string,
    negative_message: string,
    see: string,
    edit: string,
    download_evaluation: string,
}
interface Edit_evaluation_objetives {
    tittle: string,
    sub_tittle: string,
    type_evaluation: string,
    time_evaluation: string,
    start: string,
    ended: string,
    evaluator: string,
    evaluation_objetives: string,
    number_objetives: string,
    percentage_full: string,
    percentage_missing: string,
    btn_edit: string,
    btn_new: string,
    create: string,
    date_begin: string,
    date_end: string,
    porridge: string,
    description: string,
    button_cancel: string,
    save: string,
    loading: string,
    finish: string,
    name_table_ts: string,
    type_alert_ts: string,
    type_alert_one_ts: string,
    message_alert_ts: string,
}
interface View_evaluation_objetives {
    tittle: string,
    sub_tittle: string,
    type_evaluation: string,
    time_evaluation: string,
    start: string,
    ended: string,
    evaluator: string,
    evaluation_objetives: string,
    number_objetives: string,
    percentage_full: string,
    percentage_missing: string,
    name_table_ts: string,
}
interface Planning_evaluation {
    tittle: string,
    name_table_ts: string,
    edit_planning_date: Edit_planning_date,
}
interface Edit_planning_date {
    tittle: string,
    sub_tittle: string,
    date_begin: string,
    date_end: string,
    button_cancel: string,
    save: string,
    loading: string,
    type_alert_ts: string,
    type_alert_one_ts: string,
    msg_alert_ts: string,
}
interface Queries {
    aniversary: Aniversary,
    compnsated_vacations: Compnsated_vacations,
    disabilities: Disabilities,
    embargoes: Embargoes,
    extra_hours: Extra_hours,
    historical_posts: Historical_posts,
    income_withholdings: Income_withholdings,
    iva_employee: Iva_employee,
    loans: Loans,
    my_hour_extras: My_hour_extras,
    payments_deductions: Payments_deductions,
    permissions: Permissions,
    severances: Severances,
    time_evaluation: Time_evaluation,
    vacation_balance: Vacation_balance,
    vacation_enjoyed: Vacation_enjoyed,
}
interface Aniversary {
    name_table_ts: string,
}
interface Compnsated_vacations {
    name_table_ts: string,
}
interface Disabilities {
    name_table_ts: string,
}
interface Embargoes {
    name_table_ts: string,
}
interface Extra_hours {
    name_table_ts: string,
}
interface Historical_posts {
    name_table_ts: string,
}
interface Income_withholdings {
    name_table_ts: string,
}
interface Iva_employee {
    name_table_ts: string,
}
interface Loans {
    name_table_ts: string,
}
interface My_hour_extras {
    name_table_ts: string,
}
interface Payments_deductions {
    name_table_ts: string,
}
interface Permissions {
    name_table_ts: string,
}
interface Severances {
    name_table_ts: string,
}
interface Time_evaluation {
    tittle: string,
    back: string,
    query_filters: string,
    date_begin: string,
    date_end: string,
    btn_query: string,
    name_table_ts: string,
    message_alert_ts: string,
}
interface Vacation_balance {
    back: string,
    name_table_ts: string,
}
interface Vacation_enjoyed {
    name_table_ts: string,
}
interface Reports_rh {
    hour_extras: Hour_extras,
    permisions_users: Permisions_user,
    requests: Request,
    requests_approvers: Requests_approver,
}
interface Hour_extras {
    name_table_ts: string,
    back: string,
}
interface Permisions_user {
    tittle: string,
    back: string,
    query_filters: string,
    permtits_with: string,
    create: string,
    see_chart: string,
    permtits: string,
    manage_report: string,
    managed: string,
    show_records: string,
    yes: string,
    not: string,
    generate_ts: string,
    page: string,
}
interface Request {
    tittle: string,
    back: string,
    query_filters: string,
    all: string,
    in_proces: string,
    cancel: string,
    pending: string,
    approver: string,
    show_records: string,
    yes: string,
    not: string,
    generate_ts: string,
    page: string,
    tittle_pdf_ts: string,
}
interface Requests_approver {
    name_table_ts: string,
    back: string,
    query_filters: string,
    approver_with: string,
    approver: string,
}
interface Requests_rh {
    forms_requests: Forms_requests,
    tittle: string,
    back: string,
    btn_new: string,
    query_filters: string,
    my_queries: string,
    ticket: string,
    date_created: string,
    status: string,
    approver: string,
    see: string,
    erase: string,
    type_alert_ts: string,
    message_alert_ts: string,
    type_alert_one_ts: string,
    type_alert_two_ts: string,
}
interface Forms_requests {
    tittle: string,
    days_available: string,
    day_available: string,
    date_begin: string,
    date_end: string,
    observation: string,
    save: string,
    loading: string,
    day_required: string,
    message_attach: string,
    hour_begin: string,
    hour_end: string,
    button_close: string,
    type_alert_ts: string,
    message_alert_ts: string,
    type_alert_one_ts: string,
    message_alert_two_ts: string,
}
interface Travel_management {
    advances: Advances,
    approver_travels: Approver_travels,
    hotels: Hotels,
    reports: Reports,
    spend: Spend,
    travel: Travel,
    tittle: string,
    titlle_wiget_travel_ts: string,
    message_wiget_travel_ts: string,
    titlle_wiget_advance_ts: string,
    message_wiget_advance_ts: string,
    titlle_wiget_allowance_ts: string,
    message_wiget_allowance_ts: string,
    titlle_wiget_approver_ts: string,
    message_wiget_approver_ts: string,
    titlle_wiget_pendinga_ts: string,
    message_wiget_pendinga_ts: string,
    titlle_wiget_report_ts: string,
    message_wiget_report_ts: string,
    titlle_wiget_hotel_ts: string,
    message_wiget_hotel_ts: string,
}
interface Advances {
    message_synch_advance: Message_synch_advance,
    new_advance: New_advance,
    view_advance: View_advance,
    tittle: string,
    back: string,
    btn_new: string,
    query_filters: string,
    btn_hr: string,
    btn_sap: string,
    date_begin: string,
    date_end: string,
    status: string,
    all_status: string,
    resgistered: string,
    process: string,
    approved: string,
    cancelled: string,
    hold_on: string,
    status_settle: string,
    to_settle: string,
    settlement: string,
    canceled: string,
    employee: string,
    select_my: string,
    select_third: string,
    travel_sap: string,
    error_synch: string,
    travel_ihr: string,
    date_in: string,
    date_out: string,
    status_label: string,
    approver: string,
    message_approver: string,
    see: string,
}
interface Message_synch_advance {
    message_head: string,
    message_body: string,
    name_data_table_ts: string,
}
interface New_advance {
    tittle: string,
    message: string,
    message_third: string,
    message_erase_third: string,
    select_travel: string,
    select_pay: string,
    import: string,
    currency: string,
    date_advance: string,
    option_select: string,
    observation: string,
    btn_add: string,
    tittle_detail: string,
    save: string,
    loading: string,
    name_data_table_ts: string,
    message_alert_ts: string,
    message_alert_date_ts: string,
    message_alert_ts_one: string,
    message_alert_date_one_ts: string,
    field_one: string,
    field_two: string,
    field_tree: string,
    field_four: string,
    field_five: string,
    field_six: string,
    field_seven: string,
}
interface View_advance {
    tittle: string,
    travel: string,
    status: string,
    button_close: string,
    name_data_table_ts: string,
}
interface Approver_travels {
    manged_travel: Manged_travel,
    pending_travel: Pending_travel,
}
interface Manged_travel {
    tittle: string,
    back: string,
    message_start: string,
    message_travel_end: string,
    message_untravel: string,
    message_advance_end: string,
    message_start_advance: string,
    message_unadvance: string,
    message_travel_spend: string,
    message_unspend: string,
    btn_filter: string,
    query_filters: string,
    btn_hr: string,
    btn_sap: string,
    date_begin: string,
    date_end: string,
    applicant: string,
    negative_message: string,
    date_in: string,
    date_out: string,
    date_created: string,
    see: string,
    filter_one: string,
    filter_two: string,
    filter_three: string,
}
interface Pending_travel {
    tittle: string,
    back: string,
    message_start: string,
    message_travel_end: string,
    message_travel_ends: string,
    message_untravel: string,
    message_advance_end: string,
    message_end_advance: string,
    message_end_advances: string,
    message_unadvance: string,
    message_travel_spend: string,
    message_travel_spends: string,
    message_unspend: string,
    btn_filter: string,
    query_filters: string,
    btn_hr: string,
    btn_sap: string,
    date_begin: string,
    date_end: string,
    applicant: string,
    negative_message: string,
    date_in: string,
    date_out: string,
    date_created: string,
    see: string,
    filter_one: string,
    filter_two: string,
    filter_three: string,
}
interface Hotels {
    new_hotel: New_hotel,
    tittle: string,
    back: string,
    btn_new: string,
    hotel_cod: string,
    erase_hotel: string,
    tittle_alert: string,
    message_alert: string,
    tittle_alert_one_ts: string,
    message_alert_two_ts: string,
}
interface New_hotel {
    tittle: string,
    country: string,
    option_select: string,
    status: string,
    name_hotel: string,
    save: string,
    loading: string,
    type_alert_one_ts: string,
    message_alert: string,
    type_alert_two_ts: string,
}
interface Reports {
    travel_advance_report: Travel_advance_report,
    travel_allowance_report: Travel_allowance_report,
    travel_approver_report: Travel_approver_report,
    travel_request_report: Travel_request_report,
}
interface Travel_advance_report {
    tittle: string,
    back: string,
    btn_filter: string,
    query_filters: string,
    employee_code: string,
    code_ihr: string,
    code_sap: string,
    date_begin: string,
    date_end: string,
    btn_query: string,
    negative_query: string,
    tittle_ts: string,
    name_table_ts: string,
    message_alert_one_ts: string,
    type_alert_ts: string,
    message_alert_two_ts: string,
}
interface Travel_allowance_report {
    tittle: string,
    back: string,
    btn_filter: string,
    query_filters: string,
    employee_code: string,
    code_ihr: string,
    code_sap: string,
    type_legal: string,
    option_select: string,
    date_begin: string,
    date_end: string,
    btn_query: string,
    negative_query: string,
    tittle_ts: string,
    name_table_ts: string,
    message_alert_one_ts: string,
    type_alert_ts: string,
    message_alert_two_ts: string,
}
interface Travel_approver_report {
    tittle: string,
    back: string,
    btn_filter: string,
    query_filters: string,
    employee_code: string,
    code_ihr: string,
    code_sap: string,
    approver_level: string,
    option_select: string,
    approver_code: string,
    date_begin: string,
    date_end: string,
    btn_query: string,
    negative_query: string,
    tittle_ts: string,
    name_table_ts: string,
    message_alert_one_ts: string,
    type_alert_ts: string,
    message_alert_two_ts: string,
}
interface Travel_request_report {
    tittle: string,
    back: string,
    btn_filter: string,
    query_filters: string,
    employee_code: string,
    code_ihr: string,
    code_sap: string,
    type_legal: string,
    option_select: string,
    type_element: string,
    date_begin: string,
    date_end: string,
    btn_query: string,
    negative_query: string,
    tittle_ts: string,
    name_table_ts: string,
    message_alert_one_ts: string,
    type_alert_ts: string,
    message_alert_two_ts: string,
}
interface Spend {
    dist_spend: Dist_spend,
    edit_spend: Edit_spend,
    message_synch_spend: Message_synch_spend,
    new_spend: New_spend,
    spend_hotel_journey: Spend_hotel_journey,
    view_spend: View_spend,
    tittle: string,
    back: string,
    btn_new: string,
    query_filters: string,
    btn_hr: string,
    btn_sap: string,
    date_begin: string,
    date_end: string,
    status: string,
    all_status: string,
    resgistered: string,
    process: string,
    approved: string,
    cancelled: string,
    hold_on: string,
    employee: string,
    status_settle: string,
    to_settle: string,
    settlement: string,
    canceled: string,
    select_my: string,
    select_third: string,
    travel_sap: string,
    error_synch: string,
    travel_ihr: string,
    date_in: string,
    date_out: string,
    status_label: string,
    approver: string,
    message_approver: string,
    see: string,
    edit: string,
    erase: string,
}
interface Dist_spend {
    tittle: string,
    back: string,
    code_spend: string,
    type_spend: string,
    import: string,
    date: string,
    column_cero: string,
    column_one: string,
    column_two: string,
    column_tree: string,
    column_four: string,
    column_five: string,
    column_six: string,
    column_seven: string,
    negative_message: string,
    add_dist: string,
    option_select: string,
    account: string,
    btn_cancel: string,
    type_alert_ts: string,
    message_alert_ts: string,
    type_alert_one_ts: string,
}
interface Edit_spend {
    tittle: string,
    travel: string,
    subtittle: string,
    attach: string,
    see_attach: string,
    download_attach: string,
    message_attach: string,
    btn_new: string,
    label_edit: string,
    label_new: string,
    description: string,
    form_a: string,
    type_document: string,
    option_select: string,
    store: string,
    nit: string,
    date_spend: string,
    bill_number: string,
    authorization: string,
    control_number: string,
    type_spend: string,
    import: string,
    money: string,
    populate: string,
    btn_cancel: string,
    bnt_add: string,
    btn_changes: string,
    save: string,
    loading: string,
    bnt_edit: string,
    tittle_ts: string,
    type_alert_ts: string,
    type_alert_one_ts: string,
    type_alert_two_ts: string,
    message_alert_ts: string,
    message_alert_one_ts: string,
    type_alert_tree_ts: string,
    message_alert_two_ts: string,
    type_alert_four_ts: string,
}
interface Message_synch_spend {
    tittle: string,
    message_detail: string,
    detail_travel: string,
    tittle_table: string,
}
interface New_spend {
    tittle: string;
    spend_third: string;
    employee_third: string;
    erase_third: string;
    travel: string;
    subtittle: string;
    attach: string;
    see_attach: string;
    download_attach: string;
    message_attach: string;
    btn_new: string;
    label_edit: string;
    label_new: string;
    description: string;
    form_a: string;
    type_document: string;
    option_select: string;
    store: string;
    nit: string;
    date_spend: string;
    bill_number: string;
    authorization: string;
    control_number: string;
    type_spend: string;
    import: string;
    money: string;
    populate: string;
    seccion_dist: string;
    column_cero: string;
    column_one: string;
    column_two: string;
    column_tree: string;
    column_four: string;
    column_five: string;
    column_six: string;
    column_seven: string;
    bnt_add: string;
    save_new: string;
    save_edit: string;
    save_requests: string;
    btn_cancel: string;
    loading: string;
    tittle_ts: string;
    type_alert_ts: string;
    type_alert_one_ts: string;
    type_alert_two_ts: string;
    message_alert_one_ts: string;
    type_alert_tree_ts: string;
    message_alert_two_ts: string;
    type_alert_four_ts: string;
    message_alert_tree_ts: string;
    message_alert_four_ts: string;
    message_alert_five_ts: string;
    tittle_table_ts: string;
    field_cero: string;
    field_one: string;
    field_two: string;
    field_tree: string;
    field_four: string;
    field_five: string;
    field_six: string;
    field_seven: string;
    field_eight: string;
    field_nine: string;
    field_onecero: string;
    field_oneone: string;
    field_onetwo: string;
    field_onetree: string;
    field_onefour: string;
}
interface Spend_hotel_journey {
    tittle: string,
    trayect: string,
    back: string,
    hotel_asig: string,
    column_cero: string,
    column_one: string,
    column_two: string,
    negative_message: string,
}
interface View_spend {
    tittle: string,
    name_travel: string,
    type_travel: string,
    status: string,
    subtittle: string,
    see_attach: string,
    download_attach: string,
    view_trayect: string,
    date_requests_travel: string,
    date_requests_travel_end: string,
    view_advances: string,
    btn_send: string,
    btn_export: string,
    btn_close: string,
    tittle_ts: string,
    tittle_advances_ts: string,
    tittle_trayect_ts: string,
    type_alert_ts: string,
    message_alert_one_ts: string,
    type_alert_two_ts: string,
    message_alert_two_ts: string,
}
interface Travel {
    edit_travel: Edit_travel,
    hotels_journey: Hotels_journey,
    message_synch: Message_synch,
    new_travel: New_travel,
    show_dist_spends_travels: Show_dist_spends_travels,
    view_travel: View_travel,
    tittle: string,
    back: string,
    bnt_new: string,
    query_filters: string,
    btn_hr: string,
    btn_sap: string,
    date_begin: string,
    date_end: string,
    status: string,
    all_status: string,
    resgistered: string,
    process: string,
    approved: string,
    cancelled: string,
    hold_on: string,
    employee: string,
    status_settle: string,
    to_settle: string,
    settlement: string,
    canceled: string,
    select_my: string,
    select_third: string,
    travel_sap: string,
    error_synch: string,
    travel_ihr: string,
    date_in: string,
    date_out: string,
    status_label: string,
    approver: string,
    flow_approver: string,
    message_approver: string,
    see: string,
    edit: string,
    erase: string,
    approver_ts: string,
    type_alert_ts: string,
    message_alert_ts: string,
    type_alert_one_ts: string,
    type_alert_two_ts: string,
    message_alert_one_ts: string,
}
interface Edit_travel {
    tittle: string,
    ticket_sap: string,
    travel_third: string,
    message_third: string,
    travel_for_third: string,
    erase_third: string,
    type_travel: string,
    option_select: string,
    date_begin: string,
    date_end: string,
    reason_travel: string,
    check_maintenance: string,
    type_legal: string,
    type_especific: string,
    type_activity: string,
    imputation_element: string,
    cost_center: string,
    order: string,
    graph: string,
    operation: string,
    trayect: string,
    no_name: string,
    see_attach: string,
    download_attach: string,
    attach_saved: string,
    attach: string,
    label_edit: string,
    label_create: string,
    transport: string,
    mileage: string,
    origin_place: string,
    country: string,
    region: string,
    place: string,
    origin_terminal: string,
    date_begin_trayect: string,
    hour_begin: string,
    destination_place: string,
    destination_terminal: string,
    date_end_trayect: string,
    hour_end: string,
    btn_add_trayect: string,
    btn_add_changes: string,
    button_cancel: string,
    comments: string,
    save: string,
    loading: string,
    name_table_ts: string,
    type_alert_ts: string,
    message_alert_ts: string,
    message_alert_one_ts: string,
    type_alert_one_ts: string,
    message_alert_two_ts: string,
    message_alert_tree_ts: string,
    type_alert_two_ts: string,
    message_alert_four_ts: string,
    message_alert_five_ts: string,
    message_alert_six_ts: string,
    message_alert_seven_ts: string,
    message_alert_eight_ts: string,
    message_alert_nine_ts: string,
    message_alert_sten_ts: string,
    message_alert_eleven_ts: string,
    message_alert_twelve_ts: string,
    message_alert_thirteen_ts: string,
    message_alert_fourteen_ts: string,
    message_alert_fiveteen_ts: string,
    message_alert_seventeen_ts: string,
    message_alert_eighteen_ts: string,
}
interface Hotels_journey {
    tittle: string,
    trayect: string,
    back: string,
    date_begin: string,
    date_end: string,
    hotel_assigned: string,
    column_cero: string,
    column_one: string,
    column_two: string,
    column_tree: string,
    negative_hotel: string,
    option_select: string,
    type_alert_ts: string,
    message_alert_ts: string,
}
interface Message_synch {
    tittle: string,
    type_travel: string,
    date_begin: string,
    date_end: string,
    reason_travel: string,
    tittle_table: string,
}
interface New_travel {
    tittle: string,
    message_third: string,
    travel_for_third: string,
    erase_third: string,
    type_travel: string,
    option_select: string,
    date_begin: string,
    date_end: string,
    reason_travel: string,
    check_maintenance: string,
    type_legal: string,
    type_especific: string,
    type_activity: string,
    imputation_element: string,
    cost_center: string,
    order: string,
    graph: string,
    operation: string,
    trayect: string,
    no_name: string,
    see_attach: string,
    download_attach: string,
    attach_saved: string,
    attach: string,
    label_edit: string,
    label_create: string,
    transport: string,
    mileage: string,
    origin_place: string,
    country: string,
    region: string,
    place: string,
    origin_terminal: string,
    date_begin_trayect: string,
    hour_begin: string,
    destination_place: string,
    destination_terminal: string,
    date_end_trayect: string,
    hour_end: string,
    hotel_assigned: string,
    column_cero: string,
    column_one: string,
    column_two: string,
    column_tree: string,
    btn_add_trayect: string,
    btn_add_changes: string,
    button_cancel: string,
    comments: string,
    save: string,
    loading: string,
    name_table_ts: string,
    type_alert_ts: string,
    message_alert_ts: string,
    message_alert_one_ts: string,
    type_alert_one_ts: string,
    message_alert_two_ts: string,
    message_alert_tree_ts: string,
    type_alert_two_ts: string,
    message_alert_nineteen_ts: string,
    type_alert_tree_ts: string,
    message_alert_four_ts: string,
    tittle_table_trayect: string,
    subtittle_table_trayect: string,
    field_one: string,
    field_two: string,
    field_tree: string,
    field_four: string,
    field_five: string,
    field_six: string,
    field_seven: string,
    field_eleven: string,
    field_twelve: string,
    field_thriteen: string,
    message_alert_five_ts: string,
    message_alert_six_ts: string,
    message_alert_seven_ts: string,
    message_alert_eight_ts: string,
    message_alert_nine_ts: string,
    message_alert_sten_ts: string,
    message_alert_eleven_ts: string,
    message_alert_twelve_ts: string,
    message_alert_thirteen_ts: string,
    message_alert_fourteen_ts: string,
    message_alert_fiveteen_ts: string,
    message_alert_seventeen_ts: string,
    message_alert_eighteen_ts: string,
}
interface Show_dist_spends_travels {
    tittle: string,
    back: string,
    code_spend: string,
    type_spend: string,
    import: string,
    date: string,
    column_cero: string,
    column_one: string,
    column_two: string,
    column_tree: string,
    column_four: string,
    column_five: string,
    column_six: string,
    negative_message: string,
}
interface View_travel {
    tittle: string,
    ticket_sap: string,
    message_synch: string,
    employee: string,
    type_travel: string,
    date_begin: string,
    date_end: string,
    reason_travel: string,
    type_legal: string,
    type_especific: string,
    type_activity: string,
    imputation_element: string,
    cost_center: string,
    order: string,
    graph: string,
    operation: string,
    trayect: string,
    no_name: string,
    see_attach: string,
    download_attach: string,
    message_advance: string,
    see_advance: string,
    see_spend: string,
    comments: string,
    btn_send: string,
    btn_close: string,
    maintenance_with: string,
    name_table_advance_ts: string,
    name_table_allowance_ts: string,
    maintenance: string,
    type_alert_ts: string,
    type_alert_one_ts: string,
    message_alert_ts: string,
    name_tittle: string,
}
interface Services {
    travel_management: Travel_management_Service,
}
interface Travel_management_Service {
    name_travel: string,
    name_advance: string,
    mane_allowance: string,
    name_approver: string,
}