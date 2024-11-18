"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { useCart } from "@/store/cart-context";
import { useRouter } from "next/navigation";
const schema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  phone: z
    .string({
      required_error: "رقم الجوال مطلوب",
    })
    .min(6, "يجب ان يكون 6 ارقام على الأقل"),
  city: z.string().min(1, "المدينة مطلوبة"),
  addressDetails: z.string().min(1, "تفاصيل العنوان مطلوبة"),
  notes: z.string().optional(),
});

const CheckoutForm = ({ handleClose }: { handleClose: () => void }) => {
  const [, saveUser] = useLocalStorage("user");
  const [, saveOrder] = useLocalStorage("order");

  const { items, totalAmount, clearCart } = useCart();

  const { push } = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      addressDetails: "",
      notes: "",
    },
  });
  const onSubmit = (values: z.infer<typeof schema>) => {
    saveUser(JSON.stringify(values));
    saveOrder(
      JSON.stringify({
        total: totalAmount,
        orderItems: items,
      })
    );
    clearCart();
    handleClose();
    push("/order");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الجوال</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدينة</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تفاصيل العنوان</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>ملاحظات إضافية</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-2">
          تأكيد
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
