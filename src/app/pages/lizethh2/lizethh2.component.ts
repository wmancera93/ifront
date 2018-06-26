import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../../services/lizethII/exercise.service';
import { TablesPermisions } from '../../models/common/tables/tables';

@Component({
  selector: 'app-lizethh2',
  templateUrl: './lizethh2.component.html',
  styleUrls: ['./lizethh2.component.css']
})
export class Lizethh2Component implements OnInit {

 
  public encabezados : any []=[];
  public respuestas: TablesPermisions[] = [];
  public celdasTitulo: TablesPermisions[]=[];
  public llaves: any []=[];


  constructor( public regresar:Router,
    public exerciseService:ExerciseService) { }

  ngOnInit() {
  
  this.exerciseService.getObtenertodo()
      .subscribe((data: any) => {
        if (data.success) {
    
          this.respuestas = data.data;
          this.celdasTitulo = this.respuestas[0].labels[0];
          this.llaves = Object.keys(this.celdasTitulo);
          
          this.llaves.forEach((elemento) => {
            let columna = this.respuestas[0].labels[0][elemento];
            this.encabezados.push({ value: columna.value, type: columna.type, columna: elemento,  });
          }) 
          console.log(this.encabezados)
        }
     })
    }

  regresarInicio(){
      this.regresar.navigate(['ihr/index']);
    
  }
}
