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
    <main className="flex min-h-screen w-full flex-row items-center justify-between">
      <div className="flex-col border-5 border-red-500 w-1/2 items-center min-h-screen justify-center">
        <div className="flex border-5 border-red-600 justify-center items-center w-full">
          <div className="flex border-5 border-red-600 justify-center items-center w-full">
            Flignt No
          </div>
          <div className="flex border-5 border-red-600 justify-center items-center w-full">
            Destination
          </div>
          <div className="flex border-5 border-red-600 justify-center items-center w-full">
            Airline
          </div>
          <div className="flex border-5 border-red-600 justify-center items-center w-full">
            ETA
          </div>
        </div>
        <ul className="w-full">
          {GatwickFlightInformation.map((flight) => (
            <li
              key={flight.id}
              className="flex border-5 border-green-600 justify-center items-center w-full"
            >
              <div className="flex w-1/4 items-center justify-center border-5 border-green-600">
                {flight.id}
              </div>
              <div className="flex w-1/4 items-center justify-center border-5 border-green-600">
                {flight.destination}
              </div>
              <div className="flex w-1/4 items-center justify-center border-5 border-green-600">
                {flight.airline}
              </div>
              <div className="flex w-1/4 items-center justify-center border-5 border-green-600">
                {flight.eta}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex border-5 border-red-500 w-1/2 items-center min-h-screen justify-center">
        <ul className="w-full">
          {GatwickFlightInformation.map((flight) => (
            <li
              key={flight.id}
              className="flex border-5 border-green-600 justify-center items-center w-full"
            >
              {flight.id} {flight.destination}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
