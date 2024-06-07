import React from "react";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 10; // revalidate at most every hour

const layout = async ({ children }: Props) => {
  return <div className="">{children}</div>;
};

export default layout;
