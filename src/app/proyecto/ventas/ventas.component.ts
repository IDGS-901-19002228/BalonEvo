import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  
  ventas: any[] = []; // Aquí almacenaremos la lista de clientes
  detalles: any[] = []; 
  constructor(private http: HttpClient, private userService: UserService,) {}

 
  ngOnInit():void{
    this.obtenerventas();
    console.log(this.ventas);
  }

  obtenerventas() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Venta').subscribe(
      (response: any) => {
        this.ventas = response;
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }
  detallesventas(id:number) {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Venta/'+id).subscribe(
      (response: any) => {
        this.detalles = response;
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  calcularTotal(): number {
    let total = 0;
    for (const detalle of this.detalles) {
      total += detalle.cantidad * detalle.precioUnitario;
    }
    return total;
  }
}