// funciones.js

export default function generarNumeroAleatorioConUnidades(numero) {
    if (typeof numero !== 'number' || isNaN(numero)) {
      console.error('Por favor, proporciona un número válido como argumento.');
      return null;
    }
  
    const unidades = numero % 10; // Obtiene las unidades del número proporcionado
    const numeroAleatorio = Math.floor(Math.random() * 90000) + 10000; // Genera un número aleatorio de 5 cifras
  
    return numeroAleatorio + unidades;
  }
  