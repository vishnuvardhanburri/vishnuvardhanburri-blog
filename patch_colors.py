with open('src/app/achievements/page.tsx', 'r') as f:
    content = f.read()

old_config = """        const categoryConfig: Record<string, { gradient: string; icon: typeof Trophy }> = {
            certification: { gradient: 'from-zinc-700 via-zinc-600 to-zinc-500', icon: Award },
            award: { gradient: 'from-neutral-800 via-neutral-700 to-neutral-600', icon: Trophy },
            recognition: { gradient: 'from-stone-700 via-stone-600 to-stone-500', icon: Medal },
            publication: { gradient: 'from-slate-700 via-slate-600 to-slate-500', icon: Award },
            competition: { gradient: 'from-gray-700 via-gray-600 to-gray-500', icon: Target }
        };"""

new_config = """        const categoryConfig: Record<string, { gradient: string; icon: typeof Trophy }> = {
            certification: { gradient: 'from-indigo-600 via-blue-600 to-cyan-500', icon: Award },
            award: { gradient: 'from-purple-600 via-fuchsia-600 to-pink-500', icon: Trophy },
            recognition: { gradient: 'from-orange-600 via-amber-500 to-yellow-500', icon: Medal },
            publication: { gradient: 'from-emerald-600 via-teal-500 to-cyan-500', icon: Award },
            competition: { gradient: 'from-rose-600 via-red-500 to-orange-500', icon: Target }
        };"""

content = content.replace(old_config, new_config)

with open('src/app/achievements/page.tsx', 'w') as f:
    f.write(content)
