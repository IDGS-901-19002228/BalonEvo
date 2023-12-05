import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from './proyecto/menu/menu.component';
import { AdministracionComponent } from './proyecto/administracion/administracion.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginModule } from './proyecto/login/login/login.module';
import { RouterModule } from '@angular/router';
import { RegistroModule } from './proyecto/registro/registro/registro.module';
import { AcercaDeModule } from './proyecto/acerca-de/acerca-de/acerca-de.module';
import { FooterComponent } from './proyecto/footer/footer.component';
import { MateriaPrimaComponent } from './proyecto/materia-prima/materia-prima.component';
import { UsuarioModule } from './proyecto/usuario/usuario/usuario.module';
import { AdministrarModule } from './proyecto/usuario/administrar/administrar/administrar.module';
import { PagoComponent } from './proyecto/carrito/pago/pago.component';
import { CarritoCompraComponent } from './proyecto/carrito/carrito-compra/carrito-compra.component';
import { VentasComponent } from './proyecto/ventas/ventas.component';
import { AgregarProductoComponent } from './proyecto/agregar-producto/agregar-producto.component';
import { ProveedorModule } from './proyecto/proveedores/proveedor/proveedor.module';
import { ProveedoresModule } from './proyecto/proveedores/list-proveedores/proveedores/proveedores.module';
import { CRUDusuarioComponent } from './proyecto/crudusuario/crudusuario.component';
import { ClientesComponent } from './proyecto/clientes/clientes.component';
import { PerfilComponent } from './proyecto/perfil/perfil.component';
import { ProductoModule } from './proyecto/agregar-producto/producto/producto.module';
import { ListProductosModule } from './proyecto/agregar-producto/list-producto/list-productos/list-productos.module';
import { ListMateriaPrimaComponent } from './proyecto/materia-prima/list-materia-prima/list-materia-prima.component';
import { MateriasModule } from './proyecto/materia-prima/list-materia-prima/materias/materias.module';
import { InsertMateriaModule } from './proyecto/materia-prima/insert-materia/insert-materia.module';
import { RecetasModule } from './proyecto/receta/recetas/recetas.module';
import { ComprasComponent } from './proyecto/compras/compras.component';
import { DashboardsModule } from './proyecto/dashboard/dashboards/dashboards.module';
import { ComprasModule } from './proyecto/compras/compras/compras.module';
import { MostrarCModule } from './proyecto/compras/mostrar-compras/mostrar-c/mostrar-c.module';
import { MostrarRctaModule } from './proyecto/receta/mostrar-recetas/mostrar-rcta/mostrar-rcta.module';
import { DireccionesModule } from './proyecto/direcciones/direcciones/direcciones.module';
import { CatalogoModule } from './proyecto/catalogo/catalogo/catalogo.module';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    AdministracionComponent,
    CarritoCompraComponent,
    PagoComponent,
    VentasComponent,
    HomeComponent,
    CRUDusuarioComponent,
    ClientesComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    LoginModule,
    RegistroModule,
    AcercaDeModule,
    UsuarioModule,
    AdministrarModule,
    ProveedorModule,
    ProveedoresModule,
    ProductoModule,
    ListProductosModule,
    InsertMateriaModule,
    MateriasModule,
    RecetasModule,
    MostrarRctaModule,
    DashboardsModule,
    ComprasModule,
    MostrarCModule,
    DireccionesModule,
    CatalogoModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
