"use server";
import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Timer from "@/components/timer";
import { getCurrentObject } from "@/hooks/itemAPI";
import Link from "next/link";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;
  const currentObject = await getCurrentObject();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black p-6 font-mono selection:bg-yellow-400 selection:text-black">
      <div className="flex w-full max-w-2xl flex-col items-center space-y-8 text-center">
        
        <div className="space-y-2">
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-7xl font-black tracking-tighter text-transparent sm:text-8xl">
            Glim
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Find it! Snap it!
          </p>
        </div>

        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-sm">
          {user ? (
            <div className="flex flex-col items-center space-y-8">
              <div className="space-y-4">
                <Timer
                  switchesAt={currentObject.switchesAt}
                  camera={false}
                />
                <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                  Target:{" "}
                  <span className="text-yellow-400">{currentObject.item}</span>
                </h2>
              </div>

              <div className="grid w-full gap-4">
                <Link
                  href="/camera"
                  className="w-full rounded-xl border-2 border-purple-800 py-4 text-xl font-black uppercase tracking-tighter text-white transition-all hover:bg-purple-800 hover:shadow-[0_0_20px_rgba(133,24,155,0.3)] active:scale-95 text-center"
                >
                  Take a picture
                </Link>

                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/profile"
                    className="flex justify-center rounded-xl border border-zinc-700 py-3 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="flex justify-center rounded-xl border border-zinc-700 py-3 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    Leaderboard
                  </Link>
                </div>

                <div className="pt-4 border-t border-zinc-800 w-full">
                  <LogoutButton />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-10">
              <p className="text-zinc-400 text-sm uppercase tracking-wider">
                Login to get going!
              </p>
              <div className="inline-block scale-125">
                <LoginButton />
              </div>
            </div>
          )}
        </div>

        {user ? (
          <div className="text-[15px] uppercase text-white">
            Logged in as: {user ? user.name : "External Node"}
          </div>
        ) : null}
      </div>
    </main>
  );
}