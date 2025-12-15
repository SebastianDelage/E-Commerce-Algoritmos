// src/Componentes/CreateProducto.jsx
import { useEffect, useState } from "react";

const API_CREATE_PRODUCTO = "http://localhost:5079/Producto/CreateProducto";
const API_MARCAS = "http://localhost:5079/Marca/GetAllMarca";
const API_CATEGORIAS = "http://localhost:5079/Categoria/GetAllCategoria";
const API_GENEROS = "http://localhost:5079/Genero/GetAllGenero";

export default function CreateProducto({ onCreated }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    marca_id: "",
    categoria_id: "",
    genero_id: "",
  });

  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [generos, setGeneros] = useState([]);

  const [loadingCombos, setLoadingCombos] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const safeJson = async (resp) => {
    const text = await resp.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      console.error("Respuesta no JSON:", text);
      return {};
    }
  };

  useEffect(() => {
    const loadCombos = async () => {
      try {
        setLoadingCombos(true);

        const [rMarcas, rCats, rGens] = await Promise.all([
          fetch(API_MARCAS),
          fetch(API_CATEGORIAS),
          fetch(API_GENEROS),
        ]);

        const jMarcas = await safeJson(rMarcas);
        const jCats = await safeJson(rCats);
        const jGens = await safeJson(rGens);

        if (!rMarcas.ok || !rCats.ok || !rGens.ok) {
          throw new Error("Error cargando combos");
        }

        setMarcas(Array.isArray(jMarcas?.data) ? jMarcas.data : []);
        setCategorias(Array.isArray(jCats?.data) ? jCats.data : []);
        setGeneros(Array.isArray(jGens?.data) ? jGens.data : []);
      } catch (e) {
        console.error(e);
        setMarcas([]);
        setCategorias([]);
        setGeneros([]);
      } finally {
        setLoadingCombos(false);
      }
    };

    loadCombos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg("");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // Validaciones básicas
    if (!form.nombre.trim()) return setMsg("El nombre es obligatorio.");
    if (!form.precio || Number(form.precio) <= 0) return setMsg("Precio inválido.");
    if (!form.marca_id) return setMsg("Seleccioná una marca.");
    if (!form.categoria_id) return setMsg("Seleccioná una categoría.");
    if (!form.genero_id) return setMsg("Seleccioná un género.");

    // Payload: ids a Number
    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      marca_id: Number(form.marca_id),
      categoria_id: Number(form.categoria_id),
      genero_id: Number(form.genero_id),
    };

    try {
      setSaving(true);

      const resp = await fetch(API_CREATE_PRODUCTO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await resp.text();
      let json = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        json = null;
      }

      if (!resp.ok || json?.success === false) {
        console.error("CREATE PRODUCTO FALLÓ:", resp.status, json ?? raw);
        setMsg("No se pudo crear el producto. Mirá consola.");
        return;
      }

      setMsg("Producto creado correctamente.");

      // Si el back devuelve el producto en data, usamos eso.
      // Si no, usamos payload (lo creado).
      const created = json?.data ?? payload;

      // Callback opcional para que el padre actualice la lista sin recargar
      onCreated?.(created);

      // Limpiar formulario
      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        marca_id: "",
        categoria_id: "",
        genero_id: "",
      });
    } catch (e) {
      console.error("Error creando producto:", e);
      setMsg("Error de conexión con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card p-3">
      <h4 className="mb-3">Crear producto</h4>

      {msg && <div className="alert alert-info py-2">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            disabled={saving}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            disabled={saving}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            step="0.01"
            min="0"
            disabled={saving}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            name="categoria_id"
            value={form.categoria_id}
            onChange={handleChange}
            disabled={saving || loadingCombos}
          >
            <option value="">
              {loadingCombos ? "Cargando..." : "Seleccioná una categoría"}
            </option>
            {categorias.map((c) => (
              <option key={c.categoria_id} value={String(c.categoria_id)}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="form-label">Marca</label>
          <select
            className="form-select"
            name="marca_id"
            value={form.marca_id}
            onChange={handleChange}
            disabled={saving || loadingCombos}
          >
            <option value="">
              {loadingCombos ? "Cargando..." : "Seleccioná una marca"}
            </option>
            {marcas.map((m) => (
              <option key={m.marca_id} value={String(m.marca_id)}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Género</label>
          <select
            className="form-select"
            name="genero_id"
            value={form.genero_id}
            onChange={handleChange}
            disabled={saving || loadingCombos}
          >
            <option value="">
              {loadingCombos ? "Cargando..." : "Seleccioná un género"}
            </option>
            {generos.map((g) => (
              <option key={g.genero_id} value={String(g.genero_id)}>
                {g.nombre}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary w-100" disabled={saving}>
          {saving ? "Creando..." : "Crear producto"}
        </button>
      </form>
    </div>
  );
}
