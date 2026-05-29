import React, { useState } from 'react';
import { Search, Download, Plus, Edit2 } from 'lucide-react';
import { cn, formatCurrency, formatPercentage } from '../lib/utils';
import { MOCK_PRODUCTS, MOCK_PRODUCTION_COSTS, MOCK_RAW_MATERIALS } from '../lib/supabase';

export function Products() {
  const [activeProducts] = useState(MOCK_PRODUCTS);
  const [activeCosts] = useState(MOCK_PRODUCTION_COSTS);
  const [activeMaterials] = useState(MOCK_RAW_MATERIALS);

  return (
    <div className="flex h-full w-full">
      {/* Table Section */}
      <div className="flex-1 flex flex-col h-full border-r border-outline-variant bg-surface-container-lowest">
        {/* Toolbar */}
        <div className="p-container-padding flex flex-wrap gap-4 items-center justify-between border-b border-outline-variant bg-surface-bright shrink-0">
          <div className="flex gap-4 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                className="w-full pl-9 pr-3 py-1.5 text-[13px] border border-outline-variant rounded bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
              />
            </div>
            <select className="py-1.5 px-3 text-[13px] border border-outline-variant rounded bg-surface-container-lowest focus:border-primary outline-none">
              <option>Tous les types</option>
              <option>Profilés Standards</option>
              <option>Tôles</option>
              <option>Accessoires</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded text-on-background text-[11px] font-semibold bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
              <Download className="w-4 h-4" />
              Export Excel
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-on-primary rounded text-[11px] font-bold hover:bg-primary-container transition-colors">
              <Plus className="w-4 h-4" />
              Ajouter un Produit
            </button>
          </div>
        </div>

        {/* Spreadsheet Data Table */}
        <div className="flex-1 overflow-auto bg-surface-container-lowest relative">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-surface-container-low border-b-2 border-outline-variant shadow-sm text-[12px] font-semibold text-secondary">
              <tr>
                <th className="p-table-cell-padding border-r border-outline-variant w-12 text-center">#</th>
                <th className="p-table-cell-padding border-r border-outline-variant">Référence</th>
                <th className="p-table-cell-padding border-r border-outline-variant">Produit</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right">Largeur (mm)</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right">Épaisseur (mm)</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right">Poids (kg)</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right">Prix Matière</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right">Coût Prod.</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right bg-surface-variant text-on-surface">Prix Revient</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right">Prix Vente</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-right">Marge (%)</th>
                <th className="p-table-cell-padding border-r border-outline-variant text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-on-background">
              {activeProducts.map((p, index) => {
                const cost = activeCosts.find(c => c.product_id === p.id);
                return (
                  <tr key={p.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
                    <td className="p-table-cell-padding border-r border-outline-variant text-center text-outline">{index + 1}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant font-medium">{p.reference}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant">{p.name}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-right font-mono text-outline">{p.width || '-'}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-right font-mono text-outline">{p.thickness || '-'}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-right font-mono">{p.weight}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-right font-mono">{formatCurrency(cost?.material_cost || 0)}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-right font-mono">{formatCurrency((cost?.total_cost || 0) - (cost?.material_cost || 0))}</td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-right font-mono font-bold bg-surface-variant/50 border-l border-primary/20">
                      {formatCurrency(cost?.total_cost || 0)}
                    </td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-right relative hover:border-2 hover:border-primary hover:p-[6px] hover:-m-[1px] transition-all">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-mono">{formatCurrency(p.selling_price)}</span>
                        <Edit2 className="w-3 h-3 text-outline opacity-0 group-hover:opacity-100" />
                      </div>
                    </td>
                    <td className={cn(
                      "p-table-cell-padding border-r border-outline-variant text-right font-mono font-semibold",
                      (cost?.margin_percentage || 0) >= 30 ? "text-success" : (cost?.margin_percentage || 0) >= 15 ? "text-warning" : "text-error"
                    )}>
                      {formatPercentage(cost?.margin_percentage || 0)}
                    </td>
                    <td className="p-table-cell-padding border-r border-outline-variant text-center">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border",
                        p.status === 'ACTIF' ? "bg-success/10 text-success border-success/20" :
                        p.status === 'RUPTURE' ? "bg-error/10 text-error border-error/20" :
                        "bg-surface-variant text-secondary border-outline-variant"
                      )}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Right Drawer: Aperçu Rapide */}
      <div className="w-[300px] bg-surface-bright flex flex-col shrink-0">
        <div className="p-container-padding border-b border-outline-variant bg-surface-container-low">
          <h2 className="text-[18px] font-semibold text-on-surface">Aperçu Rapide</h2>
        </div>
        <div className="p-container-padding flex-1 overflow-y-auto">
          <div className="mb-6">
            <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">Produit Sélectionné</p>
            <h3 className="text-[18px] font-bold text-primary">{activeProducts[0].reference}</h3>
            <p className="text-[14px] text-on-background mt-1">{activeProducts[0].name}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="border border-outline-variant rounded p-3 bg-surface-container-lowest">
              <p className="text-[11px] font-semibold text-secondary mb-1">Prix de Revient Final</p>
              <p className="text-[36px] font-bold text-primary leading-tight tracking-tight">
                3.00 <span className="text-xl font-normal text-outline">€</span>
              </p>
            </div>
            <div className="border border-outline-variant rounded p-3 bg-surface-container-lowest">
              <p className="text-[11px] font-semibold text-secondary mb-1">Marge Actuelle</p>
              <p className="text-[36px] font-bold text-success leading-tight tracking-tight">
                33.3 <span className="text-xl font-normal">%</span>
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full py-2 border border-outline-variant rounded text-[11px] font-bold text-on-background hover:bg-surface-container-low transition-colors">
              Voir la fiche complète
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
