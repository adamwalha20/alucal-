import React from 'react';
import { Euro, TrendingUp, CheckCircle2, AlertTriangle, Box, Clock, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const evolutionData = [
  { name: 'Jan', value: 45 },
  { name: 'Fév', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Avr', value: 65 },
  { name: 'Mai', value: 58 },
  { name: 'Juin', value: 75 },
];

export function Dashboard() {
  return (
    <div className="p-container-padding">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-headline-lg font-semibold text-on-surface">Vue d'ensemble</h2>
          <p className="text-secondary mt-1 text-[14px]">Analyse des coûts de production et marges.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-[14px] hover:bg-surface-variant transition-colors flex items-center gap-2">
            Filtrer
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded text-[14px] font-bold hover:bg-primary-container transition-colors flex items-center gap-2">
            + Nouveau Calcul
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Prix Moyen', value: '4.52', sub: '€/kg', icon: Euro, highlight: false },
          { label: 'Marge Moyenne', value: '22%', sub: '+1.2% ce mois', icon: TrendingUp, highlight: true, color: 'text-primary' },
          { label: 'Produits Rentables', value: '84', sub: 'Marge > 15%', icon: CheckCircle2, highlight: false },
          { label: 'Produits à Risque', value: '12', sub: 'Marge < 10%', icon: AlertTriangle, highlight: true, color: 'text-error' },
          { label: 'Coût Matière', value: '3.10', sub: '€/kg LME', icon: Box, highlight: false },
          { label: 'Dernière Modif', value: '10:42', sub: "Aujourd'hui", icon: Clock, highlight: false },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-2">
              <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.highlight ? kpi.color : 'text-outline'}`} />
            </div>
            <div>
              <div className={`text-[36px] font-bold leading-tight tracking-tight ${kpi.highlight ? kpi.color : 'text-on-surface'}`}>
                {kpi.value}
              </div>
              <div className={`text-[12px] mt-1 ${kpi.highlight && kpi.color === 'text-error' ? 'text-error' : 'text-secondary'}`}>
                {kpi.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-on-surface">Évolution des Coûts</h3>
            </div>
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c3c6d6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#5c5f60' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f1f3ff' }} contentStyle={{ borderRadius: 4, border: '1px solid #c3c6d6' }} />
                  <Bar dataKey="value" fill="#dae2ff" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-surface-container-lowest border border-outline-variant rounded h-full flex flex-col">
            <div className="p-4 border-b border-outline-variant bg-surface-bright flex justify-between items-center">
              <h3 className="font-headline-md flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" /> Alertes Intelligentes
              </h3>
              <span className="bg-error text-on-error text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div className="p-3 border-l-4 border-error bg-error-container/20 rounded-r">
                <h4 className="text-[11px] font-bold text-on-surface">Produit REF-044 marge &lt; 10%</h4>
                <p className="text-[12px] text-secondary mt-1">Le coût matière a dépassé le seuil d'alerte suite à la hausse du LME.</p>
                <button className="text-[12px] text-error font-bold mt-2 hover:underline">Voir le calcul</button>
              </div>
              <div className="p-3 border-l-4 border-warning bg-warning/10 rounded-r">
                <h4 className="text-[11px] font-bold text-on-surface">Prix Aluminium +5% aujourd'hui</h4>
                <p className="text-[12px] text-secondary mt-1">Impact estimé sur 45 références actives.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
