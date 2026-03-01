export interface CurrentObjectResponse {
  switchesAt: string | number | Date;
  createdAt: string | number | Date;
  item: string;
  rotationMinutes: number;
}

export async function getCurrentObject(): Promise<CurrentObjectResponse> {
  const response = await fetch(
    "https://lwszddermdgmlwofpwbo.supabase.co/functions/v1/get-current-object",
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from Supabase");
  }

  return response.json();
}

export function calculateSecondsRemaining(target: string | number | Date): number {
  const now = new Date().getTime();
  const endTime = new Date(target).getTime();
  const diff = Math.floor((endTime - now) / 1000);
  return diff > 0 ? diff : 0;
}