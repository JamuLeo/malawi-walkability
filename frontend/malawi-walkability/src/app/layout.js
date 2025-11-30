import './globals.css'
import 'leaflet/dist/leaflet.css'

export const metadata = {
  title: 'Blantyre Walkability Analysis',
  description: 'Urban walkability analysis for Blantyre District, Malawi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}