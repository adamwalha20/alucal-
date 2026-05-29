import React from 'react';
import { Filter, Download, MoreVertical } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatPercentage } from '../lib/utils';

const costEvolution = [
  { name: 'Jan', cout: 35, prix: 10 },
  { name: 'Fév', cout: 45, prix: 18 },
  { name: 'Mar', cout: 28, prix: 15 },
  { name: 'Avr', cout: 50, prix: 28 },
  { name: 'Mai', cout: 80, prix: 40 },
  { name: 'Juin', cout: 72, prix: 50 },
];

const lowMarginProducts = [
  { name: 'Grille Aération Std', ref: 'GA-1002', margin: 8.5 },
  { name: 'Profilé Finition U', ref: 'PFU-045', margin: 11.2 },
  { name: 'Poignée Simple', ref: 'ACC-P01', margin: 12.0 },
  { name: 'Capot Drainage', ref: 'ACC-D04', margin: 14.1 },
];

const monthlyComparison = [
  { month: 'Juin 2024', ca: 45200, prod: 31500, margin: 30.3 },
  { month: 'Mai 2024', ca: 42800, prod: 30200, margin: 29.4 },
  { month: 'Avril 2024', ca: 38900, prod: 28100, margin: 27.7 },
  { month: 'Mars 2024', ca: 41500, prod: 29800, margin: 28.1 },
  { month: 'Février 2024', ca: 36200, prod: 26900, margin: 25.6 },
];

