import { Injectable } from '@angular/core';
import axios from 'axios';
import { Plugins } from '@capacitor/core';

var { HostsModifier } = Plugins; // Asegúrate de importar tu plugin
var MODIFY_HOSTS = 'modifyHosts';

@Injectable({
  providedIn: 'root'
})
export class DnsService {
  private repoUrl = '';
  private token = ''; // Reemplaza con tu token personal de GitHub

 
  
  constructor() { }

async setrepoUrl(sitio: string) {
   this.repoUrl = sitio;
   console.log("sitio: ", this.repoUrl);
//  return this.repoUrl;
}

async settoken(token: string) {
   this.token = token;
   console.log("token: ", this.token);
   //return this.repoUrl;
}

   
async setDnsDetails(ip: string, host: string, user: string): Promise<{ exists: boolean }> {
    try {
      const existingDetails = await this.getDnsDetails();

      // Verificar si ya existe una entrada con el mismo usuario
      const userExists = existingDetails.some((detail: { user: string; }) => detail.user === user);

      if (userExists) {
        return { exists: true }; // Retornar un objeto indicando que el usuario ya existe
      }

      // Si no existen, proceder a actualizar
      const response = await axios.get(this.repoUrl, {
        headers: {
          Authorization: `token ${this.token}`
        }
      });

      const content = atob(response.data.content);
      const jsonData = JSON.parse(content);
      
      // Asegurarse de que jsonData.dns sea un array
      if (!Array.isArray(jsonData.dns)) {
        jsonData.dns = []; // Inicializar como array si no lo es
      }

      // Agregar nueva entrada al objeto JSON
      jsonData.dns.push({ user, ip, host }); // Agregar nuevo objeto

      await axios.put(this.repoUrl, {
        message: 'Actualizar DNS',
        content: btoa(JSON.stringify(jsonData)), // Codificación a base64
        sha: response.data.sha,
      }, {
        headers: {
          Authorization: `token ${this.token}`
        }
      });

// Modificar el archivo hosts usando el plugin
     // Then use it like this:
     await HostsModifier[MODIFY_HOSTS]({ ip, host });

      return { exists: false }; // Retornar un objeto indicando que se guardó correctamente
    } catch (error) {
      console.error('Error al guardar los detalles DNS:', error);
      throw new Error('Failed to save DNS details');
    }
  }

  async getDnsDetails() {
    try {
      const response = await axios.get(this.repoUrl, {
        headers: {
          Authorization: `token ${this.token}`
        }
      });

      const content = atob(response.data.content);
      return JSON.parse(content).dns || []; // Retornar la lista de entradas DNS o un array vacío si no existe
    } catch (error) {
      console.error('Error al obtener los detalles DNS:', error);
    }
  }
}