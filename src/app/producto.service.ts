import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productoSeleccionadoSource = new BehaviorSubject<any>(null);
  productoSeleccionado$ = this.productoSeleccionadoSource.asObservable();

  setProductoSeleccionado(producto: any) {
    this.productoSeleccionadoSource.next(producto);
  }
}
