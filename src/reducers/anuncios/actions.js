export function listarAnuncios(anuncios, total, page) {
  return {
    type: "@anuncios/BUSCAR",
    anuncios,
    total,
    page
  };
}
