import { Injectable } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';

@Injectable()
export class StylesExplorerService {
  public isIEOrEdge: boolean;
  constructor() { }

  stylesInExplorerOrEdge(img_header_login?: string, primary?: string, btn_primary?: string,
    btn_primary_hover?: string, color_alert?: string, img_header_menu?: string, width_page_wrapper?: string,
    width_nav_menu?: string, visible_menu?: string, left_show_menu?: string, left_hide_menu?: string,
    top_content_type?: string, margin_left_mobile?: string, ) {

    if (img_header_login !== '' && img_header_login !== null) {
      (<HTMLInputElement>document.getElementsByTagName('header')[0]).style.backgroundImage = 'url("' + img_header_login + '")';
    }

    if (primary !== '' && primary !== null) {
      if (document.getElementById('position_logged') !== null) {
        document.getElementById("position_logged").setAttribute('style', 'color:' + primary + ' !important; font-weight: 500; text-shadow: 1px 1px 2px #000000,0 0 5px ' + primary + ' !important;');
      }

      if (document.getElementById("birthdays") !== null) {
        (<HTMLInputElement>document.getElementById("birthdays").childNodes[3]).style.width = '330px';
      }
      if (document.getElementById("anniversaries") !== null) {
        (<HTMLInputElement>document.getElementById("anniversaries").childNodes[3]).style.width = '330px';
      }
      if (document.getElementById("new_employees") !== null) {
        (<HTMLInputElement>document.getElementById("new_employees").childNodes[3]).style.width = '330px';
      }
      if (document.getElementById("my_team") !== null) {
        (<HTMLInputElement>document.getElementById("my_team").childNodes[3]).style.width = '500px';
      }
      
      if (document.getElementsByClassName('bg-tabs').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('bg-tabs').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('bg-tabs')[index]).style.backgroundColor = primary + ' !important';
        }
      }