export function Analytics() {
  return (
    <div className="p-container-padding flex flex-col h-full overflow-y-auto bg-background">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-headline-lg font-semibold text-on-background">Performances Commerciales</h1>
          <p className="text-secondary mt-1 text-[14px]">Analyse des marges et rentabilité par produit.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant text-on-surface text-[14px] rounded hover:bg-surface-variant transition-colors">
            <Filter className="w-4 h-4" /> Filtrer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-bold text-[14px] rounded hover:bg-primary-container transition-colors">
            <Download className="w-4 h-4" /> Rapport Complet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
        <div className="bg-surface border border-outline-variant p-4 rounded">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">Analyse de la Marge Globale</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-primary tracking-tight leading-none">28.4%</span>
            <span className="text-success text-[14px] font-semibold">↑ +1.2%</span>
          </div>
          <p className="text-secondary mt-2 text-[12px]">Moyenne pondérée sur l'exercice en cours</p>
        </div>
        <div className="bg-surface border border-outline-variant p-4 rounded">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">Coût Moyen de Production</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-on-surface tracking-tight leading-none">142.50 €</span>
            <span className="text-error text-[14px] font-semibold">↑ +3.5%</span>
          </div>
          <p className="text-secondary mt-2 text-[12px]">Impact direct prix aluminium</p>
        </div>
        <div className="bg-surface border border-outline-variant p-4 rounded">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">Volume Total (Kg)</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[36px] font-bold text-on-surface tracking-tight leading-none">12,450</span>
            <span className="text-success text-[14px] font-semibold">↑ +5.8%</span>
          </div>
          <p className="text-secondary mt-2 text-[12px]">Matière première transformée</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-8">
        <div className="col-span-1 lg:col-span-2 bg-surface border border-outline-variant rounded p-6 flex flex-col">
          <h3 className="font-headline-md font-semibold text-on-background mb-6 border-b border-outline-variant pb-2">Top 5 Produits Rentables</h3>
          <div className="flex-1 relative flex items-end gap-4 min-h-[250px] pt-10 pl-8 pb-6">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] text-secondary pr-2 border-r border-outline-variant">
              <span>40%</span><span>30%</span><span>20%</span><span>10%</span><span>0%</span>
            </div>
            
            <div className="flex-1 flex justify-around items-end h-[calc(100%-24px)] mb-6">
              {[
                { label: 'Châssis Fixe XL', val: 85, perc: '34%' },
                { label: 'Porte Lourd', val: 75, perc: '30%' },
                { label: 'Fenêtre OB', val: 65, perc: '26%' },
                { label: 'Baie Coulis.', val: 60, perc: '24%' },
                { label: 'Mur Rideau', val: 55, perc: '22%' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-1/6 group h-full justify-end relative">
                  <div 
                    className="w-full bg-primary rounded-t-sm transition-colors group-hover:bg-primary-container relative" 
                    style={{ height: `${item.val}%`, opacity: 1 - (idx * 0.15) }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[12px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">{item.perc}</span>
                  </div>
                  <span className="text-[11px] text-secondary mt-2 text-center truncate w-full absolute -bottom-6">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-surface border border-outline-variant rounded flex flex-col">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low">
            <h3 className="font-headline-md font-semibold text-on-background">Produits à faible marge</h3>
            <p className="text-[12px] text-secondary mt-1">Marge inférieure à 15%</p>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {lowMarginProducts.map((prod, idx) => (
              <li key={idx} className="flex items-center justify-between p-4 border-b border-outline-variant hover:bg-surface-variant transition-colors">
                <div>
                  <p className="text-[13px] text-on-surface font-semibold">{prod.name}</p>
                  <p className="text-[11px] text-secondary">Réf: {prod.ref}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("font-bold text-[13px]", prod.margin < 13 ? "text-error" : "text-warning")}>
                    {prod.margin}%
                  </span>
                  <span className={cn("w-2 h-2 rounded-full", prod.margin < 13 ? "bg-error" : "bg-warning")}></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter shrink-0 min-h-0">
        <div className="bg-surface border border-outline-variant rounded p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-2">
            <h3 className="font-headline-md font-semibold text-on-background">Évolution des coûts vs Prix d'achat</h3>
            <div className="flex gap-4 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-3 h-1 bg-primary inline-block"></span> Coût Global</span>
              <span className="flex items-center gap-1"><span className="w-3 h-1 bg-outline inline-block"></span> Prix Aluminium</span>
            </div>
          </div>
          <div className="flex-1 relative min-h-[250px] w-full pt-4">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costEvolution}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#5c5f60' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#5c5f60' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cout" stroke="#003d9b" strokeWidth={2} dot={{ r: 4, fill: '#003d9b' }} />
                  <Line type="monotone" dataKey="prix" stroke="#737685" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded flex flex-col overflow-hidden">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
            <h3 className="font-headline-md font-semibold text-on-background">Comparatif Mensuel</h3>
            <button className="text-secondary hover:text-primary"><MoreVertical className="w-4 h-4" /></button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-surface-container-low border-b-2 border-outline-variant">
                  <th className="font-semibold text-[12px] text-on-surface-variant p-table-cell-padding">Mois</th>
                  <th className="font-semibold text-[12px] text-on-surface-variant p-table-cell-padding text-right">CA Généré</th>
                  <th className="font-semibold text-[12px] text-on-surface-variant p-table-cell-padding text-right">Coûts Prod.</th>
                  <th className="font-semibold text-[12px] text-on-surface-variant p-table-cell-padding text-right">Marge Nette</th>
                </tr>
              </thead>
              <tbody>
                {monthlyComparison.map((row, idx) => (
                  <tr key={idx} className={cn("border-b border-outline-variant hover:bg-surface-variant transition-colors", idx % 2 === 1 ? 'bg-surface-bright' : '')}>
                    <td className="text-[13px] text-on-surface p-table-cell-padding font-semibold">{row.month}</td>
                    <td className="text-[13px] text-on-surface p-table-cell-padding text-right">{formatCurrency(row.ca)}</td>
                    <td className="text-[13px] text-on-surface p-table-cell-padding text-right">{formatCurrency(row.prod)}</td>
                    <td className="text-[13px] text-primary p-table-cell-padding text-right font-bold">{row.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
