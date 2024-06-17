"use server";

type MikrotikProps = {
  username: string;
  password: string;
  ipAddress: string;
  endpoint: string;
};

export const fetchMikrotik = async (mikrotik: MikrotikProps) => {
  const response = await fetch(
    `http://${mikrotik.ipAddress}/rest/${mikrotik.endpoint}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${mikrotik.username}:${mikrotik.password}`
        )}`,
      },
      next: { revalidate: 10 },
    }
  );
  const data = await response.json();
  return data;
};
