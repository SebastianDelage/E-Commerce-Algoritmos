// src/utils/favoritos.js
const KEY = "favoritos";

export const getFavoritos = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const setFavoritos = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const getProductoId = (p) =>
  p?.producto_id ?? p?.id_producto ?? p?.id;

export const isFavorito = (producto) => {
  const favs = getFavoritos();
  const id = getProductoId(producto);
  return favs.some((x) => getProductoId(x) === id);
};

export const toggleFavorito = (producto) => {
  const favs = getFavoritos();
  const id = getProductoId(producto);

  const exists = favs.some((x) => getProductoId(x) === id);

  const newFavs = exists
    ? favs.filter((x) => getProductoId(x) !== id)
    : [...favs, producto];

  setFavoritos(newFavs);
  window.dispatchEvent(new Event("favoritesChanged"));
  return { newFavs, isNowFav: !exists };
};

export const removeFavoritoById = (id) => {
  const favs = getFavoritos();
  const newFavs = favs.filter((x) => getProductoId(x) !== id);
  setFavoritos(newFavs);
  window.dispatchEvent(new Event("favoritesChanged"));
  return newFavs;
};
