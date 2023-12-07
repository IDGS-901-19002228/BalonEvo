import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import Swal from 'sweetalert2';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clienteTipo: string = ''; // Tipo de cliente
  registrosPorPagina = 6;
  paginaActual = 1;

  get totalPaginas() {
    return Math.ceil(this.clientes.length / this.registrosPorPagina);
  }

  busqueda: string = '';
  clientes: any[] = []; // Aquí almacenaremos la lista de clientes

  mostrarFormulario = false;
  clienteSeleccionado: any = {}; // Declarar esta variable en tu componente


  constructor(private http: HttpClient, private userService: UserService,) {}

  ngOnInit():void {
    this.userService.usuarioTipo$.subscribe(tipo => {
      this.clienteTipo = tipo;
    });
    this.obtenerUsuarios();
  }


  get clientesPaginados() {
    const indiceInicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const indiceFin = indiceInicio + this.registrosPorPagina;
    return this.clientes.slice(indiceInicio, indiceFin);
  }
  
  cambiarPagina(cambio: number) {
    this.paginaActual += cambio;
  }  

  alternarFormulario(cliente: any) {
    this.clienteSeleccionado = cliente; // Asigna los valores del cliente
    this.mostrarFormulario = true;
  }

  obtenerUsuarios() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente').subscribe(
      (response: any) => {
        this.clientes = response;
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  guardarCambios(formulario: NgForm) {
    if (formulario.valid) {
      // Envía la solicitud PUT a la API para actualizar los datos del cliente
      this.http.put('https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente/' + this.clienteSeleccionado.id, this.clienteSeleccionado)
      .subscribe(
        (response: any) => {
          // Actualiza la lista de clientes con los nuevos datos
          this.obtenerUsuarios();
          // Limpia el cliente seleccionado y oculta el formulario
          this.clienteSeleccionado = {};
          this.mostrarFormulario = false;

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Cliente modificado correctamente'
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

  cambiarEstatus(cliente: any){
    if (cliente.estatus == 'Activo') {
      // Cambia el estatus a 'Inactivo'
    cliente.estatus = 'Inactivo';
    this.http.put('https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente/' + cliente.id, cliente)
      .subscribe(
        (response: any) => {
          // Actualiza la lista de clientes con los nuevos datos
          this.obtenerUsuarios();
  
          // Limpia el cliente seleccionado y oculta el formulario
          this.clienteSeleccionado = {};
          this.mostrarFormulario = false;
  
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Cliente modificado correctamente'
          });
        },
      );  
    }
    else {
      Swal.fire({
        title: 'Confirmar Eliminación',
        text: '¿Estás seguro de que deseas eliminar este cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete('https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente/' + cliente.id)
            .subscribe(
              (response: any) => {
                // Actualiza la lista de clientes con los nuevos datos
                this.obtenerUsuarios();
      
                // Limpia el cliente seleccionado y oculta el formulario
                this.clienteSeleccionado = {};
                this.mostrarFormulario = false;
      
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Cliente eliminado correctamente'
                });
              },
            );
        }
      });
    }
  }

  activarUsuario(cliente: any){
    cliente.estatus = 'Activo';
    this.http.put('https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente/' + cliente.id, cliente)
      .subscribe(
        (response: any) => {
          // Actualiza la lista de clientes con los nuevos datos
          this.obtenerUsuarios();
  
          // Limpia el cliente seleccionado y oculta el formulario
          this.clienteSeleccionado = {};
          this.mostrarFormulario = false;
  
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Cliente Activado correctamente'
          });
        },
      );  
  }

  filtrarUsuariosPaginados(): any[] {
    const clientesFiltrados = this.filtrarUsuarios();
    const totalPaginasFiltradas = Math.max(Math.ceil(clientesFiltrados.length / this.registrosPorPagina), 1);
  
    if (this.paginaActual > totalPaginasFiltradas) {
      this.paginaActual = totalPaginasFiltradas;
    }
  
    const indiceInicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const indiceFin = indiceInicio + this.registrosPorPagina;
    return clientesFiltrados.slice(indiceInicio, indiceFin);
  }    

  filtrarUsuarios(): any[] {
    if (this.busqueda.trim() === '') {
      return this.clientes;
    }
  
    const terminoBusqueda = this.busqueda.toLowerCase();
  
    return this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(terminoBusqueda) ||
      cliente.usuario.toLowerCase().includes(terminoBusqueda) ||
      cliente.correo.toLowerCase().includes(terminoBusqueda) ||
      cliente.estatus.toLowerCase().includes(terminoBusqueda) 
    );
  }
  
  restablecerPagina() {
    this.paginaActual = 1;
  }
}
