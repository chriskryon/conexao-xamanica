"use client"

import { Icon } from "@iconify/react"

export default function SegurancaTab() {
  return (
    <div className="card-glassmorphism animate-in slide-in-from-right-5 duration-300">
      <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6 flex items-center gap-2">
        <Icon icon="mdi:shield-lock" className="w-6 h-6" />
        Segurança
      </h3>
      
      <div className="space-y-8">
        {/* Alterar Senha */}
        <div>
          <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2">
            Alterar Senha
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C4A7E] mb-2">Senha Atual</label>
              <input 
                type="password" 
                className="w-full p-3 rounded-lg border border-[#2E4A2F]/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2E4A2F] focus:border-transparent"
                placeholder="Digite sua senha atual"
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2C4A7E] mb-2">Nova Senha</label>
                <input 
                  type="password" 
                  className="w-full p-3 rounded-lg border border-[#2E4A2F]/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2E4A2F] focus:border-transparent"
                  placeholder="Digite sua nova senha"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C4A7E] mb-2">Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  className="w-full p-3 rounded-lg border border-[#2E4A2F]/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#2E4A2F] focus:border-transparent"
                  placeholder="Confirme sua nova senha"
                  disabled
                />
              </div>
            </div>
            <button 
              className="btn-primary px-6 py-2 opacity-50 cursor-not-allowed"
              disabled
            >
              <Icon icon="mdi:shield-lock" className="w-4 h-4 inline mr-2" />
              Alterar Senha
            </button>
          </div>
        </div>

        {/* Sessões Ativas */}
        <div>
          <h4 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4 border-b border-[#2C4A7E]/20 pb-2">
            Sessões Ativas
          </h4>
          <div className="space-y-3">
            {[
              { device: "MacBook Pro - Chrome", location: "São Paulo, Brasil", lastActive: "Ativo agora", isCurrent: true },
              { device: "iPhone - Safari", location: "São Paulo, Brasil", lastActive: "Há 2 horas", isCurrent: false },
              { device: "Windows - Edge", location: "Rio de Janeiro, Brasil", lastActive: "Há 1 dia", isCurrent: false }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-[#2E4A2F]/20">
                <div className="flex items-center gap-3">
                  <Icon 
                    icon={session.device.includes('iPhone') ? 'mdi:cellphone' : session.device.includes('MacBook') ? 'mdi:laptop' : 'mdi:monitor'} 
                    className="w-6 h-6 text-[#2E4A2F]" 
                  />
                  <div>
                    <p className="text-[#2E4A2F] font-medium">{session.device}</p>
                    <p className="text-[#2C4A7E] text-sm">{session.location} • {session.lastActive}</p>
                  </div>
                  {session.isCurrent && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Atual
                    </span>
                  )}
                </div>
                {!session.isCurrent && (
                  <button 
                    className="text-red-600 hover:text-red-800 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    <Icon icon="mdi:logout" className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2 text-amber-800">
          <Icon icon="mdi:information" className="w-5 h-5" />
          <span className="font-medium">Em desenvolvimento</span>
        </div>
        <p className="text-amber-700 text-sm mt-1">
          As funcionalidades de segurança estão sendo implementadas e estarão disponíveis em breve.
        </p>
      </div>
    </div>
  )
}