      if (document.getElementsByClassName('themes-newspaper').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('themes-newspaper').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('themes-newspaper')[index]).style.backgroundColor = primary + ' !important';
        }
      }

      if (document.getElementsByClassName('text-muted').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('text-muted').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('text-muted')[index]).style.color = primary + ' !important';
        }
      }

      if (document.getElementsByClassName('themes-news').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('themes-news').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('themes-news')[index]).style.backgroundColor = primary + ' !important';
        }
      }

      if (document.getElementsByClassName('titleColor').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('titleColor').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('titleColor')[index]).style.color = '#fff';
        }
      }

      if (document.getElementsByClassName('font-color-primary').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('font-color-primary').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('font-color-primary')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('btn-primary').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('btn-primary').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('btn-primary')[index]).style.backgroundColor = primary;
          (<HTMLInputElement>document.getElementsByClassName('btn-primary')[index]).style.borderColor = primary;
        }
      }

      if (document.getElementsByClassName('btn-outline-primary').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('btn-outline-primary').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('btn-outline-primary')[index]).style.color = primary;
          (<HTMLInputElement>document.getElementsByClassName('btn-outline-primary')[index]).style.borderColor = primary;
        }
      }

      if (document.getElementsByClassName('btn-close-modals').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('btn-close-modals').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('btn-close-modals')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('toast-success').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('toast-success').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('toast-success')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('modal-footerInfo').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('modal-footerInfo').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('modal-footerInfo')[index]).style.borderTop = '3px solid ' + primary;
        }
      }

      if (document.getElementsByClassName('roundMoreInfo').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('roundMoreInfo').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('roundMoreInfo')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('menu-img-myTeam').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('menu-img-myTeam').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('menu-img-myTeam')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('borderLine-myTeam').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('borderLine-myTeam').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('borderLine-myTeam')[index]).style.borderBottom = '3px solid ' + primary;
        }
      }

      if (document.getElementsByClassName('buttonBack').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('buttonBack').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('buttonBack')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('borderLine-title').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('borderLine-title').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('borderLine-title')[index]).style.borderBottomColor = primary + ' !important';
          (<HTMLInputElement>document.getElementsByClassName('borderLine-title')[index]).style.borderBottomWidth = '3px !important';
          (<HTMLInputElement>document.getElementsByClassName('borderLine-title')[index]).style.borderBottomStyle = 'solid !important';
        }
      }

      if (document.getElementsByClassName('menu-img-employee').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('menu-img-employee').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('menu-img-employee')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('fontlink-error').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('fontlink-error').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('fontlink-error')[index]).style.color = primary;
        }
      }

      if (document.getElementsByClassName('buttonError').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('buttonError').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('buttonError')[index]).style.color = primary;
        }
      }

      // if (document.getElementsByClassName('nav').length > 0) {
      //   if (document.getElementsByClassName('li').length > 0) {
      //     if (document.getElementsByClassName('active').length > 0) {
      //       for (let index = 0; index < document.getElementsByClassName('active').length; index++) {
      //         (<HTMLInputElement>document.getElementsByClassName('active')[index]).style.borderLeft = '4px solid ' + primary;
      //       }
      //     }
      //   }
      // }

      // if (document.getElementsByClassName('active').length > 0) {
      //   for (let index = 0; index < document.getElementsByClassName('active').length; index++) {
      //     (<HTMLInputElement>document.getElementsByClassName('active')[index]).style.backgroundColor = primary;
      //   }
      // }

      // if (document.getElementsByClassName('active-report').length > 0) {
      //   for (let index = 0; index < document.getElementsByClassName('active-report').length; index++) {
      //     (<HTMLInputElement>document.getElementsByClassName('active-report')[index]).style.backgroundColor = primary;
      //   }
      // }

      if (document.getElementsByClassName('border-footer').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('border-footer').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('border-footer')[index]).style.backgroundColor = '3px solid ' + primary;
        }
      }

      if (document.getElementsByClassName('font-color-date').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('font-color-date').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('font-color-date')[index]).style.color = primary;
        }
      }

      if (document.getElementsByClassName('buttonDocs').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('buttonDocs').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('buttonDocs')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('menu-img-user').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('menu-img-user').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('menu-img-user')[index]).style.backgroundColor = primary;
        }
      }

      if (document.getElementsByClassName('detectLetter').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('detectLetter').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('detectLetter')[index]).style.color = primary;
        }
      }
    }

    if (btn_primary !== '' && btn_primary !== null) {
      // if (document.getElementsByClassName('filters-reports-active').length > 0) {
      //   for (let index = 0; index < document.getElementsByClassName('filters-reports-active').length; index++) {
      //     (<HTMLInputElement>document.getElementsByClassName('filters-reports-active')[index]).style.backgroundColor = btn_primary;
      //   }
      // }
      if (document.getElementsByClassName('end-line').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('end-line').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('end-line')[index]).style.backgroundColor = btn_primary;
        }
      }

      if (document.getElementsByClassName('bg-button-search').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('bg-button-search').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('bg-button-search')[index]).style.backgroundColor = btn_primary;
        }
      }

      if (document.getElementsByClassName('buttonSubmitForm').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('buttonSubmitForm').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('buttonSubmitForm')[index]).style.backgroundColor = btn_primary;
        }
      }

      if (document.getElementsByClassName('iconColor-primary').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('iconColor-primary').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('iconColor-primary')[index]).style.color = btn_primary;
        }
      }

      if (document.getElementsByClassName('progress-bar').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('progress-bar').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('progress-bar')[index]).style.backgroundColor = btn_primary;
        }
      }

      if (document.getElementsByClassName('text-primary-hr').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('text-primary-hr').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('text-primary-hr')[index]).style.color = btn_primary;
        }
      }

      if (document.getElementsByClassName('buttonDocs').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('buttonDocs').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('buttonDocs')[index]).style.backgroundColor = btn_primary;
        }
      }

      if (document.getElementsByClassName('buttonError').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('buttonError').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('buttonError')[index]).style.backgroundColor = btn_primary;
        }
      }

      if (document.getElementsByClassName('buttonCloseEmployee').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('buttonCloseEmployee').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseEmployee')[index]).style.backgroundColor = btn_primary;
        }
      }
    }

    if (btn_primary_hover !== '' && btn_primary_hover !== null) {
      if (document.getElementsByClassName('btn-primary-second').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('btn-primary-second').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('btn-primary-second')[index]).style.backgroundColor = btn_primary_hover;
          (<HTMLInputElement>document.getElementsByClassName('btn-primary-second')[index]).style.borderColor = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('icon-collapse').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('icon-collapse').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('icon-collapse')[index]).style.backgroundColor = btn_primary_hover;
          (<HTMLInputElement>document.getElementsByClassName('icon-collapse')[index]).style.border = '2px solid ' + btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('tabDate').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('tabDate').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('tabDate')[index]).style.backgroundColor = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('tabReport').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('tabReport').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('tabReport')[index]).style.backgroundColor = btn_primary_hover;
        }
      }

      // if (document.getElementsByClassName('filters-reports-active').length > 0) {
      //   for (let index = 0; index < document.getElementsByClassName('filters-reports-active').length; index++) {
      //     (<HTMLInputElement>document.getElementsByClassName('filters-reports-active')[index]).style.color = btn_primary_hover;
      //   }
      // }

      if (document.getElementsByClassName('bginfo').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('bginfo').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('bginfo')[index]).style.background = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('letterColor-primary').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('letterColor-primary').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('letterColor-primary')[index]).style.color = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('text-primary-hover').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('text-primary-hover').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('text-primary-hover')[index]).style.color = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('body-title-newspaper').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('body-title-newspaper').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('body-title-newspaper')[index]).style.color = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('fa-newspaper').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('fa-newspaper').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('fa-newspaper')[index]).style.color = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('carousel-control-prev').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('carousel-control-prev').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('carousel-control-prev')[index]).style.color = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('carousel-control-next').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('carousel-control-next').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[index]).style.color = btn_primary_hover;
        }
      }

      if (document.getElementsByClassName('carousel-indicators li').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('carousel-indicators li').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('carousel-indicators li')[index]).style.backgroundColor = btn_primary_hover;
        }
      }


    }

    if (color_alert !== '' && color_alert !== null) {
      if (document.getElementsByClassName('modal-content').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('modal-content').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('modal-content')[index]).style.backgroundColor = color_alert;
        }
      }
    }

    if (img_header_menu !== '' && img_header_menu !== null) {
      if (document.getElementsByClassName('nav-header-menu').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('nav-header-menu').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('nav-header-menu')[index]).style.backgroundImage = 'url("' + img_header_menu + '")';
        }
      }
    }

    if (width_page_wrapper !== '' && width_page_wrapper !== null) {
      if (document.getElementById('page-wrapper') !== null) {
        (<HTMLInputElement>document.getElementById('page-wrapper')).style.margin = width_page_wrapper;
      }
    }

    if (width_nav_menu !== '' && width_nav_menu !== null) {
      if (document.getElementsByClassName('navbar-static-side').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('navbar-static-side').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('navbar-static-side')[index]).style.width = width_nav_menu;
        }
      }
    }

    if (visible_menu !== '' && visible_menu !== null) {
      if (document.getElementsByClassName('sidebar-collapse').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('sidebar-collapse').length; index++) {
          if (visible_menu !== 'block') {
            setTimeout(() => {
              (<HTMLInputElement>document.getElementsByClassName('sidebar-collapse')[index]).style.display = visible_menu;
            }, 400);
          } else {
            (<HTMLInputElement>document.getElementsByClassName('sidebar-collapse')[index]).style.display = visible_menu;
          }
        }
      }
    }

    if (left_show_menu !== '' && left_show_menu !== null) {
      if (document.getElementsByClassName('nav-show').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('nav-show').length; index++) {
          if (left_show_menu === '-1px') {
            setTimeout(() => {
              (<HTMLInputElement>document.getElementsByClassName('nav-show')[index]).style.marginLeft = left_show_menu;
            }, 400);
          } else {
            (<HTMLInputElement>document.getElementsByClassName('nav-show')[index]).style.marginLeft = left_show_menu;
          }

        }
      }
    }

    if (left_hide_menu !== '' && left_hide_menu !== null) {
      if (document.getElementsByClassName('nav-hide').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('nav-hide').length; index++) {
          if (left_hide_menu === '219px') {
            setTimeout(() => {
              (<HTMLInputElement>document.getElementsByClassName('nav-hide')[index]).style.marginLeft = left_hide_menu;
            }, 400);
          } else {
            (<HTMLInputElement>document.getElementsByClassName('nav-hide')[index]).style.marginLeft = left_hide_menu;
          }

        }
      }
    }

    if (top_content_type !== '' && top_content_type !== null) {
      if (document.getElementsByClassName('top-content-type').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('top-content-type').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('top-content-type')[index]).style.marginTop = top_content_type;
        }
      }
    }

    if (margin_left_mobile !== '' && margin_left_mobile !== null) {
      if (document.getElementsByClassName('navbar-static-side').length > 0) {
        for (let index = 0; index < document.getElementsByClassName('navbar-static-side').length; index++) {
          (<HTMLInputElement>document.getElementsByClassName('navbar-static-side')[index]).style.marginLeft = margin_left_mobile;
        }
      }
    }
  }

  validateBrowser() {
    this.isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    return this.isIEOrEdge;
  }

  addStylesCommon() {
    let dataEnterprise: Enterprise;
    if (this.validateBrowser()) {
      dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));
      this.stylesInExplorerOrEdge(
        '',
        dataEnterprise.primary_color,
        dataEnterprise.primary_color,
        dataEnterprise.body_text,
        '',
        dataEnterprise.background_header_menu.url
        , '0 0 0 220px', '220px', 'block', '-20px', '219px', '', ''
      )
    }
  }

}
