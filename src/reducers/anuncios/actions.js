export function listarAnuncios(anuncios, total) {
  return {
    type: "@anuncios/BUSCAR",
    anuncios,
    total
  };
}
