export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🏛️ PolitPlatform
        </h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.9 }}>
          Mega Siyasi Sosyal Medya Platformu
        </p>
        <p style={{ marginTop: '2rem', opacity: 0.8 }}>
          Platform yakında yayında olacak...
        </p>
      </div>
    </main>
  )
}
