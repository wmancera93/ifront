// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { TagInputModule } from 'ngx-chips';
import { FileUploadModule } from 'ng2-file-upload';
import { PieChartModule, GaugeModule, BarChartModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { ManagerialComponent } from './dashboard/managerial/managerial.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { MyTeamReportsComponent } from './my-team/my-team-reports/my-team-reports.component';
import { HierarchicalChartComponent } from './hierarchical-chart/hierarchical-chart.component';
import { RequestsComponent } from './reports-rh/requests/requests.component';
import { PermisionsUsersComponent } from './reports-rh/permisions-users/permisions-users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyPublicationsComponent } from './billboard/my-publications/my-publications.component';
import { NewsComponent } from './billboard/news/news.component';
import { PipesModule } from '../pipes/pipes.module';
import { RequestsRhComponent } from './requests-rh/requests-rh.component';
import { CorporateDocumentsComponent } from './corporate-documents/corporate-documents.component';
import { FormsRequestsComponent } from './requests-rh/forms-requests/forms-requests.component';
import { PendingsComponent } from './approver-requests/pendings/pendings.component';
import { ManagedComponent } from './approver-requests/managed/managed.component';
import { EditPublicationComponent } from './billboard/my-publications/edit-publication/edit-publication.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { HelpComponent } from './help/help.component';
import { NewArticleFormComponent } from './billboard/my-publications/new-article-form/new-article-form.component';
import { EvaluatedComponent } from './evaluations/evaluated/evaluated.component';
import { FillEvaluationComponent } from './evaluations/evaluated/fill-evaluation/fill-evaluation.component';
import { ShowEvaluationComponent } from './evaluations/evaluated/show-evaluation/show-evaluation.component';
import { RequestsApproversComponent } from './reports-rh/requests-approvers/requests-approvers.component';
import { TimeEvaluationComponent } from './queries/time-evaluation/time-evaluation.component';
import { EvaluationObjectivesComponent } from './performance-evaluation/evaluation-objectives/evaluation-objectives.component';
import { MyHourExtrasComponent } from './queries/my-hour-extras/my-hour-extras.component';
import { HourExtrasComponent } from './reports-rh/hour-extras/hour-extras.component';
import { EditEvaluationObjetivesComponent } from './performance-evaluation/evaluation-objectives/edit-evaluation-objetives/edit-evaluation-objetives.component';
import { PlanningEvaluationComponent } from './performance-evaluation/planning-evaluation/planning-evaluation.component';
import { EditPlanningDateComponent } from './performance-evaluation/planning-evaluation/edit-planning-date/edit-planning-date.component';
import { TrainingComponent } from './events-management/training/training.component';
import { ViewTrainingComponent } from './events-management/training/view-training/view-training.component';
import { ViewEvaluationObjetivesComponent } from './performance-evaluation/evaluation-objectives/view-evaluation-objetives/view-evaluation-objetives.component';
import { ReportTravelsService } from '../services/travel-management/report/report-travels.service';
import { ReportTrainingComponent } from './events-management/training/report-training/report-training.component';
import { RequestsApproversLogsComponent } from './reports-rh/requests-approvers-logs/requests-approvers-logs.component';
import { FormBenefistComponent } from './requests-rh-benfist/form-benefist/form-benefist.component';
import { FormTransportationComponent } from './requests-rh/form-transportation/form-transportation.component';
import { FormHousingComponent } from './requests-rh/form-housing/form-housing.component';
import { LensesAuxiliumComponent } from './requests-rh-benfist/lenses-auxilium/lenses-auxilium.component';
import { DemographicChartComponent } from './dashboard/managerial/demographic-chart/demographic-chart.component';
import { RequestsRhBenefistComponent } from './requests-rh-benfist/requests-rh-benefist.component';
import { JoyrideModule } from '../utils/joyride/joyride.module';
import { QueriesComponent } from './queries/queries/queries.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    FormsModule,
    NgxPaginationModule,
    PipesModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    CKEditorModule,
    TagInputModule,
    FileUploadModule,
    JoyrideModule.forChild(),
    PieChartModule,
    GaugeModule,
    BarChartModule,
  ],
  declarations: [
    DashboardComponent,
    ErrorPageComponent,
    EmployeesComponent,
    ManagerialComponent,
    MyTeamComponent,
    MyTeamReportsComponent,
    HierarchicalChartComponent,
    RequestsComponent,
    PermisionsUsersComponent,
    MyPublicationsComponent,
    NewsComponent,
    RequestsRhComponent,
    CorporateDocumentsComponent,
    FormsRequestsComponent,
    PendingsComponent,
    ManagedComponent,
    EditPublicationComponent,
    MasterDataComponent,
    HelpComponent,
    NewArticleFormComponent,
    EvaluatedComponent,
    FillEvaluationComponent,
    ShowEvaluationComponent,
    RequestsApproversComponent,
    TimeEvaluationComponent,
    EvaluationObjectivesComponent,
    MyHourExtrasComponent,
    HourExtrasComponent,
    EditEvaluationObjetivesComponent,
    PlanningEvaluationComponent,
    EditPlanningDateComponent,
    TrainingComponent,
    ViewTrainingComponent,
    ViewEvaluationObjetivesComponent,
    ReportTrainingComponent,
    RequestsApproversLogsComponent,
    FormBenefistComponent,
    FormTransportationComponent,
    FormHousingComponent,
    LensesAuxiliumComponent,
    DemographicChartComponent,
    RequestsRhBenefistComponent,
    QueriesComponent,
  ],
  providers: [ReportTravelsService],
})
export class PagesModule {}
