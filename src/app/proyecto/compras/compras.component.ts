import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  proveedores: any[] = [];
  materiasP: any[] = [];
  compra = {id_compra_materia: 0, fecha: '', idProveedor: 0, id_materia_prima: 0, cantidad: 0, costo_compra: 0, estatus: ''};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProveedores();
    this.obtenerMateriaPrima();
  }

  submitForm(formulario: NgForm) {
    if (formulario.valid) {
    this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Compras/realizar-compra', this.compra).subscribe(
      (response) => {
        console.log('compra agregado:', response);
        this.compra = {id_compra_materia: 0, fecha: '', idProveedor: 0, id_materia_prima: 0, cantidad: 0, costo_compra: 0, estatus: ''};  
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Compra registrado correctamente'
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

  obtenerMateriaPrima() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/MateriaPrima').subscribe(
      (response: any) => {
        this.materiasP = response;
      },
      (error) => {
        console.error('Error al obtener el catálogo de materia prima:', error);
      }
    );
  }
}
