import { useEffect, useState } from "react";
import "../assets/styles/EditProductoModal.css";

// Endpoints combos
const API_MARCAS = "http://localhost:5079/Marca/GetAllMarca";
const API_GENEROS = "http://localhost:5079/Genero/GetAllGenero";
const API_CATEGORIAS = "http://localhost:5079/Categoria/GetAllCategoria";

// Cache en memoria
let cacheMarcas = null;
let cacheGeneros = null;
let cacheCategorias = null;

export default function FormEdit({ isOpen, onClose, initialData, onSave, isSaving }) {
  // Estados del form
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    marca_id: "",
    genero_id: "",
    categoria_id: "",
  });

  // Estados combos
  const [marcas, setMarcas] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loadingCombos, setLoadingCombos] = useState(false);

  // Helper parse JSON seguro
  const safeJson = async (resp) => {
    const text = await resp.text();
    try { return text ? JSON.parse(text) : {}; } catch { return {}; }
  };

  // Cargar datos del producto al abrir
  useEffect(() => {
    if (!initialData || !isOpen) return;

    setFormData({
      nombre: initialData.nombre ?? "",
      descripcion: initialData.descripcion ?? "",
      precio: Number(initialData.precio ?? 0),
      marca_id: String(initialData.marca_id ?? ""),
      genero_id: String(initialData.genero_id ?? ""),
      categoria_id: String(initialData.categoria_id ?? ""),
    });
  }, [initialData, isOpen]);

  // Cargar combos (con cache)
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

        const [rM, rG, rC] = await Promise.all([
          fetch(API_MARCAS),
          fetch(API_GENEROS),
          fetch(API_CATEGORIAS),
        ]);

        const jM = await safeJson(rM);
        const jG = await safeJson(rG);
        const jC = await safeJson(rC);

        cacheMarcas = Array.isArray(jM?.data) ? jM.data : [];
        cacheGeneros = Array.isArray(jG?.data) ? jG.data : [];
        cacheCategorias = Array.isArray(jC?.data) ? jC.data : [];

        setMarcas(cacheMarcas);
        setGeneros(cacheGeneros);
        setCategorias(cacheCategorias);
      } catch (e) {
        console.error(e);
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

  // Cambios inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };

  // Submit + validación + onSave
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      marca_id: Number(formData.marca_id),
      genero_id: Number(formData.genero_id),
      categoria_id: Number(formData.categoria_id),
    };

    if (!payload.marca_id) return alert("Seleccioná una marca válida");
    if (!payload.genero_id) return alert("Seleccioná un género válido");
    if (!payload.categoria_id) return alert("Seleccioná una categoría válida");

    onSave(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2 className="modal-title">Editar Producto</h2>

        <form onSubmit={handleSubmit}>
          {/* Inputs */}
          <div className="form-group">
            <label>Nombre</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} disabled={isSaving} />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} disabled={isSaving} />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input type="number" name="precio" value={formData.precio} onChange={handleChange} disabled={isSaving} />
          </div>

          {/* Selects */}
          <div className="form-group">
            <label>Categoría</label>
            <select name="categoria_id" value={formData.categoria_id} onChange={handleChange} disabled={isSaving || loadingCombos}>
              <option value="">{loadingCombos ? "Cargando..." : "Seleccioná"}</option>
              {categorias.map((c) => (
                <option key={c.categoria_id} value={String(c.categoria_id)}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Marca</label>
            <select name="marca_id" value={formData.marca_id} onChange={handleChange} disabled={isSaving || loadingCombos}>
              <option value="">{loadingCombos ? "Cargando..." : "Seleccioná"}</option>
              {marcas.map((m) => (
                <option key={m.marca_id} value={String(m.marca_id)}>{m.nombre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Género</label>
            <select name="genero_id" value={formData.genero_id} onChange={handleChange} disabled={isSaving || loadingCombos}>
              <option value="">{loadingCombos ? "Cargando..." : "Seleccioná"}</option>
              {generos.map((g) => (
                <option key={g.genero_id} value={String(g.genero_id)}>{g.nombre}</option>
              ))}
            </select>
          </div>

          {/* Acciones */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={isSaving}>
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
