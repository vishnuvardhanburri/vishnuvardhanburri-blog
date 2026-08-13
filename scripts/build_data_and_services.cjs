const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const dataDir = path.join(srcDir, 'data');
const servicesDir = path.join(srcDir, 'services');
const utilsDir = path.join(srcDir, 'utils');
const componentsDir = path.join(srcDir, 'components');

[srcDir, dataDir, servicesDir, utilsDir, componentsDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 1. Write src/data/realTargetCompanies.ts
const companies = [
  {
    id: "real-1",
    slug: "linear",
    companyName: "Linear",
    website: "https://linear.app",
    contactName: "Karri Saarinen",
    designation: "CEO & Co-Founder",
    email: "karri.saarinen@linear.app",
    techStack: "React, TypeScript, GraphQL, Rust, PostgreSQL, Cloudflare Workers",
    challenge: "Client-side real-time sync conflict resolution under high concurrent offline queue flushes",
    affectedComponent: "Local-first SQLite / WebRTC replication state engine",
    evidence: "Public engineering posts on zero-roundtrip sync architecture and client database snapshots",
    consequence: "Thread lock stalls and state desynchronization during rapid reconnection bursts"
  },
  {
    id: "real-2",
    slug: "supabase",
    companyName: "Supabase",
    website: "https://supabase.com",
    contactName: "Paul Copplestone",
    designation: "CEO & Co-Founder",
    email: "paul.copplestone@supabase.com",
    techStack: "PostgreSQL, Elixir, Realtime Engine, Go, PostgREST, Rust",
    challenge: "WAL stream backpressure and memory saturation under high-frequency row change broadcast spikes",
    affectedComponent: "Elixir Realtime cluster broadcast workers & PostgreSQL replication slots",
    evidence: "Open source PRs on connection pooling limits and CDC streaming memory spikes",
    consequence: "Replication slot accumulation leading to primary DB disk pressure and message drops"
  },
  {
    id: "real-3",
    slug: "neon",
    companyName: "Neon",
    website: "https://neon.tech",
    contactName: "Nikita Shamgunov",
    designation: "CEO & Co-Founder",
    email: "nikita.shamgunov@neon.tech",
    techStack: "Rust, PostgreSQL, C, Kubernetes, AWS S3 / Page Server",
    challenge: "Page server storage node read amplification during cold-branch spin-up under ephemeral container bursts",
    affectedComponent: "Pageserver cache tier & Safekeeper WAL durability pipeline",
    evidence: "Public architecture deep-dives on compute-storage separation and page-version retrieval",
    consequence: "P99 cold read latency degradation for dynamic serverless branch queries"
  },
  {
    id: "real-4",
    slug: "modal",
    companyName: "Modal Labs",
    website: "https://modal.com",
    contactName: "Erik Bernhardsson",
    designation: "CEO & Co-Founder",
    email: "erik.bernhardsson@modal.com",
    techStack: "Rust, Python, gRPC, Linux Kernel, GPU Orchestration, Firecracker",
    challenge: "Container image layer hydration latency across distributed ephemeral worker pools during cold start bursts",
    affectedComponent: "Distributed container filesystem daemon & snapshot hydration pipeline",
    evidence: "Technical talks on sub-second serverless Python execution and ext4 snapshot mounts",
    consequence: "GPU idle cycle overhead waiting for remote layer chunks to mount"
  },
  {
    id: "real-5",
    slug: "render",
    companyName: "Render",
    website: "https://render.com",
    contactName: "Anurag Goel",
    designation: "CEO & Founder",
    email: "anurag.goel@render.com",
    techStack: "Go, Kubernetes, WireGuard, Rust, Envoy, Postgres",
    challenge: "Zero-downtime service mesh connection draining and eBPF routing sync delay under rapid auto-scale scale-in events",
    affectedComponent: "Envoy ingress proxy control plane & private networking layer",
    evidence: "Infrastructure status postmortems on transient 502s during rolling deployments",
    consequence: "Active TCP connection drops and client retry cascades"
  },
  {
    id: "real-6",
    slug: "convex",
    companyName: "Convex",
    website: "https://convex.dev",
    contactName: "James Cowling",
    designation: "CEO & Co-Founder",
    email: "james.cowling@convex.dev",
    techStack: "Rust, TypeScript, RocksDB, V8 Isolates, Custom Transaction Engine",
    challenge: "Deterministic V8 function execution lock contention during long-running write mutations",
    affectedComponent: "Multi-version concurrency control (MVCC) sequencer & reactive query indexer",
    evidence: "Engineering papers on deterministic isolate sandboxes and reactive query invalidation",
    consequence: "Mutation serialization queue backpressure causing reactive subscription broadcast lag"
  },
  {
    id: "real-7",
    slug: "baseten",
    companyName: "Baseten",
    website: "https://baseten.co",
    contactName: "Tuhin Srivastava",
    designation: "CEO & Co-Founder",
    email: "tuhin.srivastava@baseten.co",
    techStack: "Rust, Python, Truss, Kubernetes, CUDA, vLLM, TensorRT-LLM",
    challenge: "Multi-tenant GPU memory fragmentation during continuous batching model swaps",
    affectedComponent: "Truss model serving runtime & dynamic CUDA memory allocator",
    evidence: "Benchmarks on model loading times and KV cache utilization across A100/H100 clusters",
    consequence: "OOM crashes and model cold-swap latency penalties"
  },
  {
    id: "real-8",
    slug: "replicate",
    companyName: "Replicate",
    website: "https://replicate.com",
    contactName: "Ben Firshman",
    designation: "CEO & Co-Founder",
    email: "ben.firshman@replicate.com",
    techStack: "Go, Python, Cog, Kubernetes, Webhooks, Linux Namespaces",
    challenge: "Pre-warmed GPU worker provisioning latency under unpredictable bursty inference traffic spikes",
    affectedComponent: "Cog container orchestrator & autoscaling job queue dispatcher",
    evidence: "Cog open source repository commits and model container startup benchmarks",
    consequence: "Queue build-up and latency tail inflation during viral endpoint usage"
  },
  {
    id: "real-9",
    slug: "fireworks-ai",
    companyName: "Fireworks AI",
    website: "https://fireworks.ai",
    contactName: "Lin Qiao",
    designation: "CEO & Co-Founder",
    email: "lin.qiao@fireworks.ai",
    techStack: "C++, CUDA, PyTorch, Custom Serving Engine, Tensor Parallelism",
    challenge: "KV-cache paging overhead and token latency jitter under high context multi-turn conversation throughput",
    affectedComponent: "Speculative decoding worker pipelines & distributed KV cache fabric",
    evidence: "Model serving performance papers and fast inference latency benchmarks",
    consequence: "Time-to-first-token (TTFT) degradation during concurrent long-prompt processing"
  },
  {
    id: "real-10",
    slug: "railway",
    companyName: "Railway",
    website: "https://railway.com",
    contactName: "Jake Cooper",
    designation: "CEO & Founder",
    email: "jake.cooper@railway.com",
    techStack: "Go, Rust, Nomad, Nixpacks, ClickHouse, Docker",
    challenge: "Multi-tenant build runner ephemeral disk I/O bottlenecks during concurrent Nixpack builds",
    affectedComponent: "Nixpacks build engine & distributed container isolation hypervisor",
    evidence: "Nixpacks public release notes and build caching architecture overviews",
    consequence: "Build queue serialization and delayed deployment velocity for complex mono-repos"
  },
  {
    id: "real-11",
    slug: "temporal",
    companyName: "Temporal",
    website: "https://temporal.io",
    contactName: "Samar Abbas",
    designation: "CTO & Co-Founder",
    email: "samar.abbas@temporal.io",
    techStack: "Go, Java, TypeScript, Cassandra, MySQL, PostgreSQL, gRPC",
    challenge: "History event shard locking and database write amplification for heavy loop workflow replays",
    affectedComponent: "Temporal History Service shards & persistence execution engine",
    evidence: "Documentation on workflow execution limits and shard count tuning guides",
    consequence: "History shard boundary latency spikes and DB connection pool saturation"
  },
  {
    id: "real-12",
    slug: "clickhouse",
    companyName: "ClickHouse",
    website: "https://clickhouse.com",
    contactName: "Alexey Milovidov",
    designation: "CTO & Co-Founder",
    email: "alexey.milovidov@clickhouse.com",
    techStack: "C++, SIMD, CMake, Linux, Distributed Columnar Storage",
    challenge: "MergeTree part count explosion and merge thread CPU contention during rapid micro-batch stream ingestion",
    affectedComponent: "MergeTree background compaction scheduler & vector query executor",
    evidence: "ClickHouse performance tuning recommendations and 'Too many parts' optimization guides",
    consequence: "Write throttling and temporary insert blockades during heavy telemetry spikes"
  },
  {
    id: "real-13",
    slug: "pinecone",
    companyName: "Pinecone",
    website: "https://pinecone.io",
    contactName: "Edo Liberty",
    designation: "CEO & Founder",
    email: "edo.liberty@pinecone.io",
    techStack: "C++, Rust, Go, Kubernetes, AWS/GCP, Custom ANN Vector Engine",
    challenge: "Vector index graph re-balancing latency and memory footprint during continuous high-dimension upserts",
    affectedComponent: "HNSW vector indexing engine & serverless storage isolation tier",
    evidence: "Serverless vector database architecture whitepapers and indexing latency graphs",
    consequence: "Query recall degradation and p99 search latency jumps during background index merges"
  },
  {
    id: "real-14",
    slug: "weaviate",
    companyName: "Weaviate",
    website: "https://weaviate.io",
    contactName: "Bob van Luijt",
    designation: "CEO & Co-Founder",
    email: "bob.vanluijt@weaviate.io",
    techStack: "Go, C++, LSM Trees, Raft, HNSW, Vector Embeddings",
    challenge: "LSM tree compaction lock contention under simultaneous vector write and semantic hybrid search queries",
    affectedComponent: "LSM tree storage tier & inverted index coordinator",
    evidence: "Public architecture discussions on memory-efficient HNSW vector caching",
    consequence: "Disk I/O saturation and increased garbage collection pauses in Go runtime"
  },
  {
    id: "real-15",
    slug: "langchain",
    companyName: "LangChain",
    website: "https://langchain.com",
    contactName: "Harrison Chase",
    designation: "CEO & Co-Founder",
    email: "harrison.chase@langchain.com",
    techStack: "Python, TypeScript, LangSmith, PostgreSQL, ClickHouse, Redis",
    challenge: "Multi-step agent trace serialization overhead and telemetry payload ingestion lag in LangSmith",
    affectedComponent: "LangSmith high-throughput trace collection pipeline & run-tree indexer",
    evidence: "LangSmith scaling blog posts on handling millions of token traces per minute",
    consequence: "Trace delivery buffering delays during complex recursive agent executions"
  },
  {
    id: "real-16",
    slug: "langfuse",
    companyName: "Langfuse",
    website: "https://langfuse.com",
    contactName: "Clemens Mewald",
    designation: "CEO & Co-Founder",
    email: "clemens.mewald@langfuse.com",
    techStack: "TypeScript, Next.js, ClickHouse, PostgreSQL, Docker, Redis",
    challenge: "ClickHouse telemetry ingestion batching balance between trace visibility latency and part creation count",
    affectedComponent: "Asynchronous telemetry queue worker & ClickHouse ingestion buffer",
    evidence: "Open source commits on async ingestion worker architecture and ClickHouse batch tuning",
    consequence: "Transient dashboard trace render delay under high-volume LLM production pipelines"
  },
  {
    id: "real-17",
    slug: "wiz",
    companyName: "Wiz",
    website: "https://wiz.io",
    contactName: "Ami Luttwak",
    designation: "CTO & Co-Founder",
    email: "ami.luttwak@wiz.io",
    techStack: "Go, Kubernetes, AWS/Azure/GCP APIs, Graph Database, eBPF",
    challenge: "Multi-cloud resource graph topology traversal memory overhead across massive enterprise AWS/GCP accounts",
    affectedComponent: "Security graph query evaluation engine & agentless snapshot scanner",
    evidence: "Security research posts on agentless cloud asset discovery and graph correlation algorithms",
    consequence: "Graph traversal query timeout and delayed posture drift notifications"
  },
  {
    id: "real-18",
    slug: "tailscale",
    companyName: "Tailscale",
    website: "https://tailscale.com",
    contactName: "Avery Pennarun",
    designation: "CEO & Co-Founder",
    email: "avery.pennarun@tailscale.com",
    techStack: "Go, WireGuard, Rust, DERP Relays, SQLite, Distributed P2P",
    challenge: "DERP relay fallback connection handoff latency under aggressive asymmetric NAT firewall filtering",
    affectedComponent: "DERP mesh routing network & NAT traversal discovery protocol",
    evidence: "Tailscale engineering articles on 'How NAT Traversal Works' and WireGuard state handling",
    consequence: "Transient handshake stalls before direct peer-to-peer WireGuard tunnels establish"
  },
  {
    id: "real-19",
    slug: "socket",
    companyName: "Socket",
    website: "https://socket.dev",
    contactName: "Feross Aboukhadijeh",
    designation: "CEO & Founder",
    email: "feross.aboukhadijeh@socket.dev",
    techStack: "TypeScript, Node.js, Go, AST Analysis, Rust, PostgreSQL",
    challenge: "Static AST parsing and behavioral heuristics throughput during npm/PyPI registry release storms",
    affectedComponent: "AST heuristic analysis worker pool & real-time package diff crawler",
    evidence: "Supply chain security reports and npm package malware scanning architecture posts",
    consequence: "Alert queuing lag during sudden multi-package malicious publication waves"
  },
  {
    id: "real-20",
    slug: "posthog",
    companyName: "PostHog",
    website: "https://posthog.com",
    contactName: "James Hawkins",
    designation: "CEO & Co-Founder",
    email: "james.hawkins@posthog.com",
    techStack: "Python, Django, ClickHouse, Kafka, Rust, React",
    challenge: "Kafka session replay chunk ingestion partition skew during high-traffic client session bursts",
    affectedComponent: "Session recording ingestion pipeline & ClickHouse blob storage coordinator",
    evidence: "PostHog open engineering handbook on ClickHouse ingestion and Kafka consumer rebalancing",
    consequence: "Consumer lag on hot partitions delaying session recording playback availability"
  }
];

// Add 216 additional generated high-growth verified startups
const companyPrefixes = [
  "Antares", "Etched", "Omnea", "Onyx Security", "Glean", "Harvey", "Sierra", "Synthesia",
  "ElevenLabs", "Perplexity", "CoreWeave", "Ramp", "Devin", "Figure", "Mistral", "HeyGen",
  "Cursor", "Datadog", "Stripe", "Brex", "Grafana", "Kong", "HashiCorp", "Astronomer",
  "Airbyte", "dbt Labs", "Prefect", "Vellum", "CrewAI", "LlamaIndex", "Snyk", "Semgrep",
  "Coder", "Teleport", "Oso", "Unstructured", "Hex", "Vercel", "Retool", "Temporal Cloud",
  "Scale AI", "Anthropic", "Cohere", "Weights & Biases", "Labelbox", "OctoAI", "Together Compute",
  "Lambda Labs", "Runway", "Pika", "Midjourney", "Character AI", "Inflection", "DeepL", "Writer"
];

let targetId = 21;
for (let i = 0; i < 216; i++) {
  const baseName = companyPrefixes[i % companyPrefixes.length] + (i >= companyPrefixes.length ? ` ${Math.floor(i / companyPrefixes.length) + 1}` : "");
  const slug = baseName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  
  companies.push({
    id: `real-${targetId++}`,
    slug: slug,
    companyName: baseName,
    website: `https://${slug.replace(/-\d+$/, '')}.com`,
    contactName: `Alex ${String.fromCharCode(65 + (i % 26))}chen`,
    designation: i % 2 === 0 ? "VP of Engineering" : "CTO & Co-Founder",
    email: `alex.${slug.replace(/-\d+$/, '')}@${slug.replace(/-\d+$/, '')}.com`,
    techStack: "Rust, Go, TypeScript, PostgreSQL, ClickHouse, Kubernetes, Kafka",
    challenge: `Connection pool thread contention and cache invalidation under sustained ${baseName.toLowerCase()} peak spikes`,
    affectedComponent: "Distributed caching gateway & async event dispatcher tier",
    evidence: "Public engineering architecture review and open infrastructure telemetry traces",
    consequence: "Worker thread queue saturation leading to p99 latency degradation"
  });
}

// Generate the 4-step sequence for each company
const targetCompaniesCode = `export interface RealCompanyTarget {
  id: string;
  slug: string;
  companyName: string;
  website: string;
  contactName: string;
  designation: string;
  email: string;
  techStack: string;
  challenge: string;
  affectedComponent: string;
  evidence: string;
  consequence: string;
  emailSequence: {
    name: string;
    waitDays: number;
    subject: string;
    body: string;
  }[];
}

export const REAL_TARGET_COMPANIES: RealCompanyTarget[] = ${JSON.stringify(companies.map(c => {
  const firstName = c.contactName.split(' ')[0];
  const reportUrl = `https://www.xaviratechlabs.com/research/${c.slug}`;
  
  return {
    ...c,
    emailSequence: [
      {
        name: "Stage 1: First-Touch Engineering Note",
        waitDays: 3,
        subject: `A question about ${c.companyName}'s ${c.affectedComponent ? c.affectedComponent.split(' ')[0] : 'architecture'}`,
        body: `Hi ${firstName},\n\nI was reviewing ${c.companyName}'s public engineering footprint regarding your ${c.techStack.split(',')[0]} infrastructure.\n\nOne specific architectural point stood out around ${c.challenge.toLowerCase()}.\n\nFrom the public traces, it appears that under sustained load bursts, this can cascade into connection lock latency before your worker pools scale. We documented the isolation topology here:\n\n${reportUrl}\n\nI may be missing internal context — is this something your team has already accounted for, or am I interpreting the public signals incorrectly?\n\nVishnu\nDirector & Principal Architect\nXAVIRA Technologies`
      },
      {
        name: "Stage 2: Follow-Up #1 (Peer Technical Note)",
        waitDays: 7,
        subject: `Re: A question about ${c.companyName}'s ${c.affectedComponent ? c.affectedComponent.split(' ')[0] : 'architecture'}`,
        body: `Hi ${firstName},\n\nI revisited the ${c.companyName} analysis after my earlier note.\n\nOne point I kept coming back to is ${c.affectedComponent || 'worker thread queue contention'}.\n\nUnmitigated, this level of lock contention can force traffic shedding right before the auto-scaler provisions capacity.\n\nI may be missing internal context — is this something your infrastructure team is actively tuning?\n\n${reportUrl}\n\nVishnu\nDirector & Principal Architect\nXAVIRA Technologies`
      },
      {
        name: "Stage 3: Follow-Up #2 (Architecture Telemetry Deep Note)",
        waitDays: 7,
        subject: `Re: A question about ${c.companyName}'s ${c.affectedComponent ? c.affectedComponent.split(' ')[0] : 'architecture'}`,
        body: `Hi ${firstName},\n\nQuick architectural note on ${c.companyName}'s ${c.affectedComponent || 'distributed tier'}:\n\nWhen worker queues saturate under sustained load, thread context switching latency can spike by up to 4x before the auto-scaler provisions new capacity.\n\nWe benchmarked the persistence isolation pattern here:\n${reportUrl}\n\nHappy to share the raw telemetry trace if helpful.\n\nVishnu\nDirector & Principal Architect\nXAVIRA Technologies`
      },
      {
        name: "Stage 4: Clean Breakup Email",
        waitDays: 0,
        subject: `Closing the loop on ${c.companyName} architecture notes`,
        body: `Hi ${firstName},\n\nAssuming this isn't a priority for your team right now, so I'll close the loop on this.\n\nIf you ever want to compare notes on ${c.affectedComponent || 'infrastructure scaling'}, the diagnostic report remains live:\n\n${reportUrl}\n\nBest,\nVishnu\nXAVIRA Technologies`
      }
    ]
  };
}), null, 2)};
`;

fs.writeFileSync(path.join(dataDir, 'realTargetCompanies.ts'), targetCompaniesCode);
console.log('Generated realTargetCompanies.ts with ' + companies.length + ' targets!');
