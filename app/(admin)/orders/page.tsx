import { AvatarDemo } from "../_components/Avatar";
import { DataTableDemo } from "../_components/Tables";

const Orders = () => {
  return (
    <div className="bg-[#f4f4f5] w-[90.8vw] px-[40px]">
      <div className="w-[80vw] flex justify-end my-[24px]">
        <AvatarDemo />
      </div>
      <DataTableDemo />
    </div>
  );
};
export default Orders;
