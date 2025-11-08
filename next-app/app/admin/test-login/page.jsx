'use client'

import { useState } from 'react'

export default function TestLogin() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testLogin = async () => {
    setLoading(true)
    setResult('Testing...')
    
    try {
      console.log('Starting login test...')
      
      const url = 'http://localhost:5000/api/auth/login'
      console.log('URL:', url)
      
      const body = {
        email: 'ayoub-k10@hotmail.com',
        password: 'admin123'
      }
      console.log('Body:', body)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })
      
      console.log('Response:', response.status, response.statusText)
      
      const data = await response.json()
      console.log('Data:', data)
      
      setResult(JSON.stringify({
        status: response.status,
        ok: response.ok,
        data: data
      }, null, 2))
      
    } catch (error) {
      console.error('Error:', error)
      setResult(`ERROR: ${error.message}\n\nFull error: ${error.stack}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      <h1>Login Test Page</h1>
      
      <button 
        onClick={testLogin}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          background: '#86ff00',
          color: '#0a0a0a',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '20px'
        }}
      >
        {loading ? 'Testing...' : 'Test Login'}
      </button>
      
      <pre style={{
        marginTop: '30px',
        padding: '20px',
        background: '#1a1a1a',
        borderRadius: '8px',
        overflow: 'auto',
        whiteSpace: 'pre-wrap'
      }}>
        {result || 'Click the button to test login'}
      </pre>
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Open browser DevTools (F12)</li>
          <li>Go to Console tab</li>
          <li>Click "Test Login" button</li>
          <li>Check console logs and result below</li>
        </ol>
        <p>Expected: Status 200, success message with admin email</p>
        <p>If you see "Failed to fetch", check:</p>
        <ul>
          <li>Backend running on port 5000</li>
          <li>CORS errors in console</li>
          <li>Network tab for blocked requests</li>
        </ul>
      </div>
    </div>
  )
}
