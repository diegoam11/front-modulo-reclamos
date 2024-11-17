// funciones.js

export default function areaPorIdReclamo(id) {
    const categorias = {
      11: "Clientes",
      4: "Ventas",
      5: "Ventas",
      8: "Ventas",
      1: "Reclamos, solicitudes y quejas",
      2: "Reclamos, solicitudes y quejas",
      7: "Reclamos, solicitudes y quejas",
      10: "Reclamos, solicitudes y quejas",
      3: "Reparaciones",
      6: "Reparaciones",
      9: "Marketing",
    };
  
    const categoria = categorias[id];
    return categoria !== undefined ? categoria : "Categoría no encontrada";
  }  