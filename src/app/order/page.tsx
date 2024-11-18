"use client";

import OrderItems from "@/components/order/order-items";
import { OrderModel } from "@/types/order";
import { UserModel } from "@/types/user";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import useLocalStorage from "react-use/lib/useLocalStorage";

export default function page() {
  const [savedOrder] = useLocalStorage<any>("order");
  const [savedUser] = useLocalStorage<any>("user");

  if (!savedUser || !savedOrder) redirect("/");

  const order: OrderModel = JSON.parse(savedOrder);
  const user: UserModel = JSON.parse(savedUser);

  return (
    <section className="py-16">
      <div className="container space-y-8">
        <div className="flex justify-center flex-col text-center">
          <CheckCircle2 className="text-green-500 w-24 h-24 mx-auto" />
          <h2 className="text-primary text-3xl font-bold">
            تم إكمال طلبك بنجاح
          </h2>
        </div>
        <div className="grid grid-cols-8 gap-10">
          <div className="space-y-2 col-span-1 md:col-span-5">
            <h2 className="text-xl text-primary">عناصر الطلب</h2>
            <OrderItems order={order} />
          </div>
          <div className="col-span-8 md:col-span-3 space-y-3">
            <h2 className="text-xl text-primary">معلومات التوصيل</h2>
            <div className="bg-[#f5f5f5] p-4 rounded-lg space-y-3">
              <div>
                <span className="text-[#777] ">الاسم: </span>
                <span className="font-bold">{user.name}</span>
              </div>
              <div>
                <span className="text-[#777] ">رقم الجوال: </span>
                <span className="font-bold">{user.phone}</span>
              </div>
              <div>
                <span className="text-[#777] ">المدينة: </span>
                <span className="font-bold">{user.city}</span>
              </div>
              <div>
                <span className="text-[#777] ">العنوان: </span>
                <span className="font-bold">{user.addressDetails}</span>
              </div>
              <div>
                <span className="text-[#777] ">ملاحظات إضافية: </span>
                <span className="font-bold">
                  {user.notes ? user.notes : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
