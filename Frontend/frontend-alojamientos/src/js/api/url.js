export function normalizeApiBaseUrl(value) {  
  if (typeof value !== 'string' || !value.trim()) {    
    throw new Error('VITE_API_URL es obligatoria.');  
  }  
  const cleaned = value.trim().replace(/\/+$/, '');  
  let url;  
  try {    
    url = new URL(cleaned);  
  } catch {    
    throw new Error('VITE_API_URL no es una URL valida.');  
  }  
  if (!['http:', 'https:'].includes(url.protocol)) {    
    throw new Error('VITE_API_URL debe usar HTTP o HTTPS.');  
  }  
  if (url.username || url.password || url.search || url.hash) {    
    throw new Error('VITE_API_URL no debe tener credenciales, query ni fragmento.');  
  }  
  if (url.pathname !== '/api/v1') {    
    throw new Error('VITE_API_URL debe terminar en /api/v1.');  
  }  
  return cleaned;
}