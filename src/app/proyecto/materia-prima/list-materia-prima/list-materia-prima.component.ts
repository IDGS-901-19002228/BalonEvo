import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-materia-prima',
  templateUrl: './list-materia-prima.component.html',
  styleUrls: ['./list-materia-prima.component.css']
})
export class ListMateriaPrimaComponent {

  // proveedores: any[] = [];
  materiasP: any[] = []; // Aquí almacenaremos la lista de usuarios

  mostrarFormulario = false;
  materiaPSeleccionado: any = {}; // Declarar esta variable en tu componente


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerMateriaPrima();
  }

  alternarFormulario(materia: any) {
    this.materiaPSeleccionado = materia; // Asigna los valores del usuario
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // obtenerProveedores() {
  //   this.http.get('https://localhost:7054/api/Proveedor').subscribe(
  //     (response: any) => {
  //       this.proveedores = response;
  //     },
  //     (error) => {
  //       console.error('Error al obtener proveedores:', error);
  //     }
  //   );
  // }

  obtenerMateriaPrima() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/MateriaPrima').subscribe(
      (response: any) => {
        this.materiasP = response;
      },
      (error) => {
        console.error('Error al obtener el catalogo de materia prima:', error);
      }
    );
  }

  eliminarMateriaP(id: number) {
    this.http.delete(`https://idgs901apibalones20231114015214.azurewebsites.net/api/MateriaPrima/${id}`).subscribe(
      () => {
        this.obtenerMateriaPrima();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Materia prima eliminada correctamente'
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el usuario'
        });
      }
    );
  }

}
