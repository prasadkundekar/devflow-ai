import { SNIPPET_HIGHLIGHTS } from '../data/mockData'

function escapeHtml(code: string) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const KEYWORDS =
  /\b(import|from|def|class|return|if|else|elif|for|while|in|async|await|const|let|function|export|default|new|typeof|interface|type|useState|useEffect)\b/g
const STRINGS = /('[^']*'|"[^"]*"|`[^`]*`)/g
const COMMENTS = /(\/\/.*$|#.*$)/gm
const NUMBERS = /\b(\d+\.?\d*)\b/g

export function highlightCode(
  code: string,
  snippetId?: string,
): string {
  if (snippetId && SNIPPET_HIGHLIGHTS[snippetId]) {
    return SNIPPET_HIGHLIGHTS[snippetId]
  }

  let html = escapeHtml(code)
  html = html.replace(COMMENTS, '<span class="cmt">$1</span>')
  html = html.replace(STRINGS, '<span class="str">$1</span>')
  html = html.replace(KEYWORDS, '<span class="kw">$1</span>')
  html = html.replace(NUMBERS, '<span class="num">$1</span>')
  return html
}
