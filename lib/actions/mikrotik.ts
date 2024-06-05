"use server";

type MikrotikProps = {
  username: string;
  password: string;
  ipAddress: string;
};

export const fetchMikrotikSystemResources = async (mikrotik: MikrotikProps) => {
  const response = await fetch(
    `http://${mikrotik.ipAddress}/rest/system/resource`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${mikrotik.username}:${mikrotik.password}`
        )}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};
