import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  pedidos: any[] = [
    {idPedido: 0}
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.http.get('https://idgs901apibalones20231114015214.azurewebsites.net/api/Pedidos/mostrarPedidos').subscribe(
      (response: any) => {
        this.pedidos = response;
      },
      (error) => {
        console.error('Error al obtener compras:', error);
      }
    );
  }

  actualizarEnProcesoAEnCamino(idPedido: number) {
    this.http.put(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Pedidos/actualizarEnProcesoAEnCamino/${idPedido}`, {}).subscribe(
        (response: any) => {
            console.log(response);
            this.obtenerPedidos();
            Swal.fire({
              icon: 'success',
              title: 'Estatus Actualizado',
              text: 'Estatus modificado correctamente'
            });
        },
        (error) => {
            console.error('Error al actualizar el estatus:', error);
        }
    );
  }

  actualizarEnCaminoAEntregado(idPedido: number) {
      this.http.put(`https://idgs901apibalones20231114015214.azurewebsites.net/api/Pedidos/actualizarEnCaminoAEntregado/${idPedido}`, {}).subscribe(
          (response: any) => {
              console.log(response);
              this.obtenerPedidos();
              Swal.fire({
                icon: 'success',
                title: 'Estatus Actualizado',
                text: 'Estatus modificado correctamente'
              });
          },
          (error) => {
              console.error('Error al actualizar el estatus:', error);
          }
      );
  }


}
