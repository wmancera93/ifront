import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CKEditorModule } from 'ng2-ckeditor';
import { TagInputModule } from 'ngx-chips';
import { FileUploadModule } from 'ng2-file-upload';
import { PieChartModule, GaugeModule, BarChartModule } from '@swimlane/ngx-charts';

import { TravelManagementComponent } from './travel-management.component';
import { TravelComponent } from './travel/travel.component';
import { NewTravelComponent } from './travel/new-travel/new-travel.component';
import { HotelsComponent } from './hotels/hotels.component';
import { NewHotelComponent } from './hotels/new-hotel/new-hotel.component';
import { EditTravelComponent } from './travel/edit-travel/edit-travel.component';
import { ViewTravelComponent } from './travel/view-travel/view-travel.component';
import { AdvancesComponent } from './advances/advances.component';
import { SpendComponent } from './spend/spend.component';
import { NewSpendComponent } from './spend/new-spend/new-spend.component';
import { EditSpendComponent } from './spend/edit-spend/edit-spend.component';
import { NewAdvancesComponent } from './advances/new-advances/new-advances.component';
import { ViewAdvanceComponent } from './advances/view-advance/view-advance.component';
import { ViewSpendComponent } from './spend/view-spend/view-spend.component';
import { PendingTravelComponent } from './approver-travels/pending-travel/pending-travel.component';
import { ManagedTravelComponent } from './approver-travels/managed-travel/managed-travel.component';
import { DistSpendComponent } from './spend/dist-spend/dist-spend.component';
import { HotelsJourneyComponent } from './travel/hotels-journey/hotels-journey.component';
import { SpendHotelJourneyComponent } from './spend/spend-hotel-journey/spend-hotel-journey.component';
import { ShowDistSpendsTravelsComponent } from './travel/show-dist-spends-travels/show-dist-spends-travels.component';
import { MessageSynchComponent } from './travel/message-synch/message-synch.component';
import { MessageSynchAdvanceComponent } from './advances/message-synch-advance/message-synch-advance.component';
import { MessageSynchSpendComponent } from './spend/message-synch-spend/message-synch-spend.component';
import { TravelRequestsReportComponent } from './reports/travel-requests-report/travel-requests-report.component';
import { TravelAdvanceReportComponent } from './reports/travel-advance-report/travel-advance-report.component';
import { TravelAllowanceReportComponent } from './reports/travel-allowance-report/travel-allowance-report.component';
import { TravelApproverReportComponent } from './reports/travel-approver-report/travel-approver-report.component';
import { HousingComponent } from './housing/housing.component';
import { NewHousingComponent } from './housing/new-housing/new-housing.component';
import { HousingReportComponent } from './housing/housing-report/housing-report.component';
import { TransportationLogisticsComponent } from './transportation-logistics/transportation-logistics.component';
import { TrasnportationReportComponent } from './transportation-logistics/trasnportation-report/trasnportation-report.component';
import { NewTransportComponent } from './transportation-logistics/new-transport/new-transport.component';
import { JoyrideModule } from '../../utils/joyride/joyride.module';
import { ReportTravelsService } from '../../services/travel-management/report/report-travels.service';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    RouterModule.forChild([
      {
        path: 'index',
        component: TravelManagementComponent,
      },
      {
        path: 'travels',
        component: TravelComponent,
      },
      {
        path: 'travels/:idSpend/:idTravels',
        component: TravelComponent,
      },
      {
        path: 'hotels',
        component: HotelsComponent,
      },
      {
        path: 'advances/:id',
        component: AdvancesComponent,
      },
      {
        path: 'advances',
        component: AdvancesComponent,
      },
      {
        path: 'spend/:id',
        component: SpendComponent,
      },
      {
        path: 'spend/:idTravels/:idSpend/:travel',
        component: SpendComponent,
      },
      {
        path: 'spend',
        component: SpendComponent,
      },
      {
        path: 'management_travel',
        component: ManagedTravelComponent,
      },
      {
        path: 'pending_travel',
        component: PendingTravelComponent,
      },
      {
        path: 'travel_report',
        component: TravelRequestsReportComponent,
      },
      {
        path: 'advance_report',
        component: TravelAdvanceReportComponent,
      },
      {
        path: 'allowance_report',
        component: TravelAllowanceReportComponent,
      },
      {
        path: 'approver_report',
        component: TravelApproverReportComponent,
      },
      {
        path: 'housing',
        component: HousingComponent,
      },
      {
        path: 'logistics_transportations',
        component: TransportationLogisticsComponent,
      },
      {
        path: 'housing_reports',
        component: HousingReportComponent,
      },
      {
        path: 'fleet_reports',
        component: TrasnportationReportComponent,
      },
    ]),
    RouterModule,
    PipesModule,
    ComponentsModule,
  ],
  declarations: [
    TravelManagementComponent,
    TravelComponent,
    NewTravelComponent,
    HotelsComponent,
    NewHotelComponent,
    EditTravelComponent,
    ViewTravelComponent,
    AdvancesComponent,
    SpendComponent,
    NewSpendComponent,
    EditSpendComponent,
    NewAdvancesComponent,
    ViewAdvanceComponent,
    ViewSpendComponent,
    PendingTravelComponent,
    ManagedTravelComponent,
    DistSpendComponent,
    HotelsJourneyComponent,
    SpendHotelJourneyComponent,
    ShowDistSpendsTravelsComponent,
    MessageSynchComponent,
    MessageSynchAdvanceComponent,
    MessageSynchSpendComponent,
    TravelRequestsReportComponent,
    TravelAdvanceReportComponent,
    TravelAllowanceReportComponent,
    TravelApproverReportComponent,
    HousingComponent,
    NewHousingComponent,
    HousingReportComponent,
    TransportationLogisticsComponent,
    TrasnportationReportComponent,
    NewTransportComponent,
  ],
  providers: [ReportTravelsService],
})
export class TravelManagementModule {}
