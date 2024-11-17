// funciones.js

export default function areaPorIdSolicitud(id) {
    const categorias = {
      5: "Clientes",
      1: "Ventas",
      2: "Ventas",
      3: "Ventas",
      8: "Ventas",
      9: "Ventas",
      4: "Reparaciones",
      6: "Marketing",
      7: "Autoconsulta",
    };
  
    const categoria = categorias[id];
    return categoria !== undefined ? categoria : "Categoría no encontrada";
  }
  