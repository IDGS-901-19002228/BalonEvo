import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {

  usuarioTipo: string = ''; // Tipo de usuario
  productos: any[] = [];
  mostrarFormulario = false;
  productoSeleccionado: any = {};

  constructor(private http: HttpClient, private userService: UserService,) {}

  ngOnInit() {
    this.userService.usuarioTipo$.subscribe(tipo => {
      this.usuarioTipo = tipo;
    });
    this.obtenerProductos();
  }

  alternarFormulario(producto: any) {
    this.productoSeleccionado = { ...producto };
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  obtenerProductos() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Productos').subscribe(
      (response: any) => {
        this.productos = response;
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  eliminarProducto(id: number) {
    this.http.delete(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Productos/${id}`).subscribe(
      () => {
        this.obtenerProductos();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto inhabilitado correctamente'
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el producto'
        });
      }
    );
  }

  actualizarProducto(formulario: NgForm) {
    if (formulario.valid) {
      const id = this.productoSeleccionado.id;
      this.http.put(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Productos/${id}`, this.productoSeleccionado).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Producto actualizado correctamente'
          });
        },
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el producto'
      });
    }
  }

  

  
  // fabricarProducto(idProducto: number) {
  //   this.http.post(`https://localhost:5247/api/Fabricar/${idProducto}`, {}).subscribe(
  //     (response) => {
  //       console.log('Producto fabricado exitosamente', response);
        
  //       Swal.fire({
  //           icon: 'success',
  //           title: 'Éxito',
  //           text: 'Producto fabricado exitosamente'
  //         });
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'Ha ocurrido un error al fabricar el producto'
  //         });
  //       }
  //     );
  // }

  
  fabricarProducto(idProducto: number) {
    this.http.post(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Fabricar/${idProducto}`, {}).subscribe(
      (response: any) => {
        console.log('Respuesta:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message // Accede al mensaje de la respuesta
        });
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al fabricar el producto'
        });
      }
    );
  }
  
  


  verReceta(idProducto: number) {
    // Implementa la lógica para mostrar la receta del producto
    // Esto podría ser un modal, una página dedicada, etc.
  }
}
