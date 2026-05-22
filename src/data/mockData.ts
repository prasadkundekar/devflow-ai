import type {
  ActivityItem,
  ChatMessage,
  Note,
  ProjectProgress,
  Snippet,
  StatCard,
  Task,
} from '../types'

export const NAV_SECTIONS = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'tasks' as const, label: 'Tasks', icon: 'Kanban' },
  { id: 'notes' as const, label: 'Notes', icon: 'StickyNote' },
  { id: 'snippets' as const, label: 'Snippets', icon: 'Code2' },
  { id: 'analytics' as const, label: 'Analytics', icon: 'BarChart3' },
  { id: 'ai' as const, label: 'AI Assistant', icon: 'Sparkles' },
  { id: 'settings' as const, label: 'Settings', icon: 'Settings' },
]

export const STAT_CARDS: StatCard[] = [
  { label: 'Active Tasks', value: '24', trend: 12, trendLabel: 'vs last week' },
  { label: 'Completed', value: '156', trend: 8, trendLabel: 'vs last week' },
  { label: 'Code Snippets', value: '42', trend: -3, trendLabel: 'vs last week' },
  { label: 'AI Queries', value: '89', trend: 24, trendLabel: 'vs last week' },
]

export const ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    action: 'Completed task',
    target: 'FAISS index optimization',
    time: '2h ago',
    icon: 'check',
  },
  {
    id: '2',
    action: 'Updated note',
    target: 'EV battery thermal model',
    time: '4h ago',
    icon: 'note',
  },
  {
    id: '3',
    action: 'Added snippet',
    target: 'useLocalStorage hook',
    time: 'Yesterday',
    icon: 'code',
  },
  {
    id: '4',
    action: 'AI session',
    target: 'RAG pipeline architecture',
    time: 'Yesterday',
    icon: 'sparkles',
  },
  {
    id: '5',
    action: 'Moved task',
    target: 'JWT refresh flow → In Progress',
    time: '2 days ago',
    icon: 'kanban',
  },
]

export const PROJECTS: ProjectProgress[] = [
  { id: '1', name: 'EV Thermal Management System', progress: 72, color: '#7c5cff' },
  { id: '2', name: 'RAG Pipeline (FAISS + LangChain)', progress: 45, color: '#3b82f6' },
  { id: '3', name: 'Flask JWT Auth Service', progress: 88, color: '#10b981' },
]

export const AI_SUGGESTION = {
  title: 'Optimize your RAG retrieval',
  body: 'Your FAISS index has grown to 12k vectors. Consider switching to IVF-PQ indexing for faster queries on the EV documentation corpus.',
  cta: 'Ask AI about FAISS tuning',
}

export const TASKS: Task[] = [
  {
    id: 't1',
    title: 'Implement Dijkstra pathfinding',
    description: 'Graph-based routing for EV charging stations',
    column: 'backlog',
    priority: 'high',
    tags: ['algorithms', 'python'],
    dueDate: 'May 28',
  },
  {
    id: 't2',
    title: 'FAISS index rebuild',
    description: 'Migrate to IVF-PQ for 12k document vectors',
    column: 'backlog',
    priority: 'high',
    tags: ['rag', 'ml'],
    dueDate: 'May 30',
  },
  {
    id: 't3',
    title: 'Battery thermal simulation',
    description: 'CFD model validation against test data',
    column: 'backlog',
    priority: 'medium',
    tags: ['ev', 'simulation'],
    dueDate: 'Jun 2',
  },
  {
    id: 't4',
    title: 'useDebounce hook refactor',
    description: 'Add cancel-on-unmount and leading edge option',
    column: 'backlog',
    priority: 'low',
    tags: ['react', 'hooks'],
    dueDate: 'Jun 5',
  },
  {
    id: 't5',
    title: 'JWT refresh token rotation',
    description: 'Flask endpoint + Redis blacklist',
    column: 'in-progress',
    priority: 'high',
    tags: ['flask', 'auth'],
    dueDate: 'May 25',
    progress: 65,
  },
  {
    id: 't6',
    title: 'RAG chunking strategy',
    description: 'Semantic vs fixed-size chunk comparison',
    column: 'in-progress',
    priority: 'medium',
    tags: ['rag', 'nlp'],
    dueDate: 'May 27',
    progress: 40,
  },
  {
    id: 't7',
    title: 'Dashboard glassmorphism polish',
    description: 'Gradient borders and hover states',
    column: 'in-progress',
    priority: 'low',
    tags: ['ui', 'css'],
    dueDate: 'May 26',
    progress: 85,
  },
  {
    id: 't8',
    title: 'EV SOC estimation model',
    description: 'Kalman filter for state of charge',
    column: 'in-progress',
    priority: 'high',
    tags: ['ev', 'ml'],
    dueDate: 'May 29',
    progress: 30,
  },
  {
    id: 't9',
    title: 'useLocalStorage SSR fix',
    description: 'Hydration-safe storage hook',
    column: 'done',
    priority: 'medium',
    tags: ['react', 'hooks'],
    dueDate: 'May 20',
  },
  {
    id: 't10',
    title: 'Flask CORS configuration',
    description: 'Whitelist frontend origins',
    column: 'done',
    priority: 'low',
    tags: ['flask', 'api'],
    dueDate: 'May 18',
  },
  {
    id: 't11',
    title: 'LangChain retriever setup',
    description: 'FAISS + MMR diversity',
    column: 'done',
    priority: 'high',
    tags: ['rag', 'langchain'],
    dueDate: 'May 15',
  },
  {
    id: 't12',
    title: 'Contribution heatmap component',
    description: 'GitHub-style activity grid',
    column: 'done',
    priority: 'low',
    tags: ['ui', 'react'],
    dueDate: 'May 12',
  },
]

