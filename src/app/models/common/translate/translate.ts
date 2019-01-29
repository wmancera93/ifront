export interface Translate {
    app: App
}

interface App {
    pages: Pages,
}

interface Pages {
    dashboard: Dashboard,
    herarchical_chart: HerarchicalChart
}

interface Dashboard {
    title: string;
    title_switch: string;
    employee: Employee,
    managerial: Managerial
}

interface Employee {

}

interface Managerial {

}

interface HerarchicalChart {
    title: string;
    higher: string;
    my_position: string;
    subordinate: string;
}

