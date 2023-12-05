import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private nombreUsuarioSubject = new BehaviorSubject<string>(''); // Tipo de usuario
  nombreUsuario$ = this.nombreUsuarioSubject.asObservable();

  private usuarioTipoSubject = new BehaviorSubject<string>(''); // Tipo de usuario
  usuarioTipo$ = this.usuarioTipoSubject.asObservable();

  private idClienteSubject = new BehaviorSubject<number>(0); // ID del cliente
  idCliente$ = this.idClienteSubject.asObservable();

  setUsuarioTipo(tipo: string) {
    this.usuarioTipoSubject.next(tipo);
  }

  setNombreUsuario(usuario: string) {
    this.nombreUsuarioSubject.next(usuario);
  }

  setIdCliente(id: number) {
    this.idClienteSubject.next(id);
  }

  
  getIdCliente(): number { // Agrega este método para obtener el ID del cliente
    return this.idClienteSubject.getValue();
  }
}
