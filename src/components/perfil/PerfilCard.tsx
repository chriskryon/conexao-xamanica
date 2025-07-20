import { Icon } from "@iconify/react"
import { UserProfileData, UserStatsData } from "@/schemas/perfil"

interface PerfilCardProps {
  user: UserProfileData | undefined
  stats: UserStatsData | undefined
  isEditing: boolean
  isUploadingAvatar: boolean
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PerfilCard({
  user,
  stats,
  isEditing,
  isUploadingAvatar,
  onAvatarUpload,
}: PerfilCardProps) {
  if (!user) {
    return (
      <div className="card-glassmorphism animate-pulse">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-24 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-glassmorphism text-center overflow-hidden">
      <div className="relative inline-block mb-6">
        {isUploadingAvatar ? (
          <div className="w-32 h-32 rounded-full border-4 border-[#D6BCFA]/30 mx-auto flex items-center justify-center bg-gray-200">
            <Icon icon="mdi:loading" className="w-8 h-8 text-[#2E4A2F] animate-spin" />
          </div>
        ) : (
          <img
            src="/placeholder.svg"
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-[#D6BCFA]/30 mx-auto object-cover"
          />
        )}
        
        {isEditing && (
          <label className="absolute bottom-2 right-2 w-10 h-10 bg-[#D6BCFA] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
            <Icon icon="mdi:camera" className="w-5 h-5 text-[#2E4A2F]" />
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <h2 className="font-sans text-2xl font-bold text-[#2E4A2F] mb-2 truncate">{user.name}</h2>
      <p className="font-sans text-lg text-[#2C4A7E] mb-4 truncate">@{user.nickname}</p>

      <div className="space-y-3 text-sm text-[#2C4A7E]">
        <div className="flex items-center justify-center gap-2">
          <Icon icon="mdi:paw" className="w-5 h-5 text-[#2E4A2F]" />
          <span>Animal de Poder: {user.powerAnimal}</span>
        </div>
        {user.zodiacSign && (
          <div className="flex items-center justify-center gap-2">
            <Icon icon="mdi:star-circle" className="w-5 h-5 text-[#2E4A2F]" />
            <span>Signo: {user.zodiacSign}</span>
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <Icon icon="mdi:calendar" className="w-5 h-5 text-[#2E4A2F]" />
          <span>Membro desde {user.stats?.lastActivity ? new Date(user.stats.lastActivity).getFullYear() : 'Recente'}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <h3 className="font-sans text-lg font-semibold text-[#2E4A2F] mb-4">Estatísticas</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="font-sans text-2xl font-bold text-[#2E4A2F]">
              {stats?.totalEntries || user.stats?.totalEntries || 0}
            </div>
            <div className="font-sans text-xs text-[#2C4A7E] opacity-70">Total</div>
          </div>
          <div className="text-center">
            <div className="font-sans text-2xl font-bold text-[#2E4A2F]">
              {stats?.totalConsagracoes || user.stats?.totalConsagracoes || 0}
            </div>
            <div className="font-sans text-xs text-[#2C4A7E] opacity-70">Rituais</div>
          </div>
          <div className="text-center">
            <div className="font-sans text-2xl font-bold text-[#2E4A2F]">
              {stats?.totalReflexoes || user.stats?.totalReflexoes || 0}
            </div>
            <div className="font-sans text-xs text-[#2C4A7E] opacity-70">Reflexões</div>
          </div>
        </div>
        
        {(stats?.streakDays || user.stats?.streakDays) && (stats?.streakDays || user.stats?.streakDays || 0) > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-center gap-2 text-[#2E4A2F]">
              <Icon icon="mdi:fire" className="w-5 h-5" />
              <span className="font-sans font-medium">{stats?.streakDays || user.stats?.streakDays || 0} dias consecutivos</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
