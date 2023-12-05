import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms'; // Asegúrate de importar NgForm
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent {

  direccion = {id : 0, nombreCompleto: '', calleNumero: '', codigoPostal: 0, 
               telefono: 0, idcliente: 0}; // Modelo para los datos del formulario

  constructor(private http: HttpClient, private userService: UserService) {}
  

  submitForm(formulario: NgForm) {
    if (formulario.valid) {
      const idCliente = this.userService.getIdCliente(); // Obtén el ID del cliente del servicio

      // Asigna el ID del cliente a la dirección antes de enviarla al servidor
      this.direccion.idcliente = idCliente;
    this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Proveedor', this.direccion).subscribe(
      (response) => {
        console.log('Usuario agregado:', response);
        this.direccion = { id : 0, nombreCompleto: '', calleNumero: '', codigoPostal: 0, 
                            telefono: 0, idcliente: 0};
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

}
