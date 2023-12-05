import { Component } from '@angular/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  numeroTarjeta: string = '';
  fechaVencimiento: string = '';
  cvv: string = '';
  recordarTarjeta: boolean = false;
}
