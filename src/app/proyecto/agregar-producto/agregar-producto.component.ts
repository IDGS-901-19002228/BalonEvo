import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {
  usuarioTipo: string = ''; // Tipo de cliente
  producto = {id: 0, nombre: '', imagen: '', descripcion: '', precio: 0, stock: 0, estatus: ''};

  constructor(private http: HttpClient, private userService: UserService,) {}

  ngOnInit(): void {
    this.userService.usuarioTipo$.subscribe(tipo => {
      this.usuarioTipo = tipo;
    });
  }

  submitForm(formulario: NgForm) {
    if (formulario.valid) {
      this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Productos', this.producto).subscribe(
        (response) => {
          console.log('Producto agregado:', response);
          this.producto = {id: 0, nombre: '', imagen: '', descripcion: '', precio: 0, stock: 0, estatus: ''};
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Producto registrado correctamente'
          });
        },
        (error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al agregar el producto'
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
