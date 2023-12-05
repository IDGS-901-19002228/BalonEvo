import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
// import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-mostrar-recetas',
  templateUrl: './mostrar-recetas.component.html',
  styleUrls: ['./mostrar-recetas.component.css']
})
export class MostrarRecetasComponent {

  // usuarioTipo: string = ''; // Tipo de cliente
  productos: any[] = [];
  recetas: any[] = []; // Aquí almacenaremos la lista de usuarios

  mostrarFormulario = false;
  recetaSeleccionado: any = {}; // Declarar esta variable en tu componente


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerRecetas();
    // this.userService.usuarioTipo$.subscribe(tipo => {
    //   this.usuarioTipo = tipo;
    // });
  }

  obtenerNombreProducto(productoId: number): string {
    const producto = this.productos.find(producto => producto.id === productoId);
    return producto ? producto.nombre : 'Producto no encontrado';
}

  alternarFormulario(compra: any) {
    this.recetaSeleccionado = compra; // Asigna los valores del usuario
    this.mostrarFormulario = !this.mostrarFormulario;
  }


  obtenerRecetas() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Receta/ver-recetas').subscribe(
      (response: any) => {
        this.recetas = response;
      },
      (error) => {
        console.error('Error al obtener compras:', error);
      }
    );
  }

}
