import { Icon } from "@iconify/react"
import { NotificationPreferencesData } from "@/schemas/perfil"

interface PreferenciasTabProps {
  notificationPreferences: NotificationPreferencesData | undefined
  onUpdateNotifications: (field: keyof NotificationPreferencesData, value: boolean) => void
  onExportData: () => void
  isExportingData: boolean
}

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

function ToggleSwitch({ checked, onChange, disabled = false }: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4A2F] peer-disabled:opacity-50"></div>
    </label>
  )
}

export default function PreferenciasTab({
  notificationPreferences,
  onUpdateNotifications,
  onExportData,
  isExportingData,
}: PreferenciasTabProps) {
  return (
    <div className="card-glassmorphism">
      <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6">Preferências do App</h3>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="form-section">
          <h4 className="section-title">Notificações</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
              <div>
                <p className="font-sans font-medium text-[#2E4A2F]">Lembretes de Registro</p>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                  Receba lembretes para registrar suas experiências
                </p>
              </div>
              <ToggleSwitch
                checked={notificationPreferences?.reminderNotifications ?? true}
                onChange={(value) => onUpdateNotifications("reminderNotifications", value)}
              />
            </div>
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
              <div>
                <p className="font-sans font-medium text-[#2E4A2F]">Eventos Xamânicos</p>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                  Notificações sobre novos eventos e cerimônias
                </p>
              </div>
              <ToggleSwitch
                checked={notificationPreferences?.eventNotifications ?? true}
                onChange={(value) => onUpdateNotifications("eventNotifications", value)}
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="form-section">
          <h4 className="section-title">Privacidade</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
              <div>
                <p className="font-sans font-medium text-[#2E4A2F]">Perfil Público</p>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                  Permitir que outros usuários vejam seu perfil
                </p>
              </div>
              <ToggleSwitch
                checked={notificationPreferences?.publicProfile ?? false}
                onChange={(value) => onUpdateNotifications("publicProfile", value)}
              />
            </div>
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
              <div>
                <p className="font-sans font-medium text-[#2E4A2F]">Compartilhamento de Dados</p>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                  Permitir análises anônimas para melhorar o app
                </p>
              </div>
              <ToggleSwitch
                checked={notificationPreferences?.dataSharing ?? true}
                onChange={(value) => onUpdateNotifications("dataSharing", value)}
              />
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div className="form-section">
          <h4 className="section-title">Dados da Conta</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
              <div>
                <p className="font-sans font-medium text-[#2E4A2F]">Exportar Dados</p>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                  Baixe uma cópia de todos os seus dados
                </p>
              </div>
              <button 
                onClick={onExportData}
                disabled={isExportingData}
                className="btn-secondary disabled:opacity-50"
              >
                {isExportingData ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 inline mr-2 animate-spin" />
                    Exportando...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:download" className="w-5 h-5 inline mr-2" />
                    Exportar
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
              <div>
                <p className="font-sans font-medium text-red-600">Excluir Conta</p>
                <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                  Remover permanentemente sua conta e todos os dados
                </p>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-sans font-medium transition-colors duration-300">
                <Icon icon="mdi:delete" className="w-5 h-5 inline mr-2" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
