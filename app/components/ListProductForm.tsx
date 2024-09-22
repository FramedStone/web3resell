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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const MANTA_EXCHANGE_RATE = 0.1; // Assume 1 MANTA = 0.1 RM

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Product name must be at least 2 characters." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." }),
    priceType: z.enum(["RM", "MANTA", "BOTH"]),
    priceRM: z
      .number()
      .nonnegative({ message: "Price must be a non-negative number." })
      .optional(),
    priceManta: z
      .number()
      .nonnegative({ message: "Price must be a non-negative number." })
      .optional(),
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
  })
  .refine(
    (data) => {
      if (data.priceType === "RM" || data.priceType === "BOTH") {
        return data.priceRM !== undefined && data.priceRM > 0;
      }
      if (data.priceType === "MANTA" || data.priceType === "BOTH") {
        return data.priceManta !== undefined && data.priceManta > 0;
      }
      return true;
    },
    {
      message: "Please enter a valid price for the selected currency type(s)",
      path: ["priceRM", "priceManta"],
    }
  );

export default function ListProductForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      priceType: "RM",
      priceRM: 0,
      priceManta: 0,
      quantity: 1,
      shippingAddress: "",
      isVerified: false,
    },
  });

  const watchPriceType = form.watch("priceType");
  const watchPriceRM = form.watch("priceRM");
  const watchPriceManta = form.watch("priceManta");

  useEffect(() => {
    if (watchPriceType === "RM" && watchPriceRM) {
      form.setValue(
        "priceManta",
        Number((watchPriceRM / MANTA_EXCHANGE_RATE).toFixed(2))
      );
    } else if (watchPriceType === "MANTA" && watchPriceManta) {
      form.setValue(
        "priceRM",
        Number((watchPriceManta * MANTA_EXCHANGE_RATE).toFixed(2))
      );
    }
  }, [watchPriceType, watchPriceRM, watchPriceManta, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
    alert("Product listed successfully!");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
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
                      <Input placeholder="Enter product name" {...field} />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="RM" />
                          </FormControl>
                          <FormLabel className="font-normal">RM</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="MANTA" />
                          </FormControl>
                          <FormLabel className="font-normal">MANTA</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="BOTH" />
                          </FormControl>
                          <FormLabel className="font-normal">Both</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {(watchPriceType === "RM" || watchPriceType === "BOTH") && (
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
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {(watchPriceType === "MANTA" || watchPriceType === "BOTH") && (
                <FormField
                  control={form.control}
                  name="priceManta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (MANTA)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price in MANTA"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
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
                      />
                    </FormControl>
                    <FormDescription>
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Verified Product</FormLabel>
                      <FormDescription>
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Button type="submit">List Product</Button>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
