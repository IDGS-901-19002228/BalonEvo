import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  productos: any[] = [];
  materiasP: any[] = [];
  receta = {id: 0, nombre: '', ingredientesMateriaP: '', idProducto: 0, cantidad: 0, cantidadProducto: 0, 
  estatus: '', 
  ingredientes: [] as { ingrediente: string, cantidad: string }[]
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerMateriaPrima();
  }

  agregarIngrediente() {
    this.receta.ingredientes.push({ ingrediente: '', cantidad: '' });
}

  // Remove ingredient and quantity by index
  eliminarIngrediente(index: number) {
    this.receta.ingredientes.splice(index, 1);
  }

  submitForm(formulario: NgForm) {
    if (formulario.valid) {
      // Concatenate ingredients and quantities
      this.receta.ingredientesMateriaP = this.receta.ingredientes.map(ingredient => `${ingredient.ingrediente} - ${ingredient.cantidad}`).join(', ');
    this.http.post('https://idgs901apibalones20231114015214.azurewebsites.net/api/Receta/agregarReceta', this.receta).subscribe(
      (response) => {
        console.log('compra agregado:', response);
        this.receta = {id: 0, nombre: '', ingredientesMateriaP: '', idProducto: 0, cantidad: 0, cantidadProducto: 0, estatus: '', ingredientes: []};  
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Receta registrada correctamente'
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


  obtenerProductos() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Productos').subscribe(
      (response: any) => {
        this.productos = response;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  obtenerMateriaPrima() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/MateriaPrima').subscribe(
      (response: any) => {
        this.materiasP = response;
      },
      (error) => {
        console.error('Error al obtener el catálogo de materia prima:', error);
      }
    );
  }
}
