export const validateVin = (vin) => {
  if (!vin.trim()) return "VIN-код не може бути порожнім";
  const vinRegex = /^[A-HJ-NPR-Z0-9]{1,17}$/i;

  if (vin.length > 17) {
    return "VIN-код не може бути довшим за 17 символів";
  }

  if (!vinRegex.test(vin)) {
    return "VIN містить заборонені символи (I, O, Q або спецсимволи)";
  }

  return null; 
};