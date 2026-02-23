
const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';
let variablesCache = null;

const fetcher = async (endpoint) => {
  const separator = endpoint.includes('?') ? '&' : '?';
  const response = await fetch(`${BASE_URL}${endpoint}${separator}format=json`);
  
  if (!response.ok) {
    throw new Error(`Помилка API: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const api = {
  decodeVin: (vin) => fetcher(`/vehicles/decodevin/${vin}`),  
  getVehicleVariables: async () => {
    if (variablesCache)
       return variablesCache; 
    
    const data = await fetcher(`/vehicles/getvehiclevariablelist`);
    variablesCache = data; 
    return data;
  },
};

// --- LOADERS ---

export const variablesLoader = async () => {
  const data = await api.getVehicleVariables();
  return data.Results || [];
};

export const variableDetailLoader = async ({ params }) => {
  const data = await api.getVehicleVariables();
  const found = data.Results.find(v => v.ID.toString() === params.variableId);
  
  if (!found) {
    throw new Response("Змінну не знайдено", { status: 404 });
  }  
  return found;
};
