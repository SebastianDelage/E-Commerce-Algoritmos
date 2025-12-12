// src/Componentes/FormEdit.jsx
import { useEffect, useState } from "react";
import "../assets/styles/EditProductoModal.css";

export default function FormEdit({
  isOpen,
  onClose,
  initialData,
  onSave,
  isSaving,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    marca_id: "",
    genero_id: "",
  });

  const [marcas, setMarcas] = useState([]);
  const [generos, setGeneros] = useState([]);
  

  // Rellenar form con datos del producto
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre ?? "",
        descripcion: initialData.descripcion ?? "",
        precio: initialData.precio ?? 0,
        marca_id: initialData.marca_id ?? "",
        genero_id: initialData.genero_id ?? "",
      });
    }
  }, [initialData]);

  // Cargar combos cuando se abre el modal
  useEffect(() => {
    if (!isOpen) return;

    const fetchOpciones = async () => {
      try {
        const [respMarcas, respGeneros] = await Promise.all([
          fetch("http://localhost:5079/Marca/GetMarcas"),
          fetch("http://localhost:5079/Genero/GetGeneros"),
        ]);

        const jsonMarcas = await respMarcas.json().catch(() => ({}));
        const jsonGeneros = await respGeneros.json().catch(() => ({}));

        console.log("RESP MARCAS:", jsonMarcas);
        console.log("RESP GENEROS:", jsonGeneros);

        const listaMarcas = jsonMarcas.data ?? jsonMarcas ?? [];
        const listaGeneros = jsonGeneros.data ?? jsonGeneros ?? [];

        setMarcas(Array.isArray(listaMarcas) ? listaMarcas : []);
        setGeneros(Array.isArray(listaGeneros) ? listaGeneros : []);
      } catch (err) {
        console.error("Error cargando marcas/géneros:", err);
      }
    };

    fetchOpciones();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "precio") {
      value = Number(value);
    }
    if (name === "marca_id" || name === "genero_id") {
      value = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

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
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
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
            />
          </div>

          {/* Marca por nombre */}
          <div className="form-group">
            <label>Marca</label>
            <select
              name="marca_id"
              value={formData.marca_id}
              onChange={handleChange}
            >
              <option value="">Seleccioná una marca</option>
              {marcas.map((m) => (
                <option key={m.marca_id} value={m.marca_id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Género por nombre */}
          <div className="form-group">
            <label>Género</label>
            <select
              name="genero_id"
              value={formData.genero_id}
              onChange={handleChange}
            >
              <option value="">Seleccioná un género</option>
              {generos.map((g) => (
                <option key={g.genero_id} value={g.genero_id}>
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
