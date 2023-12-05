import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {

  numeroTarjeta: string = '';
  nombreTarjeta: string = '';

  constructor(private userService: UserService) {}

  agregarTarjeta() {
    const idCliente = this.userService.getIdCliente(); // Obtén el ID del cliente del servicio
    // Lógica para agregar la tarjeta utilizando el ID del cliente
    // Puedes llamar a una API, por ejemplo, para guardar la tarjeta en la base de datos
    // y asociarla al cliente con el ID obtenido.
  }

}
