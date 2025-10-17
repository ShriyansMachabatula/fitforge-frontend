import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/' as any)({
  component: Home,
})

function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2196F3' }}>
        FitForge Frontend
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
        Welcome to the FitForge fitness tracking application!
      </p>

      <div style={{ marginTop: '3rem' }}>
        <Link
          to="/test"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#2196F3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500',
            fontSize: '1.1rem',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#1976D2'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#2196F3'}
        >
          Test API Connection →
        </Link>
      </div>

      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        background: '#f5f5f5',
        borderRadius: '8px',
        textAlign: 'left'
      }}>
        <h2 style={{ marginTop: 0 }}>Quick Start</h2>
        <ul style={{ lineHeight: '2' }}>
          <li>Frontend running on: <code>http://localhost:3000</code></li>
          <li>Backend API: <code>{import.meta.env.VITE_API_URL || 'http://localhost:8000'}</code></li>
          <li>Test the connection using the button above</li>
        </ul>
      </div>
    </div>
  )
}
