import { useEffect, useState } from 'react'
import { ExternalLink, Github, Linkedin } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { P, certs, education, projects } from '@/data/profile'
import { useGithub } from '@/hooks/useGithub'

function Typing() {
  const [t, setT] = useState('')
  useEffect(() => {
    let i = 0, j = 0, del = false, id = 0
    const step = () => {
      const s = P.typing[i]; j += del ? -1 : 1; setT(s.slice(0, j)); let d = del ? 25 : 55
      if (!del && j === s.length) { del = true; d = 1200 } else if (del && j === 0) { del = false; i = (i + 1) % P.typing.length; d = 300 }
      id = window.setTimeout(step, d)
    }
    step(); return () => clearTimeout(id)
  }, [])
  return <div className="mb-5 min-h-6 text-center font-mono text-[hsl(var(--accent))]">{t}<span className="animate-pulse">▍</span></div>
}

export default function ProfileTabs() {
  const gh = useGithub(P.gh)
  const u = gh?.user
  const cards = gh?.repos.length
    ? gh.repos.slice(0, 6).map(r => ({ n: r.name, d: r.description ?? '', t: [r.language ?? 'Plain', `★ ${r.stargazers_count}`], h: r.html_url }))
    : projects.slice(0, 4).map(p => ({ ...p, h: P.github }))
  const stats: [string, number | undefined][] = [['repos', u?.public_repos], ['followers', u?.followers], ['following', u?.following]]
  return (
    <Tabs defaultValue="github">
      <TabsList>
        <TabsTrigger value="github"><Github className="mr-2 h-4 w-4" />GitHub</TabsTrigger>
        <TabsTrigger value="linkedin"><Linkedin className="mr-2 h-4 w-4" />LinkedIn</TabsTrigger>
      </TabsList>
      <TabsContent value="github">
        <Card className="grid gap-8 p-7 md:grid-cols-[220px_1fr]">
          <div>
            <img src={u?.avatar_url ?? `${import.meta.env.BASE_URL}avatar.jpg`} alt="" className="mb-4 w-44 rounded-full border border-white/20" />
            <h3 className="text-xl font-semibold tracking-tight">{u?.name ?? P.name}</h3>
            <p className="mb-3 text-white/50">{P.gh}</p>
            <p className="mb-4 text-sm leading-relaxed text-white/60">{u?.bio ?? 'AI/ML student · agentic AI & LLM engineering.'}</p>
            <div className="mb-4 flex gap-5 font-mono text-sm">{stats.map(([k, v]) => <div key={k}><b className="block text-base">{v ?? '—'}</b><span className="text-[10px] uppercase text-white/40">{k}</span></div>)}</div>
            <Button asChild><a href={P.github} target="_blank" rel="noreferrer">View profile <ExternalLink className="h-3 w-3" /></a></Button>
          </div>
          <div>
            <div className="rounded-lg border border-white/10">
              <div className="border-b border-white/10 px-4 py-2 font-mono text-xs text-white/50">{P.gh} / README.md</div>
              <div className="space-y-3 p-5 text-sm leading-relaxed text-white/70">
                <Typing />
                <p>AI &amp; ML student focused on how AI systems move beyond conversation — reasoning, tool use, data access, and action.</p>
                <pre className="overflow-x-auto rounded-md bg-white/5 p-3 text-xs">DATA → BACKEND → ML → LLMs → AGENTS → PRODUCT</pre>
                <table className="w-full text-left text-xs"><tbody>{[['Primary focus', 'Agentic AI'], ['AI', 'LLMs · RAG · Agents'], ['Data', 'Snowflake · ADF · dbt · SQL'], ['Goal', 'AI/ML engineering roles']].map(([a, b]) => <tr key={a} className="border border-white/10"><td className="w-1/3 p-2 text-white">{a}</td><td className="p-2">{b}</td></tr>)}</tbody></table>
              </div>
            </div>
            <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-widest text-white/40">{gh?.repos.length ? 'Recent repositories' : 'Selected projects'}</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {cards.map(p => (
                <a key={p.n} data-target href={p.h} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 bg-white/[.03] p-4"><div className="mb-1 font-medium">{p.n}</div><p className="mb-2 line-clamp-2 text-xs text-white/50">{p.d}</p><div className="flex flex-wrap gap-1">{p.t.slice(0, 3).map(t => <Badge key={t}>{t}</Badge>)}</div></a>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-white/30">{gh ? 'Live data from the GitHub API' : 'Snapshot data — live GitHub data loads when api.github.com is reachable'}</p>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="linkedin">
        <Card className="space-y-5 p-7">
          <div><h3 className="text-2xl font-semibold tracking-tight">{P.name}</h3><p className="mt-1 text-white/60">Software Engineer · Backend, Data Engineering &amp; AI Systems</p></div>
          <p className="max-w-2xl text-sm leading-relaxed text-white/70">{P.summary}</p>
          <div><h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-white/40">Education</h4>{education.map(e => <p key={e.s} className="text-sm text-white/70"><b className="text-white">{e.s}</b> — {e.d}</p>)}</div>
          <div><h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-white/40">Licenses &amp; certifications</h4><div className="flex flex-wrap gap-2">{certs.map(c => <Badge key={c}>{c}</Badge>)}</div></div>
          <Button asChild><a href={P.linkedin} target="_blank" rel="noreferrer">Open on LinkedIn <ExternalLink className="h-3 w-3" /></a></Button>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
