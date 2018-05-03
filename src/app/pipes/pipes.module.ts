import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPipe } from './split/split.pipe';
import { SafeHtmlPipe } from './safeHTML/safe-html.pipe';

@NgModule({
  imports: [

  ],
  declarations: [
    SplitPipe,
    SafeHtmlPipe
  ],
  exports: [
    SplitPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }
