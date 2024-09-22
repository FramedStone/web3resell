"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const CT_EXCHANGE_RATE = 0.1; // Assume 1 CT = 0.1 RM

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  priceRM: z
    .number()
    .nonnegative({ message: "Price must be a non-negative number." })
    .multipleOf(0.01, { message: "Price must have at most 2 decimal places." }),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be a positive integer." }),
  shippingAddress: z
    .string()
    .min(10, { message: "Please enter a valid shipping address." }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `Max image size is 5MB.`),
  eCertificate: z.instanceof(File).optional(),
  eWarranty: z.instanceof(File).optional(),
  eInsurance: z.instanceof(File).optional(),
  isVerified: z.boolean().default(false),
});

export default function ListProductForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ctPrice, setCtPrice] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: 1,
      shippingAddress: "",
      isVerified: false,
    },
  });

  const watchPriceRM = form.watch("priceRM");

  useEffect(() => {
    if (watchPriceRM) {
      setCtPrice(Number((watchPriceRM / CT_EXCHANGE_RATE).toFixed(2)));
    } else {
      setCtPrice(null);
    }
  }, [watchPriceRM]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
    alert("Product listed successfully!");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-900 text-white">
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        {...field}
                        className="bg-gray-800 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                        className="bg-gray-800 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceRM"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (RM)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price in RM"
                        {...field}
                        min="0"
                        step="0.01"
                        onChange={(e) => {
                          const value = e.target.value
                            ? parseFloat(parseFloat(e.target.value).toFixed(2))
                            : null;
                          field.onChange(value);
                          if (value !== null) {
                            setCtPrice(
                              Number((value / CT_EXCHANGE_RATE).toFixed(2))
                            );
                          } else {
                            setCtPrice(null);
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value
                            ? parseFloat(parseFloat(e.target.value).toFixed(2))
                            : null;
                          if (value !== null) {
                            e.target.value = value.toFixed(2);
                            field.onChange(value);
                            setCtPrice(
                              Number((value / CT_EXCHANGE_RATE).toFixed(2))
                            );
                          }
                        }}
                        className="bg-gray-800 text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      {ctPrice !== null
                        ? `Equivalent CT price: ${ctPrice} CT`
                        : "Enter a price to see CT equivalent"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity in Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        {...field}
                        min="1"
                        step="1"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        className="bg-gray-800 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter full shipping address (e.g., Street, City, State/Province, Postal Code, Country)"
                        {...field}
                        className="bg-gray-800 text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Please provide the full address from where the product
                      will be shipped.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                        className="bg-gray-800 text-white"
                      />
                    </FormControl>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="mt-2 max-w-xs rounded"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Verified Product</FormLabel>
                      <FormDescription className="text-gray-400">
                        Check this if you want to list as a verified product
                        (requires additional documents).
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {form.watch("isVerified") && (
                <>
                  <FormField
                    control={form.control}
                    name="eCertificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Certificate</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            className="bg-gray-800 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eWarranty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Warranty</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            className="bg-gray-800 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eInsurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-Insurance</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            className="bg-gray-800 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                List Product
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
