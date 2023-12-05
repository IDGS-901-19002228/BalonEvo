import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/carrito.service';


@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {
  productosEnCarrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.obtenerProductosEnCarrito();
  }

  obtenerProductosEnCarrito() {
    this.carritoService.obtenerProductosEnCarrito$().subscribe(
      (productos) => {
        this.productosEnCarrito = productos;
      },
      (error) => {
        console.error('Error al obtener productos del carrito:', error);
      }
    );
  }

  eliminarProducto(index: number) {
    this.productosEnCarrito.splice(index, 1);
    this.carritoService.actualizarCarrito(this.productosEnCarrito);
  }
}
