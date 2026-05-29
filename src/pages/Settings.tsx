import React from 'react';
import { ImagePlus } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-container-padding flex-1 bg-surface-bright overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-headline-lg font-semibold text-on-surface">Configuration Générale</h1>
          <p className="text-[14px] text-secondary mt-1">Gérez les paramètres de l'entreprise, les taux par défaut et les utilisateurs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-3">
            <nav className="flex flex-col gap-1 sticky top-0">
              <button className="text-left px-4 py-2 bg-surface-container-low text-primary font-bold rounded text-[14px] border-l-2 border-primary">
                Société
              </button>
              <button className="text-left px-4 py-2 text-secondary hover:bg-surface-container-lowest rounded text-[14px] transition-colors border-l-2 border-transparent">
                Devise et Unités
              </button>
              <button className="text-left px-4 py-2 text-secondary hover:bg-surface-container-lowest rounded text-[14px] transition-colors border-l-2 border-transparent">
                Taux de Charges
              </button>
              <button className="text-left px-4 py-2 text-secondary hover:bg-surface-container-lowest rounded text-[14px] transition-colors border-l-2 border-transparent">
                Paramètres de Calcul
              </button>
              <button className="text-left px-4 py-2 text-secondary hover:bg-surface-container-lowest rounded text-[14px] transition-colors border-l-2 border-transparent">
                Utilisateurs
              </button>
            </nav>
          </div>

          <div className="lg:col-span-9 flex flex-col gap-8">
            <section className="bg-surface-container-lowest border border-outline-variant rounded p-6">
              <h3 className="font-headline-md font-semibold text-on-surface mb-6 border-b border-outline-variant pb-2">Société</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-surface-container-low border border-outline-variant rounded flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-primary transition-colors relative group">
                    <ImagePlus className="text-outline group-hover:text-primary transition-colors w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-secondary mb-1">Nom de l'entreprise</label>
                      <input 
                        type="text" 
                        defaultValue="AluCalc Pro Manufacturing" 
                        className="w-full bg-surface-bright border border-outline-variant rounded px-3 py-2 text-[14px] text-on-surface focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-secondary mb-1">Numéro de SIRET</label>
                        <input 
                          type="text" 
                          defaultValue="123 456 789 00012" 
                          className="w-full bg-surface-bright border border-outline-variant rounded px-3 py-2 text-[14px] text-on-surface focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" 
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-secondary mb-1">Code NAF</label>
                        <input 
                          type="text" 
                          defaultValue="2511Z" 
                          className="w-full bg-surface-bright border border-outline-variant rounded px-3 py-2 text-[14px] text-on-surface focus:outline-none focus:border-primary focus:border-2 focus:-m-[1px]" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-4 mt-4">
              <button className="px-4 py-2 bg-surface-container-lowest border border-outline-variant text-on-surface text-[11px] font-bold rounded hover:bg-surface-container-low transition-colors">
                Annuler
              </button>
              <button className="px-4 py-2 bg-primary text-on-primary text-[11px] font-bold rounded hover:bg-on-primary-fixed-variant transition-colors">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
