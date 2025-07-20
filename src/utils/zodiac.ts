import { zodiacSigns } from "@/constants/onboarding"

export const calculateZodiacSign = (dateString: string) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()

  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.start
    const [endMonth, endDay] = sign.end

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (startMonth > endMonth && (month === startMonth || month === endMonth))
    ) {
      return sign.name
    }
  }

  return ""
}

export const getZodiacDescription = (signName: string) => {
  const sign = zodiacSigns.find((s) => s.name === signName)
  return sign ? sign.description : ""
}
