import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Hotel Sonar Bangla Goa – Boutique Stay Near Calangute Beach'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F2C59 0%, #1a3a6e 50%, #0d1f3c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div style={{ color: '#E5A93C', fontSize: 18, fontWeight: 600, letterSpacing: 4, marginBottom: 16, fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
          Calangute · Goa · India
        </div>
        <div style={{ color: '#ffffff', fontSize: 58, fontWeight: 700, textAlign: 'center', lineHeight: 1.1, maxWidth: 900 }}>
          Hotel Sonar Bangla Goa
        </div>
        <div style={{ color: '#cbd5e1', fontSize: 24, marginTop: 20, textAlign: 'center', maxWidth: 800, fontFamily: 'sans-serif' }}>
          Boutique Stay · 450m from Calangute Beach · Couple & Family Friendly
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 36 }}>
          {['Swimming Pool', '100% Couple Friendly', 'Bengali Food', 'WhatsApp Booking'].map((f) => (
            <div key={f} style={{ background: 'rgba(229,169,60,0.15)', border: '1px solid rgba(229,169,60,0.4)', color: '#E5A93C', fontSize: 14, padding: '8px 16px', borderRadius: 20, fontFamily: 'sans-serif' }}>
              {f}
            </div>
          ))}
        </div>
        <div style={{ color: '#64748b', fontSize: 16, marginTop: 40, fontFamily: 'sans-serif' }}>
          www.hotelshonarbangla.in · +91 90640 22151
        </div>
      </div>
    ),
    { ...size }
  )
}
