import React from "react";
import Image from "next/image";

export const Banner = () => {
  return (
    <div>
      <Image
        src={
          "https://res.cloudinary.com/dagcnqvlx/image/upload/v1740057806/nbyod7t7vzskusruqscc.png"
        }
        alt={""}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};
