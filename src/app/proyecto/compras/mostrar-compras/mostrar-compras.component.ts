import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-compras',
  templateUrl: './mostrar-compras.component.html',
  styleUrls: ['./mostrar-compras.component.css']
})
export class MostrarComprasComponent {


  compras: any[] = []; // Aquí almacenaremos la lista de usuarios

  mostrarFormulario = false;
  compraSeleccionado: any = {}; // Declarar esta variable en tu componente


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerCompras();
  }

  alternarFormulario(compra: any) {
    this.compraSeleccionado = compra; // Asigna los valores del usuario
    this.mostrarFormulario = !this.mostrarFormulario;
  }


  obtenerCompras() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Compras/ver-compras').subscribe(
      (response: any) => {
        this.compras = response;
      },
      (error) => {
        console.error('Error al obtener compras:', error);
      }
    );
  }

  // eliminarProveedor(id: number) {
  //   this.http.delete(`https://localhost:5247/api/Proveedor/${id}`).subscribe(
  //     () => {
  //       this.obtenerCompras();
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Éxito',
  //         text: 'Usuario inhabilitado correctamente'
  //       });
  //     },
  //     (error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'No se pudo eliminar el usuario'
  //       });
  //     }
  //   );
  // }

}
