// src/Componentes/FormEdit.jsx
import { useEffect, useState } from "react";
import "../assets/styles/EditProductoModal.css";

/* ====== ENDPOINTS ====== */
const API_MARCAS = "http://localhost:5079/Marca/GetAllMarca";
const API_GENEROS = "http://localhost:5079/Genero/GetAllGenero";
const API_CATEGORIAS = "http://localhost:5079/Categoria/GetAllCategoria";

/* ====== CACHE EN MEMORIA ====== */
let cacheMarcas = null;
let cacheGeneros = null;
let cacheCategorias = null;

export default function FormEdit({
  isOpen,
  onClose,
  initialData,
  onSave,
  isSaving,
}) {
  /* ====== STATE ====== */
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,

    // SELECTS SIEMPRE STRING
    marca_id: "",
    genero_id: "",
    categoria_id: "",
  });

  const [marcas, setMarcas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loadingCombos, setLoadingCombos] = useState(false);

  /* ====== HELPERS ====== */
  const safeJson = async (resp) => {
    const text = await resp.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      console.error("Respuesta no JSON:", text);
      return {};
    }
  };

  /* ====== CARGA DATOS DEL PRODUCTO ====== */
  useEffect(() => {
    if (!initialData || !isOpen) return;

    setFormData({
      nombre: initialData.nombre ?? "",
      descripcion: initialData.descripcion ?? "",
      precio: Number(initialData.precio ?? 0),

      // normalización
      marca_id: String(initialData.marca_id ?? ""),
      genero_id: String(initialData.genero_id ?? ""),
      categoria_id: String(initialData.categoria_id ?? ""),
    });
  }, [initialData, isOpen]);

  /* ====== CARGA COMBOS (CON CACHE) ====== */
  useEffect(() => {
    if (!isOpen) return;

    const fetchOpciones = async () => {
      try {
        setLoadingCombos(true);

        if (cacheMarcas && cacheGeneros && cacheCategorias) {
          setMarcas(cacheMarcas);
          setGeneros(cacheGeneros);
          setCategorias(cacheCategorias);
          return;
        }

        const [respMarcas, respGeneros, respCategorias] = await Promise.all([
          fetch(API_MARCAS),
          fetch(API_GENEROS),
          fetch(API_CATEGORIAS),
        ]);

        const jsonMarcas = await safeJson(respMarcas);
        const jsonGeneros = await safeJson(respGeneros);
        const jsonCategorias = await safeJson(respCategorias);

        if (!respMarcas.ok || !respGeneros.ok || !respCategorias.ok) {
          throw new Error("Error cargando combos");
        }

        cacheMarcas = Array.isArray(jsonMarcas?.data) ? jsonMarcas.data : [];
        cacheGeneros = Array.isArray(jsonGeneros?.data) ? jsonGeneros.data : [];
        cacheCategorias = Array.isArray(jsonCategorias?.data) ? jsonCategorias.data : [];

        setMarcas(cacheMarcas);
        setGeneros(cacheGeneros);
        setCategorias(cacheCategorias);
      } catch (err) {
        console.error("Error cargando combos:", err);
        setMarcas([]);
        setGeneros([]);
        setCategorias([]);
      } finally {
        setLoadingCombos(false);
      }
    };

    fetchOpciones();
  }, [isOpen]);

  if (!isOpen) return null;

  /* ====== HANDLERS ====== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // CONVERSIÓN FINAL A NUMBER (CLAVE)
    const payload = {
      ...formData,
      marca_id: Number(formData.marca_id),
      genero_id: Number(formData.genero_id),
      categoria_id: Number(formData.categoria_id),
    };

    if (!payload.marca_id) {
      alert("Seleccioná una marca válida");
      return;
    }
    if (!payload.genero_id) {
      alert("Seleccioná un género válido");
      return;
    }
    if (!payload.categoria_id) {
      alert("Seleccioná una categoría válida");
      return;
    }

    onSave(payload);
  };

  /* ====== RENDER ====== */
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2 className="modal-title">Editar Producto</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              disabled={isSaving}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              disabled={isSaving}
            />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              disabled={isSaving}
            />
          </div>

          {/* ====== CATEGORÍA (CLAVE) ====== */}
          <div className="form-group">
            <label>Categoría</label>
            <select
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              disabled={isSaving || loadingCombos}
            >
              <option value="">
                {loadingCombos ? "Cargando categorías..." : "Seleccioná una categoría"}
              </option>

              {categorias.map((c) => (
                <option key={c.categoria_id} value={String(c.categoria_id)}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* ====== MARCA ====== */}
          <div className="form-group">
            <label>Marca</label>
            <select
              name="marca_id"
              value={formData.marca_id}
              onChange={handleChange}
              disabled={isSaving || loadingCombos}
            >
              <option value="">
                {loadingCombos ? "Cargando marcas..." : "Seleccioná una marca"}
              </option>

              {marcas.map((m) => (
                <option key={m.marca_id} value={String(m.marca_id)}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* ====== GÉNERO ====== */}
          <div className="form-group">
            <label>Género</label>
            <select
              name="genero_id"
              value={formData.genero_id}
              onChange={handleChange}
              disabled={isSaving || loadingCombos}
            >
              <option value="">
                {loadingCombos ? "Cargando géneros..." : "Seleccioná un género"}
              </option>

              {generos.map((g) => (
                <option key={g.genero_id} value={String(g.genero_id)}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-save" disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
