import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  changeMainImage = (imageSrc: string): void => {
    const mainImage = document.getElementById('main-image') as HTMLImageElement | null;
    if (mainImage) {
      mainImage.src = imageSrc;
    }
  };



  productos: any[] = [];
  mostrarFormulario = false;
  productoSeleccionado: any = {}; // Objeto para almacenar el producto seleccionado

  constructor(private http: HttpClient) {}

  ngOnInit() {
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

  // Método para seleccionar un producto
  seleccionarProducto(producto: any) {
    this.productoSeleccionado = { ...producto };
  }

  
  // Método para actualizar un producto
  actualizarProducto() {
    this.http.put(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Productos/${this.productoSeleccionado.id}`, this.productoSeleccionado)
      .subscribe(
        (response: any) => {
          this.obtenerProductos();
          this.mostrarFormulario = false;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Producto actualizado correctamente'
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el producto'
          });
        }
      );
  }

  // Método para eliminar un producto
  eliminarProducto() {
    this.http.delete(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Productos/${this.productoSeleccionado.id}`)
      .subscribe(
        (response: any) => {
          this.obtenerProductos();
          this.mostrarFormulario = false;
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Producto eliminado correctamente'
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

}
