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

import { LoginComponent } from './login/login.component';
import { ResetAccountComponent } from './reset-account/reset-account.component';
import { LockedScreenComponent } from './locked-screen/locked-screen.component';
import { ConfirmResetAcountComponent } from './confirm-reset-acount/confirm-reset-acount.component';
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
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'reset_account',
        component: ResetAccountComponent,
      },
      {
        path: 'locked_screen',
        component: LockedScreenComponent,
      },
      {
        path: 'confirm_reset_account',
        component: ConfirmResetAcountComponent,
      },
    ]),
    RouterModule,
    PipesModule,
    ComponentsModule,
  ],
  declarations: [LoginComponent, ResetAccountComponent, LockedScreenComponent, ConfirmResetAcountComponent],
  providers: [ReportTravelsService],
})
export class AuthenticationModule {}
