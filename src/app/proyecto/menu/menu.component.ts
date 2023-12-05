import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  usuarioTipo: string = ''; // Tipo de usuario

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.usuarioTipo$.subscribe(tipo => {
      this.usuarioTipo = tipo;
    });
  }

  cerrarSesion() {
    // Aquí puedes implementar la lógica para cerrar sesión
    // Puede ser llamando a un método del servicio de autenticación
    // y luego reseteando el tipo de usuario
    Swal.fire({
      title: 'Confirmar Cierre de sesión',
      text: '¿Seguro que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.setUsuarioTipo('');
          this.router.navigate(['/LoginComponent']);
        }
      }
    )
  }

}
