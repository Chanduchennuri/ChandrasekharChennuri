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
     <TabsContent value="github" className="min-w-0">
  <Card className="grid min-w-0 max-w-full gap-6 overflow-hidden p-4 sm:p-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 md:p-7">

    {/* GitHub Profile */}
    <div className="min-w-0 max-w-full">
      <img
        src={u?.avatar_url ?? `${import.meta.env.BASE_URL}avatar.jpg`}
        alt=""
        className="mb-4 h-36 w-36 max-w-full rounded-full border border-white/20 sm:h-44 sm:w-44"
      />

      <h3 className="break-words text-xl font-semibold tracking-tight">
        {u?.name ?? P.name}
      </h3>

      <p className="mb-3 break-words text-white/50">
        {P.gh}
      </p>

      <p className="mb-4 break-words text-sm leading-relaxed text-white/60">
        {u?.bio ?? 'AI/ML student · agentic AI & LLM engineering.'}
      </p>

      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-3 font-mono text-sm">
        {stats.map(([k, v]) => (
          <div key={k}>
            <b className="block text-base">
              {v ?? '—'}
            </b>
            <span className="text-[10px] uppercase text-white/40">
              {k}
            </span>
          </div>
        ))}
      </div>

      <Button asChild className="max-w-full">
        <a
          href={P.github}
          target="_blank"
          rel="noreferrer"
          className="max-w-full"
        >
          View profile
          <ExternalLink className="h-3 w-3" />
        </a>
      </Button>
    </div>

    {/* README + Repositories */}
    <div className="min-w-0 max-w-full">

      <div className="max-w-full overflow-hidden rounded-lg border border-white/10">

        <div className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-white/10 px-4 py-2 font-mono text-xs text-white/50">
          {P.gh} / README.md
        </div>

        <div className="min-w-0 space-y-3 p-4 text-sm leading-relaxed text-white/70 sm:p-5">

          <Typing />

          <p className="break-words">
            AI &amp; ML student focused on how AI systems move beyond
            conversation — reasoning, tool use, data access, and action.
          </p>

          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-white/5 p-3 text-xs">
DATA → BACKEND → ML → LLMs → AGENTS → PRODUCT
          </pre>

          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full table-fixed text-left text-xs">
              <tbody>
                {[
                  ['Primary focus', 'Agentic AI'],
                  ['AI', 'LLMs · RAG · Agents'],
                  ['Data', 'Snowflake · ADF · dbt · SQL'],
                  ['Goal', 'AI/ML engineering roles']
                ].map(([a, b]) => (
                  <tr
                    key={a}
                    className="border border-white/10"
                  >
                    <td className="w-1/3 break-words p-2 text-white">
                      {a}
                    </td>

                    <td className="break-words p-2">
                      {b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-widest text-white/40">
        {gh?.repos.length ? 'Recent repositories' : 'Selected projects'}
      </h4>

      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        {cards.map(p => (
          <a
            key={p.n}
            data-target
            href={p.h}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 max-w-full overflow-hidden rounded-lg border border-white/10 bg-white/[.03] p-4"
          >
            <div className="mb-1 break-words font-medium">
              {p.n}
            </div>

            <p className="mb-2 line-clamp-2 break-words text-xs text-white/50">
              {p.d}
            </p>

            <div className="flex min-w-0 flex-wrap gap-1">
              {p.t.slice(0, 3).map(t => (
                <Badge
                  key={t}
                  className="max-w-full break-words"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </a>
        ))}
      </div>

      <p className="mt-4 break-words text-[11px] text-white/30">
        {gh
          ? 'Live data from the GitHub API'
          : 'Snapshot data — live GitHub data loads when api.github.com is reachable'}
      </p>

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
