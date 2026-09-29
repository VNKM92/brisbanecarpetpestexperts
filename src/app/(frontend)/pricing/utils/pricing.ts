export const calculateTotal = (data: any) => {
  let basePrice = 120;

  // Square footage
  basePrice += Math.floor(data.square / 200) * 25;

  // Rooms
  basePrice += data.rooms * 20;

  // Bathrooms
  basePrice += data.bathrooms * 35;

  // Add-ons
  const addOnPrices: Record<string, number> = {
    fridge: 20,
    oven: 25,
    windows: 30,
    carpet: 45,
    balcony: 40,
    laundry: 35,
    linen: 15,
    furniture: 20,
  };

  Object.keys(addOnPrices).forEach((key) => {
    if (data.addons[key]) basePrice += addOnPrices[key];
  });

  return basePrice;
};
