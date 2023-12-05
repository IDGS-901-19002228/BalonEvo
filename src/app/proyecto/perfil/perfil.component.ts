import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  usuarioTipo: string = '';
  nombreUsuario: string = '';
  datosCliente: any = {};
  modoEdicion: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
    this.userService.usuarioTipo$.subscribe(tipo => {
      this.usuarioTipo = tipo;
    });

    this.userService.nombreUsuario$.subscribe(usuario => {
      this.nombreUsuario = usuario;
      this.obtenerDatos(); // Llama a la función para obtener los datos del cliente
    });
  }

  editarPerfil() {
    this.modoEdicion = true;
  }

  obtenerDatos() {
    this.http.get<any>(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente/${this.nombreUsuario}`)
      .subscribe(
        (response: any) => {
          this.datosCliente = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  validarCamposLlenos(): boolean {
    if (!this.datosCliente.nombre || !this.datosCliente.correo || !this.datosCliente.usuario || !this.datosCliente.contrasenia) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de guardar los cambios.'
      });
      return false; // Devuelve falso si algún campo está incompleto
    }
    return true; // Devuelve verdadero si todos los campos están llenos
  }


  guardarCambios() {
    if (this.validarCamposLlenos()) {
      this.http.put<any>('https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente/' + this.datosCliente.id, this.datosCliente)
      .subscribe(
        (response: any) => {
          console.log('Cambios guardados:', response);
          this.modoEdicion = false;
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Cambios registrados en tu perfil'
          });
        },
        (error) => {
          console.error('Error al guardar cambios:', error);
        }
      );
    }
  }
}
