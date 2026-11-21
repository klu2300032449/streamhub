const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export async function getMovies() {
  try {
    const response = await fetch(`${API}/api/movies`)
    if (!response.ok) throw new Error('API request failed')
    return await response.json()
  } catch (error) {
    console.warn('Backend unavailable; showing built-in demo catalogue.', error)
    return null
  }
}
