import { createClient } from '@supabase/supabase-js';
import type { RawMaterial, Product, ProductionCost, Alert } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Lazy initialization if keys are provided
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// Mock Data for Preview/Graceful degradation when Supabase is not configured
export const MOCK_RAW_MATERIALS: RawMaterial[] = [
  { id: '1', name: 'Aluminium LME', supplier: 'London Metal Exchange', unit: 'kg', price: 3.55, currency: 'EUR', last_updated: new Date().toISOString(), created_at: new Date().toISOString() },
  { id: '2', name: 'Billettes 6060', supplier: 'Hydro Extrusion', unit: 'kg', price: 4.12, currency: 'EUR', last_updated: new Date().toISOString(), created_at: new Date().toISOString() },
  { id: '3', name: 'Plaques Alu 5754', supplier: 'Almet', unit: 'kg', price: 5.80, currency: 'EUR', last_updated: new Date().toISOString(), created_at: new Date().toISOString() },
  { id: '4', name: 'Acier Inox 304L', supplier: 'ThyssenKrupp', unit: 'kg', price: 4.95, currency: 'EUR', last_updated: new Date().toISOString(), created_at: new Date().toISOString() },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', reference: 'ALU-P-2020', name: 'Profilé Alu 20x20', type: 'Profilés Standards', width: 20, length: 6000, thickness: 2.0, weight: 0.45, selling_price: 4.50, status: 'ACTIF', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '2', reference: 'ALU-T-05MM', name: 'Tôle Alu 5mm', type: 'Tôles', width: 1000, length: 2000, thickness: 5.0, weight: 13.50, selling_price: 75.00, status: 'RUPTURE', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '3', reference: 'ACC-E-M8', name: 'Équerre de montage M8', type: 'Accessoires', width: null, length: null, thickness: 4.0, weight: 0.05, selling_price: 0.35, status: 'ACTIF', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export const MOCK_PRODUCTION_COSTS: ProductionCost[] = [
  { id: '1', product_id: '1', material_cost: 2.15, machine_cost: 0.15, energy_cost: 0.05, labor_cost: 0.55, packaging_cost: 0.10, total_cost: 3.00, margin: 1.50, margin_percentage: 33.3, updated_at: new Date().toISOString() },
  { id: '2', product_id: '2', material_cost: 54.0, machine_cost: 2.0, energy_cost: 1.5, labor_cost: 6.5, packaging_cost: 2.0, total_cost: 66.00, margin: 9.00, margin_percentage: 12.0, updated_at: new Date().toISOString() },
  { id: '3', product_id: '3', material_cost: 0.12, machine_cost: 0.01, energy_cost: 0.01, labor_cost: 0.02, packaging_cost: 0.01, total_cost: 0.17, margin: 0.18, margin_percentage: 51.4, updated_at: new Date().toISOString() },
];

export const MOCK_ALERTS: Alert[] = [
  { id: '1', product_id: '2', type: 'LOW_MARGIN', severity: 'warning', message: 'Tôle Alu 5mm marge < 15%. Coût matière en hausse.', resolved: false, created_at: new Date().toISOString() },
  { id: '2', product_id: null, type: 'COST_INCREASE', severity: 'critical', message: 'Prix Aluminium +5% aujourd\'hui. Impact estimé sur 45 références.', resolved: false, created_at: new Date().toISOString() },
  { id: '3', product_id: null, type: 'SYSTEM', severity: 'info', message: 'Nouveau paramètre de fret validé par Administrateur.', resolved: false, created_at: new Date().toISOString() },
];
