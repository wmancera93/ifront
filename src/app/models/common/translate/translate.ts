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
    button_confirm: String,
    button_cancel: String,
    button_close: String,
}
interface Approvals_details {
    apply_for: String,
    status: String,
    since: String,
    until: String,
    requested_days: String,
    last_update: String,
    creation: String,
    approver: String,
    observations: String,
    attached: String,
    manage_request: String,
    see_details: String,
    accept: String,
    rejected: String,
    approved: String,
    description: String,
    save: String,
    loading: String,
    level_approver: String,
    lack_details: String,
    button_close: String,
}

interface Calendar_detail {
    details: String,
    activity_descrption: String,
    theoretical_hours: String,
    hour_begin: String,
    hour_end: String,
    calendar_text: String,
    description_work: String,
}

interface Calendar_modal {
    schedule: String,
}

interface Comment_article {
    themes: String,
    see_comments: String,
    hide_comments: String,
    views: String,
    comment: String,
    save: String,
    loading: String,
}

interface Data_table {
    records_show: String,
    without_reports: String,
    employee: String,
}
interface Draw_calendar {
    today: String,
}
interface Dynamic_form {
    save: String,
    loading: String,
}
interface Employee {
    employee_info: Employee_info,
}
interface Employee_info {
    working_information: String,
    email: String,
    phone: String,
    position: String,
    unit_org: String,
    area: String,
    boss: String,
    division: String,
    sub_division: String,
    date_admission: String,
    contract: String,
    personal_information: String,
    birth_date: String,
    identification: String,
    personal_phone: String,
    address: String,
    button_close: String,
}

interface Error_page_http {
    start: String,
}

interface File_upload {
    upload: String,
}
interface Gerencial_modal {
    without_reports: String,
    employee: String,
    button_close: String,
}
interface Show_events {
    button_close: String,
}
interface Time_line_approvers {
    request: String,
    date_begin: String,
    date_end: String,
    requested_days: String,
    attached: String,
    see_attached: String,
    observations: String,
    created: String,
    status: String,
    approver: String,
    pending: String,
    button_close: String,
}
interface Travels {
    approvals_details_travels: Approvals_details_travels,
}
interface Approvals_details_travels {
    show_dist_spends: Show_dist_spends,
    show_hotels_journey: Show_hotels_journey,
    pdf_travel: Pdf_travel,
    travel_requests: String,
    applicants: String,
    status: String,
    date_begin: String,
    date_end: String,
    upgrade: String,
    create: String,
    approvers: String,
    see_travels: String,
    see_attach: String,
    see_advance: String,
    see_spend: String,
    see_attach_spend: String,
    request_manage: String,
    see_details: String,
    accept: String,
    rejected: String,
    approved: String,
    description: String,
    save: String,
    loading: String,
    approver_level: String,
    for: String,
    negative_observation: String,
    negative_detail: String,
    button_close: String,
}
interface Show_dist_spends {
    distribution_cost: String,
    back: String,
    code_spending: String,
    type_expense: String,
    amount: String,
    date: String,
    imputation_element: String,
    cost_center: String,
    graph: String,
    operation: String,
    order: String,
    account_contable: String,
    distribution: String,
    negative_distribution: String,
}
interface Show_hotels_journey {
    change_travel: String,
    back: String,
    hotel_assigned: String,
    hotel: String,
    date_begin: String,
    date_end: String,
    negative_hoteL: String,
}
interface Pdf_travel {
    pdf: String,
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
    negative_message: String
}
interface Estadistics {
    hour_night_festive: String,
    hour_diurnal: String,
    hour_night_continue: String,
    hour_ordinary: String,
    hour_diurnal_festive: String,
    hour_night_ordinary: String,
    hour_night: String,
    hour_field: String,
    hour_night_field: String,
    hour_continue_festive: String,
    hour_planned: String,
    tittle_ts: String,
}
interface Events_employees {
    negative_message: String,
}
interface Newspaper {
    news: String,
    theme: String,
    negative_news: String,
}
interface Notification_primary {
    negative_message: String,
}
interface Notification_secundary {
    negative_message: String,
}
interface Progress_primary {
    negative_message: String,
}
interface Layout {
    contacts_list: Contacts_list,
    header: Header,
    menu_navigation: Menu_navigation,
}
interface Contacts_list {
    partner: String,
    negative_message: String,
}
interface Header {
    partner: String,
    out_door: String,
}
interface Menu_navigation {
    start: String,
    org_chart: String,
    my_data: String,
    self_service: String,
    certificate_work: String,
    receipts: String,
    certificate_ing_ret: String,
    letter_vacations: String,
    queries: String,
    ing_ret: String,
    pay_deduc: String,
    historical_cesa: String,
    distress: String,
    payday: String,
    enjoyed_vacation: String,
    compensated_vacation: String,
    balance_vacation: String,
    pass: String,
    inability: String,
    extra_hour: String,
    anniversary: String,
    historical_posts: String,
    iva_movements: String,
    time_evaluations: String,
    hour_extra: String,
    reports_rh: String,
    request_report: String,
    user_permits: String,
    approver_Request: String,
    billboards: String,
    news: String,
    own_puplication: String,
    requests: String,
    approvers: String,
    pending: String,
    managed: String,
    queries_approver: String,
    banners: String,
    evaluations: String,
    performance_evaluation: String,
    query_evaluation: String,
    query_objetive: String,
    manage_travel: String,
    manage_training: String,
    agreements_training: String,
    report_training: String,
    docs_org: String,
    help: String,
}

