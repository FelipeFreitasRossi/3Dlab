import type { Product } from "../types/product";

// URL base da API. Defina VITE_API_URL no arquivo .env (veja .env.example).
// Se a variável não existir, o site usa só os dados locais (src/data/products.ts).
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(
  /\/$/,
  "",
);

export const hasApi = Boolean(API_URL);

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (!API_URL) throw new Error("VITE_API_URL não configurada");
  const response = await fetch(`${API_URL}${path}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`API respondeu ${response.status} em ${path}`);
  }
  return (await response.json()) as T;
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const data = await request<unknown>("/api/products", signal);
  if (!Array.isArray(data)) throw new Error("Formato inesperado em /api/products");
  return data as Product[];
}

export async function fetchProductById(
  id: string,
  signal?: AbortSignal,
): Promise<Product> {
  return request<Product>(`/api/products/${encodeURIComponent(id)}`, signal);
}
