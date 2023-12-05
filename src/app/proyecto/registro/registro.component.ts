import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  cliente = { id: 0, nombre: '', usuario: '', correo: '', contrasenia: '', rol: 'Cliente', estatus: 'Activo' };

  constructor(private http: HttpClient, private router: Router) {}


  submitForm(formulario: NgForm) {
    if (formulario.valid) {
      this.http.get<any>(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Auth/verificar?usuario=${this.cliente.usuario}`)
        .subscribe(
          (estatusResponse: any) => {
            console.log(estatusResponse.resp);
            if (estatusResponse.resp === 'Si') {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre de usuario ya está ocupado, intenta con otro'
              });
            } else {
              Swal.fire({
                title: 'Confirmar Datos',
                text: '¿Estás seguro de que los datos ingresados son correctos?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, estoy seguro',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Cliente', this.cliente).subscribe(
                    (response) => {
                      console.log('Usuario agregado:', response);
                      this.cliente = {
                        id: 0,
                        nombre: '',
                        usuario: '',
                        correo: '',
                        contrasenia: '',
                        rol: 'Cliente',
                        estatus: 'Activo'
                      };
                      Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Registro exitoso'
                      });
                      this.router.navigate(['/LoginComponent']);
                    },
                  );
                }
              });
            }
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al verificar el usuario'
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

