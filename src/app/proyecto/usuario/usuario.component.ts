import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import { UserService } from '../../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent {
  usuarioTipo: string = ''; // Tipo de usuario
  usuario = {id : 0, nombre: '', apellidoPaterno: '', apellidoMaterno: '', 
             edad: 0, sexo: '', telefono: '', direccion: '', usuario: '', 
             contrasenia: '', rol: '', estatus: 'Activo' }; // Modelo para los datos del formulario

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
    this.userService.usuarioTipo$.subscribe(tipo => {
      this.usuarioTipo = tipo;
    });
  }
  
  submitForm(formulario: NgForm) {
    if (formulario.valid) {
    this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Usuarios', this.usuario).subscribe(
      (response) => {
        console.log('Usuario agregado:', response);
        this.usuario = { id: 0, nombre: '', apellidoPaterno: '', apellidoMaterno: '', 
                         edad: 0, sexo: '', telefono: '', direccion: '', usuario: '', 
                         contrasenia: '', rol: '', estatus: 'Activo' };
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario registrado correctamente'
        });
      },
    );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes completar todos los campos'
      });
    }
  }

  verUsuarios(){
    this.router.navigate(['/CRUDusuarioComponent']);
  }
}