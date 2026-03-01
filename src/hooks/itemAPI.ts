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

export default async function Page() {
  const data = await getCurrentObject();

  return data;
}
