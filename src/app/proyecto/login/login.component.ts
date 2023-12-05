import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cliente = { usuario: '', contrasenia: '' };

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  submitForm(formulario: NgForm) {
    if (formulario.valid) {
      // Realizar la llamada a la API para obtener el estado del usuario
      this.http.get<any>(`https://idgs901apibalones20231114015214.azurewebsites.net/api/auth/usuario?usuario=${this.cliente.usuario}`)
        .subscribe(
          (estatusResponse: any) => {

            if (estatusResponse.estatus === 'Activo') {
              // Usuario activo, proceder con la lógica existente
              this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Auth/login', this.cliente).subscribe(
                (response: any) => {
                  console.log(response);

                  this.userService.setUsuarioTipo(response.rol); // Actualizar el tipo de usuario
                  this.userService.setNombreUsuario(this.cliente.usuario);

                  if (response.rol === 'Cliente') {
                    this.router.navigate(['/home']);
                  } else if (response.rol === 'Empleado') {
                    this.router.navigate(['/home']);
                  } else if (response.rol === 'Administrador') {
                    this.router.navigate(['/home']);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'El Usuario o Contraseña es incorrecta, por favor verifique sus datos e intente nuevamente'
                    });
                    console.log('Role no reconocido');
                  }
                },
                (error) => {
                  console.error(error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El Usuario o Contraseña es incorrecta, por favor verifique sus datos e intente nuevamente'
                  });
                }
              );
            } else {
              // Usuario inactivo, mostrar mensaje
              Swal.fire({
                icon: 'warning',
                title: 'Cuenta inactiva',
                text: 'Su cuenta está inactiva. Por favor, póngase en contacto con el administrador.'
              });
            }
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al obtener el estado del usuario'
            });
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes completar todos los campos'
      });
    }
  }
}
