// components/TopScore.tsx
import { supabasePublic } from "@/lib/DatabaseData";

async function getGlobalTopScore() {
  const { data, error } = await supabasePublic
    .from("users_times")
    .select("total_seconds")
    .order("total_seconds", { ascending: false })
    .limit(1)
    .single(); // This tells Supabase to return an object, not an array

  if (error) {
    console.error("Error:", error);
    return 0;
  }

  return data.total_seconds;
}

export default async function TopScoreDisplay() {
  const topScore = await getGlobalTopScore();

  return (
    <div className="p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
      <p className="text-sm uppercase font-bold text-yellow-700">World Record</p>
      <span className="text-3xl font-black text-yellow-900">{topScore}s</span>
    </div>
  );
}