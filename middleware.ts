import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Apenas aplicar middleware para rotas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/historico') || 
      request.nextUrl.pathname.startsWith('/perfil')) {
    
    // Verificar se há dados de onboarding no localStorage via cookies/headers
    // Como não podemos acessar localStorage no middleware, vamos verificar na página
    
    // Por enquanto, apenas loggar a tentativa de acesso
    console.log('Middleware: Acesso a rota protegida:', request.nextUrl.pathname)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/historico/:path*', 
    '/perfil/:path*'
  ]
}
