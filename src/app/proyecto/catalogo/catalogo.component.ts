import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import { CarritoService } from 'src/app/carrito.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  
  productos: any[] = [];
  mostrarFormulario = false;
  productoSeleccionado: any = {}; // Objeto para almacenar el producto seleccionado

  constructor(private http: HttpClient, private carritoService: CarritoService, private userService: UserService) {}

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


  

agregarAlCarrito(producto: any) {
    const idCliente = this.userService.getIdCliente();
    const carritoItem = {
      idCliente: idCliente,
      idProducto: producto.id,
      cantidad: 1 // Puedes ajustar esto según tus necesidades
    };

    this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Carrito/agregar', carritoItem).subscribe(
      (response) => {
        console.log('Producto agregado al carrito:', response);
        // Agregar lógica adicional si es necesario, como mostrar una notificación de éxito

        // Agregar el producto al carrito local
        this.carritoService.agregarProductoAlCarrito(carritoItem);
      },
      (error) => {
        console.error('Error al agregar producto al carrito:', error);
        // Agregar lógica adicional para manejar el error, como mostrar una notificación de error
      }
    );
  }


}
