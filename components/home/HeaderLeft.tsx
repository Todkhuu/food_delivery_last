import { NomNomLogo } from "../icons";

export const HeaderLeft = () => {
  return (
    <div className="flex gap-3 items-center">
      <NomNomLogo width={46} height={37} />
      <div>
        <h2 className="text-[#fafafa] text-[20px] font-semibold">
          Nom<span className="text-red-500">Nom</span>
        </h2>
        <p className="text-[#f4f4f5] text-[12px]">Swift delivery</p>
      </div>
    </div>
  );
};
