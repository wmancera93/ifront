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

import { LaborCertificatesComponent } from './labor-certificates/labor-certificates.component';
import { CertificateIncomeWithholdingComponent } from './certificate-income-withholding/certificate-income-withholding.component';
import { PayrollReceiptsComponent } from './payroll-receipts/payroll-receipts.component';
import { HolidayLetterComponent } from './holiday-letter/holiday-letter.component';
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
        path: 'holiday_letter',
        component: HolidayLetterComponent,
      },
      {
        path: 'work_certificate',
        component: LaborCertificatesComponent,
      },
      {
        path: 'payroll_receipts',
        component: PayrollReceiptsComponent,
      },
      {
        path: 'certificate_income_withholding',
        component: CertificateIncomeWithholdingComponent,
      },
    ]),
    RouterModule,
    PipesModule,
    ComponentsModule,
  ],
  declarations: [
    LaborCertificatesComponent,
    CertificateIncomeWithholdingComponent,
    PayrollReceiptsComponent,
    HolidayLetterComponent,
  ],
  providers: [ReportTravelsService],
})
export class AutoServicesModule {}
