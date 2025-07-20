import { Icon } from "@iconify/react"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface SegurancaTabProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  isSubmittingPassword: boolean
  onSubmitPassword: (e: React.FormEvent) => void
  userSessions: any[]
  onEndSession: (sessionId: string) => void
  isEndingSession: boolean
}

export default function SegurancaTab({
  register,
  errors,
  isSubmittingPassword,
  onSubmitPassword,
  userSessions,
  onEndSession,
  isEndingSession,
}: SegurancaTabProps) {
  return (
    <div className="card-glassmorphism">
      <h3 className="font-sans text-xl font-bold text-[#2E4A2F] mb-6">Segurança da Conta</h3>

      <div className="space-y-6">
        {/* Change Password */}
        <div className="form-section">
          <h4 className="section-title">Alterar Senha</h4>
          <form onSubmit={onSubmitPassword} className="space-y-4">
            <div className="input-with-icon">
              <Icon icon="mdi:lock" className="input-icon" />
              <input 
                type="password" 
                {...register("currentPassword")}
                placeholder="Senha atual" 
                className="input-glassmorphism font-sans" 
              />
              {errors.currentPassword && (
                <div className="error-message font-sans">{String(errors.currentPassword.message || "Campo obrigatório")}</div>
              )}
            </div>
            <div className="input-with-icon">
              <Icon icon="mdi:lock-plus" className="input-icon" />
              <input 
                type="password" 
                {...register("newPassword")}
                placeholder="Nova senha" 
                className="input-glassmorphism font-sans" 
              />
              {errors.newPassword && (
                <div className="error-message font-sans">{String(errors.newPassword.message || "Campo obrigatório")}</div>
              )}
            </div>
            <div className="input-with-icon">
              <Icon icon="mdi:lock-check" className="input-icon" />
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirmar nova senha"
                className="input-glassmorphism font-sans"
              />
              {errors.confirmPassword && (
                <div className="error-message font-sans">{String(errors.confirmPassword.message || "Campo obrigatório")}</div>
              )}
            </div>
            <button 
              type="submit"
              disabled={isSubmittingPassword}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmittingPassword ? (
                <>
                  <Icon icon="mdi:loading" className="w-5 h-5 inline mr-2 animate-spin" />
                  Alterando...
                </>
              ) : (
                <>
                  <Icon icon="mdi:key" className="w-5 h-5 inline mr-2" />
                  Alterar Senha
                </>
              )}
            </button>
          </form>
        </div>

        {/* Two Factor Authentication */}
        <div className="form-section">
          <h4 className="section-title">Autenticação de Dois Fatores</h4>
          <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
            <div>
              <p className="font-sans font-medium text-[#2E4A2F]">2FA não está ativado</p>
              <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
            <button className="btn-secondary">
              <Icon icon="mdi:shield-plus" className="w-5 h-5 inline mr-2" />
              Ativar 2FA
            </button>
          </div>
        </div>

        {/* Login Sessions */}
        <div className="form-section">
          <h4 className="section-title">Sessões Ativas</h4>
          <div className="space-y-3">
            {userSessions?.map((session) => (
              <div key={session.id} className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon 
                    icon={session.device.includes("iPhone") ? "mdi:cellphone" : "mdi:laptop"} 
                    className="w-6 h-6 text-[#2E4A2F]" 
                  />
                  <div>
                    <p className="font-sans font-medium text-[#2E4A2F]">{session.device}</p>
                    <p className="font-sans text-sm text-[#2C4A7E] opacity-70">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {session.isCurrent ? (
                  <span className="px-3 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">
                    Atual
                  </span>
                ) : (
                  <button 
                    onClick={() => onEndSession(session.id)}
                    disabled={isEndingSession}
                    className="btn-secondary text-sm px-3 py-1 disabled:opacity-50"
                  >
                    {isEndingSession ? "Encerrando..." : "Encerrar"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
