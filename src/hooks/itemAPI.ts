export interface CurrentObjectResponse {
  switchesAt: string | number | Date;
  createdAt: string | number | Date;
  item: string;
  rotationMinutes: number;
}

export async function getCurrentObject(): Promise<CurrentObjectResponse> {
  const itemList = await fetch(
    "https://lwszddermdgmlwofpwbo.supabase.co/functions/v1/get-current-object",
  );

  return itemList.json();
}
//Time Remaining = End Time - Current Clock Time
export function calculateTimeLeft(
  switchesAt: string | number | Date,
): number {
  const now = new Date();
  const switchesTime = new Date(switchesAt);


  const timeRemaining = switchesTime.getTime() - now.getTime();

  return timeRemaining > 0 ? timeRemaining : 0;
}

export default async function Page() {
  const data = await getCurrentObject();
  return data;
}
