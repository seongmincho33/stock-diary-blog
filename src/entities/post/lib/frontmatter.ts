export interface Frontmatter {
  [key: string]: string | string[] | undefined
}

export interface ParsedMarkdown {
  data: Frontmatter
  body: string
}

/**
 * 의존성 없는 최소 front matter 파서.
 * `key: value` 와 `key: [a, b]` 형태만 처리하면 충분하다.
 */
export function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(raw)
  if (!match) return { data: {}, body: raw }

  const body = raw.slice(match[0].length)
  const data: Frontmatter = {}

  for (const line of match[1].split('\n')) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (!kv) continue
    const key = kv[1]
    const rawVal = kv[2].trim()

    if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
      data[key] = rawVal
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      data[key] = rawVal.replace(/^["']|["']$/g, '')
    }
  }

  return { data, body }
}