export const NOTES: Note[] = [
  {
    id: 'n1',
    title: 'EV Battery Thermal Model',
    content:
      'Lumped capacitance model for cell temperature prediction. Key parameters: C_th = 45 J/K, h_conv = 12 W/m²K. Validate against dyno test data at 1C and 2C discharge rates.',
    tags: ['ev', 'thermal'],
    accent: '#7c5cff',
    updatedAt: '2 hours ago',
  },
  {
    id: 'n2',
    title: 'FAISS Index Tuning Notes',
    content:
      'IVF-PQ with nlist=256, m=64, nbits=8. Query time dropped from 45ms to 8ms on 12k vectors. Recall@10 still at 0.94. Consider HNSW for sub-ms if corpus grows past 100k.',
    tags: ['rag', 'faiss'],
    accent: '#3b82f6',
    updatedAt: 'Yesterday',
  },
  {
    id: 'n3',
    title: 'JWT Refresh Flow Design',
    content:
      'Access token: 15min, refresh: 7d. Store refresh in httpOnly cookie. Rotate on each use. Redis blacklist for revoked tokens. Flask-JWT-Extended + custom decorator.',
    tags: ['auth', 'flask'],
    accent: '#10b981',
    updatedAt: '3 days ago',
  },
  {
    id: 'n4',
    title: 'useDebounce Implementation',
    content:
      'Leading edge fires immediately, trailing after delay. Cleanup on unmount prevents stale callbacks. Generic type T for value. Works with search inputs and resize handlers.',
    tags: ['react', 'hooks'],
    accent: '#ec4899',
    updatedAt: '1 week ago',
  },
  {
    id: 'n5',
    title: 'Dijkstra for Charging Routes',
    content:
      'Weighted graph: nodes = stations, edges = road segments. Weight = distance + availability penalty. Priority queue with heapq. O((V+E) log V) per query.',
    tags: ['algorithms', 'ev'],
    accent: '#06b6d4',
    updatedAt: '1 week ago',
  },
]

export const SNIPPETS: Snippet[] = [
  {
    id: 's1',
    title: "Dijkstra's Algorithm",
    language: 'Python',
    tags: ['algorithms', 'graphs'],
    code: `import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    return dist`,
  },
  {
    id: 's2',
    title: 'useLocalStorage Hook',
    language: 'TypeScript',
    tags: ['react', 'hooks'],
    code: `function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const
}`,
  },
  {
    id: 's3',
    title: 'Flask JWT Protected Route',
    language: 'Python',
    tags: ['flask', 'auth'],
    code: `@app.route('/api/protected')
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    claims = get_jwt()
    return jsonify({
        'user': user_id,
        'role': claims.get('role')
    })`,
  },
]

