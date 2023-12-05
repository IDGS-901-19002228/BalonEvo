import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import Swal from 'sweetalert2';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-crudusuario',
  templateUrl: './crudusuario.component.html',
  styleUrls: ['./crudusuario.component.css']
})
export class CRUDusuarioComponent {
  usuarioTipo: string = ''; // Tipo de usuario
  registrosPorPagina = 6;
  paginaActual = 1;

  get totalPaginas() {
    return Math.ceil(this.usuarios.length / this.registrosPorPagina);
  }

  busqueda: string = '';
  usuarios: any[] = []; // Aquí almacenaremos la lista de usuarios

  mostrarFormulario = false;
  usuarioSeleccionado: any = {}; // Declarar esta variable en tu componente


  constructor(private http: HttpClient, private userService: UserService,) {}

  ngOnInit():void {
    this.userService.usuarioTipo$.subscribe(tipo => {
      this.usuarioTipo = tipo;
    });
    this.obtenerUsuarios();
  }


  get usuariosPaginados() {
    const indiceInicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const indiceFin = indiceInicio + this.registrosPorPagina;
    return this.usuarios.slice(indiceInicio, indiceFin);
  }
  
  cambiarPagina(cambio: number) {
    this.paginaActual += cambio;
  }  

  alternarFormulario(usuario: any) {
    this.usuarioSeleccionado = usuario; // Asigna los valores del usuario
    this.mostrarFormulario = true;
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

  guardarCambios(formulario: NgForm) {
    if (formulario.valid) {
      // Envía la solicitud PUT a la API para actualizar los datos del usuario
      this.http.put('https://idgs901apibalones20231114015214.azurewebsites.net/api/Usuarios/' + this.usuarioSeleccionado.id, this.usuarioSeleccionado)
      .subscribe(
        (response: any) => {
          // Actualiza la lista de usuarios con los nuevos datos
          this.obtenerUsuarios();
          // Limpia el usuario seleccionado y oculta el formulario
          this.usuarioSeleccionado = {};
          this.mostrarFormulario = false;

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario modificado correctamente'
          });
        },
      );
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se guardaron los cambios'
      });
    }
  }

  cambiarEstatus(usuario: any){
    if (usuario.estatus == 'Activo') {
      // Cambia el estatus a 'Inactivo'
    usuario.estatus = 'Inactivo';
    this.http.put('https://idgs901apibalones20231114015214.azurewebsites.net/api/Usuarios/' + usuario.id, usuario)
      .subscribe(
        (response: any) => {
          // Actualiza la lista de usuarios con los nuevos datos
          this.obtenerUsuarios();
  
          // Limpia el usuario seleccionado y oculta el formulario
          this.usuarioSeleccionado = {};
          this.mostrarFormulario = false;
  
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario modificado correctamente'
          });
        },
      );  
    }
    else {
      Swal.fire({
        title: 'Confirmar Eliminación',
        text: '¿Estás seguro de que deseas eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete('https://idgs901apibalones20231114015214.azurewebsites.net/api/Usuarios/' + usuario.id)
            .subscribe(
              (response: any) => {
                // Actualiza la lista de usuarios con los nuevos datos
                this.obtenerUsuarios();
      
                // Limpia el usuario seleccionado y oculta el formulario
                this.usuarioSeleccionado = {};
                this.mostrarFormulario = false;
      
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Usuario eliminado correctamente'
                });
              },
            );
        }
      });
    }
  }

  activarUsuario(usuario: any){
    usuario.estatus = 'Activo';
    this.http.put('https://idgs901apibalones20231114015214.azurewebsites.net/api/Usuarios/' + usuario.id, usuario)
      .subscribe(
        (response: any) => {
          // Actualiza la lista de usuarios con los nuevos datos
          this.obtenerUsuarios();
  
          // Limpia el usuario seleccionado y oculta el formulario
          this.usuarioSeleccionado = {};
          this.mostrarFormulario = false;
  
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario Activado correctamente'
          });
        },
      );  
  }

  filtrarUsuariosPaginados(): any[] {
    const usuariosFiltrados = this.filtrarUsuarios();
    const totalPaginasFiltradas = Math.max(Math.ceil(usuariosFiltrados.length / this.registrosPorPagina), 1);
  
    if (this.paginaActual > totalPaginasFiltradas) {
      this.paginaActual = totalPaginasFiltradas;
    }
  
    const indiceInicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const indiceFin = indiceInicio + this.registrosPorPagina;
    return usuariosFiltrados.slice(indiceInicio, indiceFin);
  }    

  filtrarUsuarios(): any[] {
    if (this.busqueda.trim() === '') {
      return this.usuarios;
    }
  
    const terminoBusqueda = this.busqueda.toLowerCase();
  
    return this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(terminoBusqueda) ||
      usuario.apellidoPaterno.toLowerCase().includes(terminoBusqueda) ||
      usuario.apellidoMaterno.toLowerCase().includes(terminoBusqueda) ||
      usuario.edad.toString().includes(terminoBusqueda) ||
      usuario.sexo.toLowerCase().includes(terminoBusqueda) ||
      usuario.telefono.includes(terminoBusqueda) ||
      usuario.direccion.toLowerCase().includes(terminoBusqueda) ||
      usuario.usuario.toLowerCase().includes(terminoBusqueda) ||
      usuario.rol.toLowerCase().includes(terminoBusqueda) ||
      usuario.estatus.toLowerCase().includes(terminoBusqueda) 
    );
  }
  
  restablecerPagina() {
    this.paginaActual = 1;
  }
}
