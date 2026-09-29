// lib/pricing.ts

export const getCarpetCleaningPrice = (sqft: number) => {
  // Industry-average pricing example:
  // $0.25 per sq ft for basic carpet cleaning
  const RATE = 0.25;
  return sqft * RATE;
};

export const getTotalPrice = ({
  sqft,
  rooms,
  baths,
  addons,
  hasPets,
  homeType,
}: {
  sqft: number;
  rooms: number;
  baths: number;
  addons: Record<string, boolean>;
  hasPets: boolean;
  homeType: string;
}) => {
  let base = 200 + rooms * 20 + baths * 25;

  if (addons.interiorWindows) base += 40;

  // Carpet auto price
  if (addons.carpetCleaning) {
    base += getCarpetCleaningPrice(sqft);
  }

  if (hasPets) base += 25;
  if (homeType === "Standalone House") base += 35;

  return Math.round(base);
};
