export interface ApiTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;

  // Tradução em inglês (opcional)
  quote_en?: string | null;
  role_en?: string | null;
}
