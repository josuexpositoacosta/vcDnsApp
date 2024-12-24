import { Component } from '@angular/core';
import { DnsService } from '../services/dns.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  ip: string = '';
  host: string = '';
  user: string = '';
  message: string = ''; // Mensaje para mostrar al usuario
  errorMessage: string = ''; // Mensaje de error para validaciones

  constructor(private dnsService: DnsService, private router: Router) {}
  sitio: string = '';
  token: string = '';

 
  

 /* async loadDnsDetails() {
    const details = await this.dnsService.getDnsDetails();
    if (details.length > 0) {
      this.ip = details[0].ip; // Asignar la IP del primer registro
      this.host = details[0].host; // Asignar el host del primer registro
      this.message = 'Datos cargados correctamente.';
    } else {
      this.message = 'No hay registros existentes.';
    }
  }*/

// Propiedad para controlar si el input de token está habilitado
  isTokenEnabled: boolean = false;

  // Método que se llama cuando se escribe en el input de sitio
  onSitioChange() {
    this.isTokenEnabled = this.sitio.trim() !== ''; // Habilitar si hay texto
  }

// Propiedad para controlar si el input de user está habilitado
  isUserEnabled: boolean = false;

  // Método que se llama cuando se escribe en el input de token
  onTokenChange() {
    this.isUserEnabled = this.token.trim() !== ''; // Habilitar si hay texto
    this.searchsitio();
  }


async searchsitio() {
  if(!this.sitio){
    this.errorMessage = 'Por favor, ingrese un sitio.';
    this.sitio = ''; 
    this.token = ''; 
    return;
  }
    this.errorMessage = '';

    this.dnsService.setrepoUrl(this.sitio);
    this.dnsService.settoken(this.token);

}
    
  async searchUser() {
    if (!this.user) {
      this.errorMessage = 'Por favor, ingrese un usuario.';
      this.ip = ''; // Limpiar IP
      this.host = ''; // Limpiar host
      return;
    }
    
    this.errorMessage = '';
    
    const details = await this.dnsService.getDnsDetails();
    const foundDetail = details.find((detail: { user: string; }) => detail.user === this.user);
    
    if ((this.user !='' || !this.user) && foundDetail) {
      this.ip = foundDetail.ip;
      this.host = foundDetail.host;
      this.openHost();
    } else {
      this.errorMessage = 'Usuario no encontrado.';
      this.ip = '';
      this.host = '';
    }
  }

   openHost() {
    if (this.host) {
      const url = `https://${this.host}`; // Cambia a https si es necesario
      window.open(url, '_self');
    } else {
      this.errorMessage = 'No hay un host disponible para abrir.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}