interface Pages {
    approver_request: Approver_request,
    authentication: Authentication,
    auto_services: Auto_services,
    billboard: Billboard,
    corporate_documents: Corporate_documents,
    dashboard: Dashboard,
    error_page: Error_page,
    evaluation: Evaluation,
    events_management: Events_management,
    help: Help,
    hierarchical_chart: Hierarchical_chart,
    master_data: Master_data,
    my_team: My_team,
    perfromance_evaluation: Perfromance_evaluation,
    queries: Queries,
    reports_rh: Reports_rh,
    requests_rh: Requests_rh,
    travel_management: Travel_management,
}
interface Approver_request {
    managed: Managed,
    ndings: Pedings,
}
interface Managed {
    title_ppprovals_managed: String,
    message_approvals: String,
    text_ticket: String,
    text_created_on: String,
    text_Applicant: String,
    text_status: String,
    icon_watch: String,
}
interface Pedings {
    title_ppprovals_pending: String,
    icon_return: String,
    msg_pending_request_one: String,
    msg_pending_request_two: String,
    msg_pending_requests_one: String,
    msg_pending_requests_two: String,
    msg_no_pending_requests_one: String,
    msg_no_pending_requests_two: String,
    text_ticket: String,
    text_Applicant: String,
    text_created_on: String,
    icon_watch: String,
    msg_sf_transaction_ts: String,
    msg_cf_transaction_ts: String,
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
    title_warning_ts_one: string,
    ts_warning_text_two: string,
    title_warning_ts_two: string,
    title_warning_ts_tree: string,
    msg_characters_minimum_ts: string,
    title_warning_ts_four: string,
    msg_not_match_ts: string,
    title_warning_ts_five: string,
    msg_not_match_ts_one: string,
    title_warning_ts_six: string,
    msg_enter_again_ts: string,
    title_warning_ts_seven: string,
    msg_enter_again_ts_one: string,
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
    title_warning_ts_two: string,
    msg_characters_minimum_ts: string,
    title_warning_ts_tree: string,
    msg_email_is_required_ts: string,
    title_warning_ts_four: string,
    msg_tincorrect_format_ts: string,
    title_warning_ts_five: string,
    msg_enter_your_data_ts: string,
}
interface Reset_account {
    title_welcome: string,
    text_restore_password: string,
    text_mail_reset_password: string,
    text_restore: string,
    text_login: string,
    title_warning_ts: string,
    title_warning_ts_one: string,
    title_warning_ts_two: string,
    msg_email_is_required_ts: string,
    title_warning_ts_tree: string,
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
    title_letter_vacation: String,
    text_vacation_letter_not_found: String,
    text_vacation: String,
    text_for_the_employee: String,
}
interface Labor_certificates {
    title_work_letter: String,
    text_letter_not_found: String,
    text_work_letter: String,
    text_for_the_employee: String,
    text_code_work_letter: String,
    msg_verification_code_one: String,
    msg_verification_code_two: String,
    msg_verification_code_three: String,
    btn_accept: String,
    btn_cancel: String,
}
interface Payroll_receipts {
    tittle: String,
    message_one: String,
    message_two: String,
    message_tree: String,
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
    title_confirmation_ts: string,
    msg_confirmation_ts: string,
    title_confirmation_ts_one: string,
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
    btn_guardar: string,
    text_loading: string,
    btn_cerrar: string,
    title_status_news_ts: string,
    msg_edited_news_ts: string,
    title_status_news_ts_one: string,
}
interface New_article_form {
    title_form_news: string,
    text_title: string,
    text_summary: string,
    text_topic: string,
    text_upload_image: string,
    btn_guardar: string,
    text_loading: string,
    btn_cerrar: string,
    msg_denied_request_ts_one: string,
    msg_empty_fields_ts: string,
    text_status_news_ts: string,
    msg_saved_news_ts: string,
    msg_denied_request_ts: string,
}
interface Corporate_documents {
    title_corporate_documents: string,
}
interface Dashboard {
    text_management_dashboard: string,
    msg_welcome_ts: string,
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
interface Evaluation {
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
    ts_warning1_text_2: string,
    msg_deniedrequest_ts: string,
    msg_continue_ts: string,
}
interface Show_evaluation {
    text_total_questions: string,
    text_totalcorrect_questions: string,
    text_totalcorrect_questions_one: string,
    text_not_apply: string,
    text_incorrect: string,
    btn_close: string,

}
interface Events_management {
    training: Training,
}
interface Training {
    text_trainings: String,
    report_training: Report_training,
    view_training: View_training,
}
interface Report_training {
    title_report_training: String,
    text_Query_filters: String,
    text_employee_code: String,
    text_training_code: String,
    text_training_status: String,
    text_select: String,
    text_accepted: String,
    text_pending: String,
    text_start_date: String,
    text_end_date: String,
    text_query: String,
    text_no_records_found: String,
    text_training_agreements_ts: String,
}
interface View_training {
    title_training_agreements: String,
    text_x: String,
    text_start: String,
    text_end: String,
    text_duration_days: String,
    text_days: String,
    text_duration_hours: String,
    text_hours_day: String,
    text_view_pdf: String,
    text_observations: String,
    btn_accept: String,
    btn_decline: String,
    title_confirmation_ts: String,
    text_status_training: String,
    title_warning_ts: String,
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
    text_one: string,
    text_two: string,
    text_tree: string,
    ts_warning_text_one: string,
    msg_denied_request_ts: string,
    ts_warning_text_two: string,
    ts_warning_text_tow: string,
    ts_warning_text_tree: string,
    ts_warning_text_four: string,
    ts_warning_text_five: string,
    ts_warning_text_six: string,
    ts_warning_text_seven: string,
    ts_warning_text_eight: string,
    ts_warning_text_nine: string,
    ts_warning_text_teen: string,
}
interface My_team {
    title_my_team: String,
    btn_back: String
    my_team_reports: my_team_reports,
}
interface my_team_reports {
    text_information_employee: String,
    btn_back: String,
}
interface Perfromance_evaluation {
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
    tittle: String,
    sub_tittle: String,
    type_evaluation: String,
    time_evaluation: String,
    start: String,
    ended: String,
    evaluator: String,
    evaluation_objetives: String,
    number_objetives: String,
    percentage_full: String,
    percentage_missing: String,
    btn_edit: String,
    btn_new: String,
    create: String,
    date_begin: String,
    date_end: String,
    porridge: String,
    description: String,
    button_cancel: String,
    save: String,
    loading: String,
    finish: String,
    name_table_ts: String,
    type_alert_ts: String,
    type_alert_one_ts: String,
    message_alert_ts: String,
}
interface View_evaluation_objetives {
    tittle: String,
    sub_tittle: String,
    type_evaluation: String,
    time_evaluation: String,
    start: String,
    ended: String,
    evaluator: String,
    evaluation_objetives: String,
    number_objetives: String,
    percentage_full: String,
    percentage_missing: String,
    name_table_ts: String,
}
interface Planning_evaluation {
    tittle
    name_table_ts
    edit_planning_date: Edit_planning_date,
}
interface Edit_planning_date {
    tittle: String,
    sub_tittle: String,
    date_begin: String,
    date_end: String,
    button_cancel: String,
    save: String,
    loading: String,
    type_alert_ts: String,
    type_alert_one_ts: String,
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
    name_table_ts: String,
}
interface Compnsated_vacations {
    name_table_ts: String,
}
interface Disabilities {
    name_table_ts: String,
}
interface Embargoes {
    name_table_ts: String,
}
interface Extra_hours {
    name_table_ts: String,
}
interface Historical_posts {
    name_table_ts: String,
}
interface Income_withholdings {
    name_table_ts: String,
}
interface Iva_employee {
    name_table_ts: String,
}
interface Loans {
    name_table_ts: String,
}
interface My_hour_extras {
    name_table_ts: String,
}
interface Payments_deductions {
    name_table_ts: String,
}
interface Permissions {
    name_table_ts: String,
}
interface Severances {
    name_table_ts: String,
}
interface Time_evaluation {
    tittle: String,
    back: String,
    query_filters: String,
    date_begin: String,
    date_end: String,
    btn_query: String,
    name_table_ts: String,
    message_alert_ts: String,
}
interface Vacation_balance {
    back: String,
    name_table_ts: String,
}
interface Vacation_enjoyed {
    name_table_ts: String,
}
interface Reports_rh {
    hour_extras: Hour_extras,
    permisions_users: Permisions_user,
    requests: Request,
    requests_approvers: Requests_approver,
}
interface Hour_extras {
    name_table_ts: String,
    back: String,
}
interface Permisions_user {
    tittle: String,
    back: String,
    query_filters: String,
    permtits_with: String,
    create: String,
    see_chart: String,
    permtits: String,
    manage_report: String,
    managed: String,
    not: String,
    generate_ts: String,
    page: String,
}
interface Request {
    tittle: String,
    back: String,
    query_filters: String,
    all: String,
    in_proces: String,
    cancel: String,
    pending: String,
    approver: String,
    yes: String,
    not: String,
    generate_ts: String,
    page: String,
}
interface Requests_approver {
    name_table_ts: String,
    back: String,
    query_filters: String,
    approver_with: String,
    approver: String,
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
    type_alert_tree_ts: string,
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
    tittle: String,
    titlle_wiget_travel_ts: String,
    message_wiget_travel_ts: String,
    titlle_wiget_advance_ts: String,
    message_wiget_advance_ts: String,
    titlle_wiget_allowance_ts: String,
    message_wiget_allowance_ts: String,
    titlle_wiget_approver_ts: String,
    message_wiget_approver_ts: String,
    titlle_wiget_pendinga_ts: String,
    message_wiget_pendinga_ts: String,
    titlle_wiget_report_ts: String,
    message_wiget_report_ts: String,
    titlle_wiget_hotel_ts: String,
    message_wiget_hotel_ts: String,
}
interface Advances {
    message_synch_advance: Message_synch_advance,
    new_advance: New_advance,
    view_advance: View_advance,
    tittle: String,
    back: String,
    btn_new: String,
    query_filters: String,
    btn_hr: String,
    btn_sap: String,
    date_begin: String,
    date_end: String,
    status: String,
    all_status: String,
    resgistered: String,
    process: String,
    approved: String,
    cancelled: String,
    hold_on: String,
    employee: String,
    select_my: String,
    select_third: String,
    travel_sap: String,
    error_synch: String,
    travel_ihr: String,
    date_in: String,
    date_out: String,
    status_label: String,
    approver: String,
    message_approver: String,
    see: String,
}
interface Message_synch_advance {
    message_head: String,
    message_body: String,
    name_data_table_ts: String,
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
    filter_tree: string,
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
    filter_tree: string,
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
    tittle: String,
    back: String,
    btn_new: String,
    query_filters: String,
    btn_hr: String,
    btn_sap: String,
    date_begin: String,
    date_end: String,
    status: String,
    all_status: String,
    resgistered: String,
    process: String,
    approved: String,
    cancelled: String,
    hold_on: String,
    employee: String,
    status_settle: String,
    to_settle: String,
    settlement: String,
    canceled: String,
    select_my: String,
    select_third: String,
    travel_sap: String,
    error_synch: String,
    travel_ihr: String,
    date_in: String,
    date_out: String,
    status_label: String,
    approver: String,
    message_approver: String,
    see: String,
    edit: String,
    erase: String,
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
    bnt_add: string,
    save: string,
    loading: string,
    bnt_edit: string,
    tittle_ts: string,
    type_alert_ts: string,
    type_alert_one_ts: string,
    type_alert_two_ts: string,
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