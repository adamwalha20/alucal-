export type RawMaterial = {
  id: string;
  name: string;
  supplier: string;
  unit: 'kg' | 'm' | 'unité' | 'L' | 'm2';
  price: number;
  currency: string;
  last_updated: string;
  created_at: string;
};

export type Product = {
  id: string;
  reference: string;
  name: string;
  type: string;
  width: number | null;
  length: number | null;
  thickness: number | null;
  weight: number;
  selling_price: number;
  status: 'ACTIF' | 'RUPTURE' | 'OBSOLÈTE';
  created_at: string;
  updated_at: string;
};

export type ProductionCost = {
  id: string;
  product_id: string;
  material_cost: number;
  machine_cost: number;
  energy_cost: number;
  labor_cost: number;
  packaging_cost: number;
  total_cost: number;
  margin: number;
  margin_percentage: number;
  updated_at: string;
};

export type ProductMaterial = {
  id: string;
  product_id: string;
  material_id: string;
  quantity: number;
  cost: number;
};

export type Alert = {
  id: string;
  product_id: string | null;
  type: 'COST_INCREASE' | 'LOW_MARGIN' | 'MISSING_PRICE' | 'SYSTEM';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  resolved: boolean;
  created_at: string;
};
