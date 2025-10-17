import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/test')({
  component: TestPage,
})

interface ApiResponse {
  ok: boolean
  db_user_count: number
  first_user: {
    id: number
    name: string
    email: string
  } | null
}

function TestPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
        const response = await fetch(`${apiUrl}/api/test`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>API Test Page</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>API Test Page</h1>
        <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '4px' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>API Test Page</h1>

      <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2>API Response</h2>
        <div>
          <p><strong>Status:</strong> {data?.ok ? '✅ OK' : '❌ Error'}</p>
          <p><strong>User Count:</strong> {data?.db_user_count}</p>

          {data?.first_user && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '4px' }}>
              <h3 style={{ marginTop: 0 }}>First User</h3>
              <p><strong>ID:</strong> {data.first_user.id}</p>
              <p><strong>Name:</strong> {data.first_user.name}</p>
              <p><strong>Email:</strong> {data.first_user.email}</p>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '1.5rem' }}>
        <h2>Raw JSON</h2>
        <pre style={{ background: '#263238', color: '#aed581', padding: '1rem', borderRadius: '4px', overflowX: 'auto' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}
