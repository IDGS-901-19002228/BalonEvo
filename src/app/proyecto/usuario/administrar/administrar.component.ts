import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent {

  usuarios: any[] = []; // Aquí almacenaremos la lista de usuarios

  mostrarFormulario = false;
  usuarioSeleccionado: any = {}; // Declarar esta variable en tu componente


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  alternarFormulario(usuario: any) {
    this.usuarioSeleccionado = usuario; // Asigna los valores del usuario
    this.mostrarFormulario = !this.mostrarFormulario;
}


  obtenerUsuarios() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Usuarios').subscribe(
      (response: any) => {
        this.usuarios = response;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  eliminarUsuario(id: number) {
    this.http.delete(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Usuarios/${id}`).subscribe(
      () => {
        this.obtenerUsuarios();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario inhabilitado correctamente'
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
