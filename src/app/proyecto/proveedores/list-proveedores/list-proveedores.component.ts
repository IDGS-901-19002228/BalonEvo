import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-proveedores',
  templateUrl: './list-proveedores.component.html',
  styleUrls: ['./list-proveedores.component.css']
})
export class ListProveedoresComponent implements OnInit {

  proveedores: any[] = [];
  mostrarFormulario = false;
  proveedorSeleccionado: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProveedores();
  }

  alternarFormulario(proveedor: any) {
    // Clonar el proveedor seleccionado para evitar modificar la referencia original
    this.proveedorSeleccionado = { ...proveedor };
    this.mostrarFormulario = !this.mostrarFormulario;
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

  eliminarProveedor(id: number) {
    this.http.delete(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Proveedor/${id}`).subscribe(
      () => {
        this.obtenerProveedores();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Proveedor eliminado correctamente'
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el proveedor'
        });
      }
    );
  }

  guardarCambiosProveedor() {
    // Hacer la solicitud PUT para actualizar la información del proveedor
    this.http.put(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Proveedor/${this.proveedorSeleccionado.id}`, this.proveedorSeleccionado)
      .subscribe(
        () => {
          this.obtenerProveedores();
          this.mostrarFormulario = false;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Proveedor actualizado correctamente'
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la información del proveedor'
          });
        }
      );
  }

  cancelarEdicion() {
    // Limpiar el proveedor seleccionado y ocultar el formulario
    this.proveedorSeleccionado = {};
    this.mostrarFormulario = false;
  }
}
