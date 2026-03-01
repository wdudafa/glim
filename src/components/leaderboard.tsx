"use client";

import { useEffect, useState } from "react";
import { supabasePublic } from "@/lib/DatabaseData";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Score {
  name: string;
  total_seconds: number;
}

async function getLeaderboardData(
  type: "global" | "personal",
  userEmail?: string,
): Promise<Score[]> {
  if (type === "personal") {
    if (!userEmail) return [];

    const { data, error } = await supabasePublic
      .from("users_times")
      .select("name, total_seconds")
      .eq("user_email", userEmail)
      .order("total_seconds", { ascending: true });

    if (error) {
      console.error("Error fetching personal leaderboard:", error);
      return [];
    }

    return data as Score[];
  }

  const { data, error } = await supabasePublic
    .rpc("get_leaderboard")
    .order("total_seconds", { ascending: true });

  if (error) {
    console.error("Error fetching global leaderboard:", error);
    return [];
  }

  return data as Score[];
}

export default function TopScore() {
  const { user, isLoading } = useUser();

  const [scores, setScores] = useState<Score[]>([]);
  const [personalScores, setPersonalScores] = useState<Score[]>([]);
  const [showPersonal, setShowPersonal] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    async function fetchData() {
      const global = await getLeaderboardData("global");
      setScores(global);

      if (user?.email) {
        const personal = await getLeaderboardData("personal", user.email);
        setPersonalScores(personal);
      }
    }

    fetchData();
  }, [isLoading, user]);

  const activeScores = showPersonal ? personalScores : scores;

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-zinc-950 p-10 font-mono text-yellow-400">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          {showPersonal ? "My Scores" : "Leaderboard"}
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => setShowPersonal(false)}
            className={`px-4 py-2 rounded ${
              !showPersonal
                ? "bg-yellow-400 text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            Global
          </button>

          <button
            onClick={() => setShowPersonal(true)}
            className={`px-4 py-2 rounded ${
              showPersonal
                ? "bg-yellow-400 text-black"
                : "bg-zinc-800 text-white"
            }`}
          >
            Personal
          </button>
        </div>

        <Link href="/">
          <span className="text-white hover:text-yellow-400 mt-4 block">
            Back to Home
          </span>
        </Link>
      </div>

      <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl mt-20">
        <div className="flex w-full border-b border-zinc-800 bg-zinc-800/50 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <div className="w-1/3 px-6">Rank</div>
          <div className="w-1/3 px-6">Name</div>
          <div className="w-1/3 px-6 text-right sm:text-left">High Score</div>
        </div>

        <ul className="w-full divide-y divide-zinc-800">
          {activeScores.map((player, index) => (
            <li
              key={`${player.name}-${index}`}
              className="group flex items-center py-4 transition-colors hover:bg-zinc-800/30"
            >
              <div className="w-1/3 px-6 font-bold text-white group-hover:text-yellow-400">
                #{(index + 1).toString().padStart(2, "0")}
              </div>

              <div className="w-1/3 px-6 uppercase truncate">{player.name}</div>

              <div className="w-1/3 px-6 text-zinc-300 group-hover:text-white">
                {player.total_seconds}
                <span className="text-[20px] text-zinc-500 ml-1">s</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
