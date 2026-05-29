import React from 'react';
import { History, Upload, AlertTriangle, TrendingUp, TrendingDown, Edit2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { MOCK_RAW_MATERIALS } from '../lib/supabase';
import { formatCurrency, formatPercentage } from '../lib/utils';

const chartData = [
  { name: '01', value: 3.40 },
  { name: '05', value: 3.42 },
  { name: '10', value: 3.45 },
  { name: '15', value: 3.50 },
  { name: '20', value: 3.48 },
  { name: '25', value: 3.52 },
  { name: '30', value: 3.55 },
];

export function RawMaterials() {
  return (
    <div className="p-container-padding flex flex-col h-full bg-surface-container-lowest">
      {/* Header & Actions */}
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h2 className="font-headline-lg font-semibold text-on-surface mb-1">Matières Premières</h2>
          <p className="text-secondary text-[14px]">Gérez les cours des matériaux et les fournisseurs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline text-on-surface text-[11px] font-semibold rounded hover:bg-surface-container-low transition-colors">
            <History className="w-4 h-4" />
            Historique LME
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-[11px] font-bold rounded hover:bg-primary-container transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            Importer Tarifs Excel
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-6 bg-error-container/20 border border-error-container rounded p-4 flex items-start gap-3 shrink-0">
        <AlertTriangle className="text-error w-5 h-5 mt-0.5" />
        <div>
          <h3 className="text-[11px] font-bold text-error">Alerte Seuil : Aluminium LME</h3>
          <p className="text-[14px] text-on-surface mt-1">Le cours de l'Aluminium LME a dépassé le seuil d'alerte de 3.50€/kg (Actuel: 3.55€/kg). Pensez à répercuter cette hausse sur vos devis en cours.</p>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Data Table */}
        <div className="flex-1 border border-secondary-fixed rounded overflow-hidden flex flex-col">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b-2 border-outline-variant text-[12px] font-semibold text-on-surface">
              <tr>
                <th className="p-table-cell-padding border-r border-secondary-fixed">Matière</th>
                <th className="p-table-cell-padding border-r border-secondary-fixed">Fournisseur</th>
                <th className="p-table-cell-padding border-r border-secondary-fixed text-right">Prix Achat</th>
                <th className="p-table-cell-padding border-r border-secondary-fixed w-16 text-center">Devise</th>
                <th className="p-table-cell-padding border-r border-secondary-fixed">Dernière Mise à Jour</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-on-surface">
              {MOCK_RAW_MATERIALS.map((m, idx) => (
                <tr key={m.id} className="border-b border-secondary-fixed hover:bg-surface-container-low transition-colors group">
                  <td className="p-table-cell-padding border-r border-secondary-fixed font-bold">{m.name}</td>
                  <td className="p-table-cell-padding border-r border-secondary-fixed">{m.supplier}</td>
                  <td className="p-table-cell-padding border-r border-secondary-fixed text-right relative cursor-pointer hover:border-2 hover:border-primary">
                    <span className="font-mono font-bold mr-1">{m.price.toFixed(2)}</span>
                    <Edit2 className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-outline opacity-0 group-hover:opacity-100" />
                  </td>
                  <td className="p-table-cell-padding border-r border-secondary-fixed text-center text-secondary">
                    {m.currency}/{m.unit}
                  </td>
                  <td className="p-table-cell-padding text-secondary border-r border-secondary-fixed">
                    {new Date(m.last_updated).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analytics Drawer Style */}
        <div className="w-[350px] flex flex-col gap-6 shrink-0 overflow-y-auto pr-2">
          <div className="border border-secondary-fixed rounded bg-surface-container-lowest p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-semibold text-on-surface">Évolution LME (30 Jours)</h3>
            </div>
            <div className="h-48 w-full bg-surface-container-low/50 rounded flex items-center justify-center relative overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="value" stroke="#003d9b" strokeWidth={2} dot={false} />
                  <Tooltip />
                  <YAxis domain={['auto', 'auto']} hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border border-secondary-fixed rounded bg-surface-container-lowest p-4">
              <h4 className="text-[11px] font-semibold text-secondary mb-2 uppercase">Cours Actuel LME</h4>
              <div className="text-[36px] font-bold text-primary tracking-tight">
                3.55 <span className="text-lg font-normal text-secondary">€/kg</span>
              </div>
            </div>
            <div className="border border-secondary-fixed rounded bg-surface-container-lowest p-4 flex-1">
              <h4 className="text-[11px] font-semibold text-secondary mb-2 uppercase">Impact Estimé Marge</h4>
              <div className="text-[36px] font-bold text-error tracking-tight flex items-center gap-2">
                <TrendingDown className="w-8 h-8" />
                -1.2%
              </div>
              <p className="text-[11px] font-semibold text-secondary mt-2">Basé sur les devis en cours non validés.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
