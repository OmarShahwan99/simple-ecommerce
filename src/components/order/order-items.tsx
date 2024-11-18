import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderModel } from "@/types/order";
import CustomImage from "../ui/custom-image";

const OrderItems = ({ order }: { order: OrderModel }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>المنتج</TableHead>
          <TableHead>الاسم</TableHead>
          <TableHead>السعر</TableHead>
          <TableHead>الكمية</TableHead>
          <TableHead>الإجمالي</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.orderItems.map((item) => (
          <TableRow key={item.product.id}>
            <TableCell>
              <CustomImage
                width={60}
                height={60}
                src={item.product.images[0]}
                alt={item.product.title}
              />
            </TableCell>
            <TableCell>{item.product.title}</TableCell>
            <TableCell>${item.product.price}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>${item.quantity * item.product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-xl">
            الإجمالي
          </TableCell>
          <TableCell className="font-[600] text-xl">${order.total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default OrderItems;
