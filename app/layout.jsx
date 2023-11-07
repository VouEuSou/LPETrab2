import 'bootstrap/dist/css/bootstrap.css'
import Titulo from '@/components/Titulo'
import ClienteProvider from '@/contexts/cliente';

export const metadata = {
  title: 'Avenida Play',
  description: 'Sistema de indexação de álbuns disponíveis na loja Avenida Play!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="../play.ico" type="image/x-icon" />
      </head>
      <body>
        <ClienteProvider>
          <Titulo />
          {children}
        </ClienteProvider>
      </body>
    </html>
  )
}
