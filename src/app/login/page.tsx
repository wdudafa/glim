import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="p-10 flex items-center justify-center ">
        <div>
          <Image
            src="/logo-text.svg"
            alt="Logo"
            width={600 * 0.7}
            height={300 * 0.7}
          />
        </div>
      </div>
      <div className="flex items-center justify-center pb-40">
        <div
          className="rounded-3xl border-5 "
          style={{
            backgroundColor: "rgb(26, 67, 132)",
            borderColor: "rgb(67, 151, 152)",
          }}
        >
          <form className="p-10 flex flex-col items-center justify-center gap-4 px-20">
            <input type="text" placeholder="Username" className="text-xl" />
            <input type="password" placeholder="Password" className="text-xl" />
            <button type="submit" className="text-xl">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
