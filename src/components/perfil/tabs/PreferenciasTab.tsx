"use client"

import { Icon } from "@iconify/react"

export default function PreferenciasTab() {
  return (
    <div className="card-glassmorphism animate-in slide-in-from-right-5 duration-300">
      <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6 flex items-center gap-2">
        <Icon icon="mdi:cog" className="w-6 h-6" />
        Preferências
      </h3>
      
      <div className="space-y-8">
        {/* Notificações */}
        <div>
          <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2">
            Notificações
          </h4>
          <div className="space-y-4">
            {[
              { id: 'reminder', label: 'Lembretes de práticas', description: 'Receber lembretes para momentos de reflexão e prática', enabled: true },
              { id: 'events', label: 'Eventos e cerimônias', description: 'Notificações sobre eventos especiais e cerimônias', enabled: true },
              { id: 'community', label: 'Atividades da comunidade', description: 'Atualizações sobre atividades da comunidade xamânica', enabled: false },
              { id: 'tips', label: 'Dicas espirituais', description: 'Receber dicas e insights sobre práticas espirituais', enabled: true }
            ].map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#2E4A2F]/20">
                <div>
                  <p className="text-[#2E4A2F] font-medium">{setting.label}</p>
                  <p className="text-[#2C4A7E] text-sm">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={setting.enabled}
                    disabled
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4A2F] opacity-50"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Privacidade */}
        <div>
          <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2">
            Privacidade
          </h4>
          <div className="space-y-4">
            {[
              { id: 'public', label: 'Perfil público', description: 'Permitir que outros usuários vejam seu perfil', enabled: false },
              { id: 'analytics', label: 'Compartilhar dados analíticos', description: 'Ajudar a melhorar a experiência compartilhando dados anônimos', enabled: true },
              { id: 'location', label: 'Compartilhar localização', description: 'Permitir compartilhamento de localização para eventos próximos', enabled: false }
            ].map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#2E4A2F]/20">
                <div>
                  <p className="text-[#2E4A2F] font-medium">{setting.label}</p>
                  <p className="text-[#2C4A7E] text-sm">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={setting.enabled}
                    disabled
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4A2F] opacity-50"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Dados */}
        <div>
          <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2">
            Gerenciar Dados
          </h4>
          <div className="space-y-3">
            <button 
              className="w-full p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#2E4A2F]/20 hover:bg-white/90 transition-colors text-left opacity-50 cursor-not-allowed"
              disabled
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#2E4A2F] font-medium">Exportar Dados</p>
                  <p className="text-[#2C4A7E] text-sm">Baixar uma cópia de todos os seus dados</p>
                </div>
                <Icon icon="mdi:download" className="w-5 h-5 text-[#2E4A2F]" />
              </div>
            </button>
            
            <button 
              className="w-full p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors text-left opacity-50 cursor-not-allowed"
              disabled
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-700 font-medium">Excluir Conta</p>
                  <p className="text-red-600 text-sm">Remover permanentemente sua conta e dados</p>
                </div>
                <Icon icon="mdi:delete-forever" className="w-5 h-5 text-red-700" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2 text-amber-800">
          <Icon icon="mdi:information" className="w-5 h-5" />
          <span className="font-medium">Em desenvolvimento</span>
        </div>
        <p className="text-amber-700 text-sm mt-1">
          As configurações de preferências estão sendo implementadas e estarão disponíveis em breve.
        </p>
      </div>
    </div>
  )
}
