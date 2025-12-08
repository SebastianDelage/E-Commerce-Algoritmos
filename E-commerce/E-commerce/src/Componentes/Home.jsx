import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../Componentes/ProductCard';

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProducts().then(setProductos);
  }, []);

  return (
    <div className="row">
      {productos.map(producto => (
        <div className="col-md-4 mb-4" key={producto.id}>
          <ProductCard producto={producto}  />
        </div>
      ))}
    </div>
  );
}
