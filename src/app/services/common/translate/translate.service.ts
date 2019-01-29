import { Injectable } from '@angular/core';
import { Translate } from '../../../models/common/translate/translate';

@Injectable()
export class TranslateService {
  public translate: Translate = null;

  constructor() {
    if (this.translate === null) {
      debugger
      // this.translate = {
      //   app: {
      //     pages: {
      //       dashboard: {
      //         title: 'Inicio',
      //         title_switch: 'Dashboard gerencial',
      //         managerial: {

      //         },
      //         employee: {

      //         }
      //       },
      //       herarchical_chart: {
      //         title: 'Organigrama',
      //         higher: 'Superior',
      //         my_position: 'Mi posición',
      //         subordinate: 'Subordinados',
      //       }
      //     }
      //   }
      // }

      this.translate = {
        app: {
          pages: {
            dashboard: {
              title: 'Index',
              title_switch: 'Managerial dashboard',
              managerial: {

              },
              employee: {

              }
            },
            herarchical_chart: {
              title: 'Herarchical chart',
              higher: 'Higher',
              my_position: 'My position',
              subordinate: 'Subordinate',
            }
          }
        }
      }
    }
  }

  getTranslate() {
    return this.translate;
  }

  deleteTranslate() {
    this.translate = null;
    return this.translate;
  }


}
