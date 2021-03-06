// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A2tUiModule } from 'angular2-token';

// services
import { AlertsService } from './shared/common/alerts/alerts.service';
import { UserSharedService } from './shared/common/user/user-shared.service';
import { MainService } from './main/main.service';
import { GoogleAnalyticsEventsService } from './google-analytics-events.service';
import { EmployeeService } from './common/employee/employee.service';
import { EmployeeInfoService } from './shared/common/employee/employee-info.service';
import { DashboardEmployeeService } from './dashboard/employee/dashboard-employee.service';
import { MyTeamInfoService } from './my-team/my-team-info.service';
import { MyTeamReportService } from './shared/common/my-team/my-team-report.service';
import { HierarchicalChartService } from './hierarchical-chart/hierarchical-chart.service';
import { QueriesService } from './queries/queries.service';
import { PrintDataTableService } from './shared/common/print-data-table/print-data-table.service';
import { ExcelService } from './common/excel/excel.service';
import { ReportsHrService } from './reports-rh/reports-hr.service';
import { AutoServicesService } from './auto-services/auto-services.service';
import { MyPublicationsService } from './billboard/my-publications/my-publications.service';
import { RequestsRhService } from './requests-rh/requests-rh.service';
import { AproversRequestsService } from './shared/common/aprovers-requestes/aprovers-requests.service';
import { CorporateDocsService } from './corporate-documents/corporate-docs.service';
import { DownloadFilesService } from './download-files/download-files.service';
import { FormsRequestsService } from './shared/forms-requests/forms-requests.service';
import { FileUploadService } from './shared/common/file-upload/file-upload.service';
import { BillboardService } from './shared/common/billboard/billboard.service';
import { ApproverRequestsService } from './approver-requests/approver-requests.service';
import { EditArticleService } from './shared/common/edit-article/edit-article.service';
import { MasterDataService } from './master-data/master-data.service';
import { EventsEmployeeService } from './shared/common/events-employee/events-employee.service';
import { ManagerialDataService } from './shared/common/managerial-data/managerial-data.service';
import { DashboardManagerialService } from './dashboard/managerial/dashboard-managerial.service';
import { FormDataService } from './common/form-data/form-data.service';
import { ButtonReturnService } from './shared/common/managerial-data/button-return/button-return.service';
import { StylesExplorerService } from './common/styles-explorer/styles-explorer.service';
import { EvaluationsService } from './evaluations/evaluations.service';
import { EvaluationsSharedService } from './shared/common/evaluations/evaluations-shared.service';
import { DataMasterSharedService } from './shared/common/data-master/data-master-shared.service';
import { CalendarService } from './calendar/calendar.service';
import { CalendarDetailService } from './shared/common/calendar-detail/calendar-detail.service';
import { PerformanceEvaluationService } from './performance-evaluation/performance-evaluation.service';
import { DataDableSharedService } from './shared/common/data-table/data-dable-shared.service';
import { TravelService } from './travel-management/travels/travel.service';
import { HotelsService } from './travel-management/hotels/hotels.service';
import { HousingService } from './travel-management/housing/housing.service';
import { TravelsService } from './shared/travels/travels.service';
import { TooltipSharedService } from './shared/common/tooltip/tooltip-shared.service';
import { PerformanceEvalSharedService } from './shared/common/performance-evaluation/performance-eval-shared.service';
import { TrainingService } from './training/training.service';
import { TrainingSharedService } from './shared/common/training-events/training-shared.service';
import { HotelsSharedService } from './shared/hotels-shared/hotels-shared.service';
import { SpendSharedService } from './shared/spend-shared/spend-shared.service';
import { AdvanceSharedService } from './shared/advance-shared/advance-shared.service';
import { AdvancesService } from './travel-management/advances/advances.service';
import { SpendsService } from './travel-management/spends/spends.service';
import { ApproverTravelsService } from './travel-management/approver-travels/approver-travels.service';
import { TravelApproverService } from './shared/travel-approver/travel-approver.service';
import { ReportTravelsService } from './travel-management/report/report-travels.service';
import { FiltersGeneralsService } from './travel-management/filters-generals/filters-generals.service';
import { TranslateService } from './common/translate/translate.service';
import { TransportationLogisticsService } from './travel-management/transportation-logistics/transportation-logistics.service';
import { DemographicChartsService } from './common/demographic-charts/demographic-charts.service';
import { DemographicSharedService } from './shared/common/demographic/demographic-shared.service';
import { JoyrideAppService } from './joyride-app/joyride-app.service';
import { BackofficeService } from './backOffice/backoffice.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    AlertsService,
    UserSharedService,
    MainService,
    GoogleAnalyticsEventsService,
    EmployeeService,
    EmployeeInfoService,
    DashboardEmployeeService,
    DashboardManagerialService,
    MyTeamInfoService,
    MyTeamReportService,
    HierarchicalChartService,
    QueriesService,
    PrintDataTableService,
    ExcelService,
    ReportsHrService,
    AutoServicesService,
    JoyrideAppService,
    MyPublicationsService,
    RequestsRhService,
    AproversRequestsService,
    CorporateDocsService,
    DownloadFilesService,
    FormsRequestsService,
    FileUploadService,
    BillboardService,
    ApproverRequestsService,
    EditArticleService,
    MasterDataService,
    EventsEmployeeService,
    ManagerialDataService,
    FormDataService,
    ButtonReturnService,
    StylesExplorerService,
    EvaluationsService,
    EvaluationsSharedService,
    DataMasterSharedService,
    CalendarService,
    CalendarDetailService,
    PerformanceEvaluationService,
    DataDableSharedService,
    TravelService,
    HotelsService,
    HousingService,
    TravelsService,
    TooltipSharedService,
    PerformanceEvalSharedService,
    TrainingService,
    TrainingSharedService,
    HotelsSharedService,
    SpendSharedService,
    AdvanceSharedService,
    AdvancesService,
    SpendsService,
    ApproverTravelsService,
    TravelApproverService,
    ReportTravelsService,
    FiltersGeneralsService,
    TranslateService,
    TransportationLogisticsService,
    DemographicChartsService,
    DemographicSharedService,
    BackofficeService
  ],
})
export class ServicesModule {}
