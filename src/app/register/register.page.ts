import { Component } from '@angular/core';
import { DnsService } from '../services/dns.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  ip: string = '';
  host: string = '';
  user: string = '';
  message: string = ''; // Mensaje para mostrar al usuario
  errorMessage: string = ''; // Mensaje de error para validaciones

  constructor(private dnsService: DnsService, private router: Router) {}

  async saveDetails() {
    // Validar campos
    if (!this.user || !this.ip || !this.host) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return; // Detener la ejecución si hay campos vacíos
    }

    // Limpiar mensaje de error si todos los campos son válidos
    this.errorMessage = '';

    const result = await this.dnsService.setDnsDetails(this.ip, this.host, this.user);
    
    if ((result as { exists: boolean }).exists) {
      this.message = 'El usuario ya existe. No se realizarán cambios.';
    } else {
      this.message = 'Detalles guardados correctamente.';
      
       setTimeout(() => this.router.navigate(['/home']), 2000); // Navegar a home después de un tiempo
   }
}
}