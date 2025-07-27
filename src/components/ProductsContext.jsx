import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  async function refreshProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, refreshProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

export async function addProduct(product, refresh) {
  const { data, error } = await supabase.from('products').insert([product]).select();
  if (refresh) await refresh();
  return { data, error };
}

export async function updateProduct(id, updatedProduct, refresh) {
  const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id).select();
  if (refresh) await refresh();
  return { data, error };
}

export async function deleteProduct(id, refresh) {
  const { data, error } = await supabase.from('products').delete().eq('id', id);
  if (refresh) await refresh();
  return { data, error };
}