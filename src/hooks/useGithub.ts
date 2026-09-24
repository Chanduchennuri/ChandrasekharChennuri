import { useEffect, useState } from 'react'
export interface GhUser { name: string | null; login: string; bio: string | null; avatar_url: string; public_repos: number; followers: number; following: number }
export interface GhRepo { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number }
/** Live GitHub data; stays null on failure so the UI falls back to local content. */
export function useGithub(login: string) {
  const [d, setD] = useState<{ user: GhUser; repos: GhRepo[] } | null>(null)
  useEffect(() => {
    const c = new AbortController()
    ;(async () => {
      try {
        const [u, r] = await Promise.all([fetch(`https://api.github.com/users/${login}`, { signal: c.signal }), fetch(`https://api.github.com/users/${login}/repos?sort=updated&per_page=12`, { signal: c.signal })])
        if (u.ok) setD({ user: await u.json(), repos: r.ok ? await r.json() : [] })
      } catch { /* offline or rate-limited */ }
    })()
    return () => c.abort()
  }, [login])
  return d
}
