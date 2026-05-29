import React, { useState } from 'react';
import { RotateCw, Save, BellRing, Info, CheckCircle2, TrendingDown } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';

export function Calculator() {
  // Local state for dynamic calculation
  const [materialPrice, setMaterialPrice] = useState(3.69); // Using Aluminium 6060 base proxy
  const [width, setWidth] = useState(120.5);
  const [length, setLength] = useState(6.00);
  const [thickness, setThickness] = useState(80);
  
  // Weights and parameters
  const [weightPerMeter] = useState(1.245);
  const [quantity, setQuantity] = useState(500);
  const [wastePercentage, setWastePercentage] = useState(3.5);
  const [machineCostPerHour, setMachineCostPerHour] = useState(85.00);
  const [energyCostPerKw, setEnergyCostPerKw] = useState(0.18);
  const [targetMargin] = useState(35); // 35%

  // Derived calculations (Mock logic mirroring real-world simulation)
  const totalWeight = (weightPerMeter * length * quantity) * (1 + wastePercentage / 100);
  const materialCost = totalWeight * materialPrice;
  const machineHours = quantity / 100; // Mock: 5 hours for 500 units
  const machineCost = machineHours * machineCostPerHour;
  const energyCost = machineHours * 125 * energyCostPerKw; // Mock: 125kW per hour
  const packagingCost = 85; 

  const totalCost = materialCost + machineCost + energyCost + packagingCost;
  const unitCost = totalCost / quantity;

  // Commercial logic
  const sellingPriceUnit = 6.90; // Mock fixed selling price for analysis
  const totalRevenue = sellingPriceUnit * quantity;
  const margin = totalRevenue - totalCost;
  const marginPercentage = (margin / totalRevenue) * 100;
  
  const handleReset = () => {
    setQuantity(500);
    setWastePercentage(3.5);
    setMachineCostPerHour(85.00);
    setEnergyCostPerKw(0.18);
  };

  return (
    <div className="p-container-padding flex flex-col h-full overflow-hidden min-h-0 bg-background">
      <div className="flex justify-between items-end mb-6 shrink-0">
        <div>
          <h1 className="font-headline-lg font-semibold text-on-background">Simulation PR102-B</h1>
          <p className="text-[14px] text-on-surface-variant mt-1">Profilé Standard Industriel - Lot #8492</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="bg-surface-container-lowest border border-outline-variant text-[12px] font-semibold rounded px-4 py-2 hover:bg-surface-container-low flex items-center gap-2 transition-colors">
            <RotateCw className="w-4 h-4" />
            Réinitialiser
          </button>
          <button className="bg-primary text-on-primary text-[12px] font-bold rounded px-4 py-2 hover:bg-primary-container flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            Enregistrer Devis
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1 min-h-0 overflow-y-auto">
        
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 flex flex-col shadow-sm">
            <h2 className="font-headline-md font-semibold text-on-background mb-4 border-b border-outline-variant pb-2">Paramètres d'Entrée</h2>
            
            <div className="flex flex-col gap-3 mt-2">
              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center border-b border-surface-container pb-2">
                <label className="text-[13px] text-on-surface-variant">Matière</label>
                <select className="text-right border border-outline-variant bg-surface-container-lowest px-2 py-1 text-[13px] rounded w-full focus:outline-none focus:border-primary">
                  <option>Aluminium 6060</option>
                  <option>Aluminium 5754</option>
                </select>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center border-b border-surface-container pb-2">
                <label className="text-[13px] text-on-surface-variant">Largeur (mm)</label>
                <div className="relative">
                  <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="text-right border border-outline-variant bg-surface-container-lowest px-2 py-1 text-[13px] rounded w-full pr-8 focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[11px]">mm</span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center border-b border-surface-container pb-2">
                <label className="text-[13px] text-on-surface-variant">Longueur (m)</label>
                <div className="relative">
                  <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} className="text-right border border-outline-variant bg-surface-container-lowest px-2 py-1 text-[13px] rounded w-full pr-8 focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[11px]">m</span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center border-b border-surface-container pb-2">
                <label className="text-[13px] text-on-surface-variant">Poids Linéaire</label>
                <div className="relative">
                  <input type="number" readOnly value={weightPerMeter} className="text-right border border-outline-variant bg-surface-container-low text-secondary px-2 py-1 text-[13px] rounded w-full pr-8 focus:outline-none" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[11px]">kg</span>
                </div>
              </div>

              <div className="w-full h-px bg-outline-variant my-2"></div>

              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center border-b border-surface-container pb-2">
                <label className="text-[13px] text-on-surface-variant font-bold">Quantité (Unités)</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="text-right border border-primary bg-surface-container-lowest px-2 py-1 text-[13px] font-bold text-primary rounded w-full focus:outline-none ring-1 ring-primary" />
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center border-b border-surface-container pb-2">
                <label className="text-[13px] text-on-surface-variant">% Déchets</label>
                <div className="relative">
                  <input type="number" value={wastePercentage} onChange={(e) => setWastePercentage(Number(e.target.value))} className="text-right border border-outline-variant bg-surface-container-lowest px-2 py-1 text-[13px] rounded w-full pr-8 focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[11px]">%</span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center border-b border-surface-container pb-2">
                <label className="text-[13px] text-on-surface-variant">Coût Machine/h</label>
                <div className="relative">
                  <input type="number" value={machineCostPerHour} onChange={(e) => setMachineCostPerHour(Number(e.target.value))} className="text-right border border-outline-variant bg-surface-container-lowest px-2 py-1 text-[13px] rounded w-full pr-8 focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[11px]">€</span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_120px] gap-gutter items-center">
                <label className="text-[13px] text-on-surface-variant">Coût Énergie (kW/h)</label>
                <div className="relative">
                  <input type="number" value={energyCostPerKw} onChange={(e) => setEnergyCostPerKw(Number(e.target.value))} className="text-right border border-outline-variant bg-surface-container-lowest px-2 py-1 text-[13px] rounded w-full pr-8 focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[11px]">€</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Results */}
        <div className="lg:col-span-5 flex flex-col gap-gutter">
          <div className="grid grid-cols-2 gap-gutter">
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Coût Matière</span>
              <div className="text-[36px] font-bold text-on-background mt-2 tracking-tight">
                {Math.round(materialCost).toLocaleString('fr-FR')} <span className="text-[20px] text-outline ml-1">€</span>
              </div>
              <span className="text-[13px] text-outline mt-1 line-through">{Math.round(materialCost * 1.05).toLocaleString('fr-FR')} €</span>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Coût Machine</span>
              <div className="text-[36px] font-bold text-on-background mt-2 tracking-tight">
                {Math.round(machineCost).toLocaleString('fr-FR')} <span className="text-[20px] text-outline ml-1">€</span>
              </div>
              <span className="text-[13px] text-outline mt-1">{machineHours}h de production</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Coût Énergie</span>
              <div className="text-[36px] font-bold text-on-background mt-2 tracking-tight">
                {Math.round(energyCost).toLocaleString('fr-FR')} <span className="text-[20px] text-outline ml-1">€</span>
              </div>
              <span className="text-[13px] text-outline mt-1">Base {energyCostPerKw} €/kW</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded p-4 flex flex-col">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Coût Emballage</span>
              <div className="text-[36px] font-bold text-on-background mt-2 tracking-tight">
                {packagingCost} <span className="text-[20px] text-outline ml-1">€</span>
              </div>
              <span className="text-[13px] text-outline mt-1">Forfait standard</span>
            </div>
          </div>

          <div className="bg-primary flex-1 border border-primary-fixed-dim rounded p-6 flex flex-col justify-center items-center text-center mt-2">
            <span className="text-[12px] font-semibold text-on-primary-container uppercase tracking-widest opacity-80 mb-2">Coût Total Série</span>
            <div className="text-[48px] font-bold text-white leading-none mb-4 tracking-tight">
              {formatCurrency(totalCost)}
            </div>
            <div className="w-full h-px bg-white/20 my-4"></div>
            <span className="text-[12px] font-semibold text-on-primary-container uppercase tracking-widest opacity-80 mb-1">Prix de Revient Unitaire</span>
            <div className="text-[32px] font-bold text-inverse-primary leading-none tracking-tight">
              {formatCurrency(unitCost)} <span className="text-[16px] font-normal">/ pce</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Analysis */}
        <div className="lg:col-span-3 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 shadow-sm">
            <h3 className="font-headline-md font-semibold text-on-background mb-4">Analyse Commerciale</h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[13px] text-on-surface-variant">Objectif Marge</span>
                <span className="text-[13px] font-bold text-on-surface">{targetMargin}%</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-outline h-full" style={{ width: `${targetMargin}%` }}></div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[13px] text-on-surface-variant">Marge Réalisée</span>
                <span className={cn("text-[13px] font-bold", marginPercentage < targetMargin ? "text-error" : "text-success")}>
                  {marginPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full relative overflow-hidden">
                <div className={cn("h-full", marginPercentage < targetMargin ? "bg-error" : "bg-success")} style={{ width: `${marginPercentage}%` }}></div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-outline-variant z-10" style={{ left: `${targetMargin}%`}}></div>
              </div>
            </div>

            {marginPercentage < targetMargin && (
              <div className="flex items-center gap-3 p-3 bg-error-container/30 border border-error-container rounded mt-4">
                <TrendingDown className="text-error w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-error uppercase">Rentabilité Sous-optimale</div>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">Écart de {(marginPercentage - targetMargin).toFixed(1)}% par rapport à l'objectif.</div>
                </div>
              </div>
            )}
            {marginPercentage >= targetMargin && (
              <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/30 rounded mt-4">
                <CheckCircle2 className="text-success w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-semibold text-success uppercase">Rentabilité Atteinte</div>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">L'objectif commercial est respecté pour cette série.</div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 flex flex-col flex-1 shadow-sm">
            <h3 className="font-headline-md font-semibold text-on-background mb-4 flex items-center gap-2 border-b border-outline-variant pb-2">
              <BellRing className="w-5 h-5 text-outline" />
              Alertes Automatiques
            </h3>
            <ul className="flex flex-col gap-3 flex-1 overflow-y-auto">
              <li className="flex items-start gap-3 pb-3 border-b border-surface-container">
                <AlertTriangle className="text-error w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-bold text-on-background block">Prix marché trop bas</span>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">Le coût matière a augmenté de 4% ce mois-ci, impactant le PR.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pb-3 border-b border-surface-container">
                <Info className="text-primary w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-bold text-on-background block">Optimisation Possible</span>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">Augmenter la série à 1000u réduirait le coût machine unitaire de 15%.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-outline w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[12px] font-bold text-on-background block">Taux Déchets Validé</span>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">Le taux de {wastePercentage}% est conforme à l'historique de cette référence.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
