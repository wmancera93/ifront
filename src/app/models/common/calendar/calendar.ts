export interface CalendarData {

    date: Date;
    id: number;
    is_now: boolean;
    weekday: string;
    work_schedule_plan: WorkSchedule;
}

export interface WorkSchedule {
    calendar_text: string;
    holiday_calendar: string;
    hour_begin: string;
    hour_finish: string;
    schedule_plan_for_periods: string;
    theorist_hours: number;
    type_schedule_plan_description: string;
    work_schedule_plan_text: string;
}
