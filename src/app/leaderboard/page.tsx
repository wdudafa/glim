import AuthWrapper from "@/components/AuthWrapper";


/*
const flights: string[][] = [
  ["AIBD", "Miami"],
  ["SDTS", "London"],
  ["STET", "Madagascar"],
];

export type FlightInformation = {
  id: string;
  destination: string;
  airline: string;
  eta: string;
};

const GatwickFlightInformation: FlightInformation[] = [
  {
    id: "SDTS",
    destination: "London",
    airline: "British Airways",
    eta: "14:30",
  },
  {
    id: "STET",
    destination: "Madagascar",
    airline: "Air Madagascar",
    eta: "16:45",
  },
  {
    id: "AIBD",
    destination: "Miami",
    airline: "American Airlines",
    eta: "18:00",
  },
];

export default function Home() {
  return (
    <AuthWrapper>
<main className="flex min-h-screen w-full flex-col items-center bg-zinc-950 p-10 font-mono text-yellow-400">
  <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl mt-40">
    
    <div className="flex w-full border-b border-zinc-800 bg-zinc-800/50 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
      <div className="w-1/3 px-6">Rank</div>
      <div className="w-1/3 px-6">Name</div>
      <div className="w-1/3 px-6">Best Effort</div>
    </div>

    <ul className="w-full divide-y divide-zinc-800">
      {GatwickFlightInformation.map((flight) => (
        <li
          key={flight.id}
          className="group flex items-center py-4 transition-colors hover:bg-zinc-800/30"
        >
          <div className="w-1/3 px-6 font-bold text-white group-hover:text-yellow-400">
            {flight.id}
          </div>
          <div className="w-1/3 px-6 uppercase">
            {flight.destination}
          </div>
          <div className="w-1/3 px-6 text-zinc-300">
            {flight.airline}
          </div>
        </li>
      ))}
    </ul>
  </div>
</main>
    </AuthWrapper>
  );}
*/

// components/Dashboard.tsx (Server Component)
import LeaderboardList from "@/components/leaderboard";
import TopScoreDisplay from "@/components/leaderboard";

export default async function Dashboard() {
  // Call the function directly here

  return (
    <section>
      <TopScoreDisplay></TopScoreDisplay>
    </section>
  );
}