import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosEnCarrito$ = new BehaviorSubject<any[]>([]);

  agregarProductoAlCarrito(item: any) {
    const carritoActual = this.productosEnCarrito$.getValue();
    const nuevoCarrito = [...carritoActual, item];
    this.productosEnCarrito$.next(nuevoCarrito);
  }

  obtenerProductosEnCarrito$() {
    return this.productosEnCarrito$.asObservable();
  }

  actualizarCarrito(nuevoCarrito: any[]) {
    this.productosEnCarrito$.next(nuevoCarrito);
  }
}
