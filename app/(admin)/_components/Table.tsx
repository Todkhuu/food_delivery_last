import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Dialogs } from "../orders/_components/Dialog";

const orders = [
  {
    customer: "Test@gamil.com",
    Food: "foods",
    Date: "2024/12/20",
    Total: "$26.97",
    address: "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen...",
    state: ["Delivered", "Pending", "Cancelled"],
  },
  {
    customer: "Test@gamil.com",
    Food: "foods",
    Date: "2024/12/20",
    Total: "$26.97",
    address: "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen...",
    state: ["Delivered", "Pending", "Cancelled"],
  },
];

export const Tables = () => {
  return (
    <div className="w-[80vw] h-auto bg-white border-[1px] rounded-lg">
      <div className="flex justify-between p-4 border-b-[1px]">
        <div>
          <h2 className="text-[20px] font-semibold">Orders</h2>
          <p className="text-[12px] font-medium text-[#71717a]">
            {orders.length} items
          </p>
        </div>
        <div className="flex gap-3">
          <DatePickerWithRange />
          <Dialogs />
        </div>
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[52px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[56px]">№</TableHead>
            <TableHead className="w-[213px]">Customer</TableHead>
            <TableHead className="w-[160px]">Food</TableHead>
            <TableHead className="w-[160px]">Date</TableHead>
            <TableHead className="w-[160px]">Total</TableHead>
            <TableHead className="w-[213px]">Delivery Address</TableHead>
            <TableHead className="w-[160px]">Delivery state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell className="w-[52px]">
                <Checkbox />
              </TableCell>
              <TableCell>1</TableCell>
              <TableCell className="font-medium">{order.customer}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger> {order.Food}</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{order.Date}</TableCell>
              <TableCell>{order.Total}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger className="w-[94px] rounded-full text-[12px] font-semibold">
                    <SelectValue placeholder="Delivered" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {order.state?.map((state, index) => (
                        <SelectItem key={index} value={`${state}`}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TableCell colSpan={3}>Total</TableCell> */}
            {/* <TableCell className="text-right">$2,500.00</TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
