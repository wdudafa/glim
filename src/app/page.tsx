const flights: string[][] = [["AIBD","Miami"], ["SDTS", "London"], ["STET", "Madagascar"]];

export default function Home() {

  return (
    <main className="flex min-h-screen w-full flex-row items-center justify-between">
      <div className="flex border-5 border-red-500 w-1/2 items-center min-h-screen justify-center">
        <ul className="w-full">
          {flights.map(flight => (
            <li key={flight[0]} className="flex border-5 border-green-600 justify-center items-center w-full">{flight[0]} {flight[1]}</li>
            
          ))}
        </ul>
      </div>

      <div className="flex border-5 border-red-500 p-50 w-1/2 items-center min-h-screen justify-center">
        asdasd
      </div>
    </main>
  );
}
