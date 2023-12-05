import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent {
   
  proveedores: any[] = [];
  materiaPrima = {id : 0, nombre: '', descripcion: '', cantidad: 0, unidad_medida: '', stock: 0}; 


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Proveedor').subscribe(
      (response: any) => {
        this.proveedores = response;
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }


  

  submitForm(formulario: NgForm) {
    if (formulario.valid) {
    this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/MateriaPrima', this.materiaPrima).subscribe(
      (response) => {
        console.log('Materia prima agregado:', response);
        this.materiaPrima = {id : 0, nombre: '', descripcion: '', cantidad: 0, unidad_medida: '', stock: 0};
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Materia prima registrada correctamente'
        });
      },
    );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes completar todos los campos'
      });
    }
  }

}
