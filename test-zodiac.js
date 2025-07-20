// Teste da biblioteca zodiac-signs
import zodiacSigns from 'zodiac-signs'

// Testando diferentes métodos
console.log('zodiacSigns object:', zodiacSigns)
console.log('Methods:', Object.getOwnPropertyNames(zodiacSigns))

// Testando possíveis métodos
try {
  console.log('getSign:', zodiacSigns.getSign?.(new Date('1990-04-15')))
} catch (e) {
  console.log('getSign failed:', e.message)
}

try {
  console.log('getZodiacSign:', zodiacSigns.getZodiacSign?.(4, 15))
} catch (e) {
  console.log('getZodiacSign failed:', e.message)
}