export const SNIPPET_HIGHLIGHTS: Record<string, string> = {
  s1: `<span class="kw">import</span> heapq\n\n<span class="kw">def</span> <span class="fn">dijkstra</span>(graph, start):\n    dist = {node: <span class="fn">float</span>(<span class="str">'inf'</span>) <span class="kw">for</span> node <span class="kw">in</span> graph}\n    dist[start] = <span class="num">0</span>\n    pq = [(<span class="num">0</span>, start)]\n    <span class="kw">while</span> pq:\n        d, u = heapq.heappop(pq)\n        <span class="kw">if</span> d > dist[u]:\n            <span class="kw">continue</span>\n        <span class="kw">for</span> v, weight <span class="kw">in</span> graph[u]:\n            <span class="kw">if</span> dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                heapq.heappush(pq, (dist[v], v))\n    <span class="kw">return</span> dist`,
  s2: `<span class="kw">function</span> <span class="fn">useLocalStorage</span>&lt;<span class="type">T</span>&gt;(key: <span class="type">string</span>, initial: <span class="type">T</span>) {\n  <span class="kw">const</span> [value, setValue] = <span class="fn">useState</span>&lt;<span class="type">T</span>&gt;(() => {\n    <span class="kw">if</span> (<span class="kw">typeof</span> window === <span class="str">'undefined'</span>) <span class="kw">return</span> initial\n    <span class="kw">const</span> stored = localStorage.getItem(key)\n    <span class="kw">return</span> stored ? JSON.parse(stored) : initial\n  })\n  <span class="fn">useEffect</span>(() => {\n    localStorage.setItem(key, JSON.stringify(value))\n  }, [key, value])\n  <span class="kw">return</span> [value, setValue] <span class="kw">as const</span>\n}`,
  s3: `<span class="dec">@app.route</span>(<span class="str">'/api/protected'</span>)\n<span class="dec">@jwt_required</span>()\n<span class="kw">def</span> <span class="fn">protected</span>():\n    user_id = <span class="fn">get_jwt_identity</span>()\n    claims = <span class="fn">get_jwt</span>()\n    <span class="kw">return</span> jsonify({\n        <span class="str">'user'</span>: user_id,\n        <span class="str">'role'</span>: claims.get(<span class="str">'role'</span>)\n    })`,
}

export const AI_PROMPTS = [
  'How do I tune FAISS IVF-PQ?',
  'Review my useDebounce hook',
  'Best chunking for RAG?',
  'JWT refresh token security',
]

export const AI_RESPONSES: Record<string, string> = {
  'How do I tune FAISS IVF-PQ?':
    'For your 12k vector corpus, start with `nlist=sqrt(N)` ≈ 110, rounded to 128 or 256. Use `m=64` subquantizers with `nbits=8`. Train the index on a representative sample, then set `nprobe=16` for a good recall/latency balance. Your current flat index at 45ms should drop to ~8ms with recall@10 staying above 0.94.',
  'Review my useDebounce hook':
    'Your hook looks solid. Two improvements: (1) add a cleanup in `useEffect` that clears the timeout on unmount to prevent stale updates, and (2) expose a `leading` option so the first call fires immediately—useful for search-as-you-type. Consider using `useRef` for the timeout ID instead of closure capture.',
  'Best chunking for RAG?':
    'For technical docs like your EV corpus, semantic chunking (split on headings/paragraphs) outperforms fixed 512-token windows by ~12% on recall. Use 256–512 tokens with 50-token overlap. For code snippets, keep whole functions intact. LangChain\'s `RecursiveCharacterTextSplitter` with `separators=["\\n## ", "\\n\\n", "\\n"]` works well.',
  'JWT refresh token security':
    'Store refresh tokens in httpOnly, Secure, SameSite=Strict cookies—not localStorage. Rotate on every refresh and invalidate the old token server-side (Redis blacklist). Keep access tokens short-lived (15min). Your Flask setup with JWT-Extended should use `@jwt_required(refresh=True)` on a dedicated `/refresh` endpoint.',
}

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      "Hey! I'm your DevFlow AI assistant. I can help with your EV system, RAG pipeline, React hooks, and Flask auth. Try a suggested prompt below or ask anything.",
  },
]

export const CHART_DATA = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 78 },
  { label: 'Wed', value: 52 },
  { label: 'Thu', value: 90 },
  { label: 'Fri', value: 85 },
  { label: 'Sat', value: 40 },
  { label: 'Sun', value: 55 },
]

export const CATEGORY_BREAKDOWN = [
  { name: 'EV System', count: 8, color: '#7c5cff' },
  { name: 'RAG / ML', count: 6, color: '#3b82f6' },
  { name: 'React / UI', count: 5, color: '#ec4899' },
  { name: 'Flask / API', count: 5, color: '#10b981' },
]

export function generateHeatmap(): number[][] {
  const weeks = 26
  const days = 7
  const grid: number[][] = []
  for (let w = 0; w < weeks; w++) {
    const row: number[] = []
    for (let d = 0; d < days; d++) {
      row.push(Math.floor(Math.random() * 5))
    }
    grid.push(row)
  }
  return grid
}
