import { supabasePublic } from "@/lib/DatabaseData";
import Link from "next/link";

interface Score {
  name: string;
  total_seconds: number;
}

async function getLeaderboardData(): Promise<Score[]> {
  const { data, error } = await supabasePublic
    .from("users_times")
    .select("name, total_seconds")
    .order("total_seconds", { ascending: true })

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }

  return data as Score[];
}

export default async function TopScore() {
  const scores = await getLeaderboardData();

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-zinc-950 p-10 font-mono text-yellow-400">
        <div className="flex flex-row"> <Link href="/"><span className="text-white hover:text-yellow-400">← Back to Home</span></Link> <h1 className="text-4xl font-bold text-white mb-6">Leaderboard</h1>
        </div>
       
      <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl mt-40">
        
        <div className="flex w-full border-b border-zinc-800 bg-zinc-800/50 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <div className="w-1/3 px-6">Rank</div>
          <div className="w-1/3 px-6">Name</div>
          <div className="w-1/3 px-6 text-right sm:text-left">High Score</div>
        </div>

        <ul className="w-full divide-y divide-zinc-800">
          {scores.map((player, index) => (
            <li
              key={`${player.name}-${index}`}
              className="group flex items-center py-4 transition-colors hover:bg-zinc-800/30"
            >
              <div className="w-1/3 px-6 font-bold text-white group-hover:text-yellow-400">
                #{(index + 1).toString().padStart(2)}
              </div>
              
              <div className="w-1/3 px-6 uppercase truncate">
                {player.name}
              </div>
              
              <div className="w-1/3 px-6 text-zinc-300 group-hover:text-white">
                {player.total_seconds} <span className="text-[20px] text-zinc-500">s</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}