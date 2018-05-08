import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPipe } from './split/split.pipe';
import { SafeHtmlPipe } from './safeHTML/safe-html.pipe';
import { DecimalPipe } from './decimal/decimal.pipe';

@NgModule({
  imports: [

  ],
  declarations: [
    SplitPipe,
    SafeHtmlPipe,
    DecimalPipe
  ],
  exports: [
    SplitPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }
