import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Customer } from "@/types/customer";
const FormDataSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email(),
  address: z.string(),
  password: z.string(),
});
type Inputs = z.infer<typeof FormDataSchema>;

const CreateCustomer = ({
  onSuccess,
  selectedCustomer,
  setSelectedCustomer,
}: {
  onSuccess: () => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (category: Customer | null) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      password: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      ...(selectedCustomer && { id: selectedCustomer.id }),
    };
    try {
      setLoading(true);
      if (selectedCustomer) {
        await axios.put(`/api/customer`, { payload });
        await onSuccess();
        toast.success("Customer updated successfully.");
        form.reset();
        return;
      }
      const response = await axios.post("/api/customer", payload);
      await onSuccess();
      toast.success("customer created successfully.");
      form.reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open && selectedCustomer) {
      form.reset({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        address: selectedCustomer.address,
        password: selectedCustomer.password,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        address: "",
        password: "",
      });
      setSelectedCustomer(null);
    }
    setOpen(open);
  };

  useEffect(() => {
    if (selectedCustomer) {
      onOpenChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomer]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-[#2c820c] hover:bg-[#195104]">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Create Customer</DialogTitle>
          <DialogDescription>
            Create a new customer for your store.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            <div className="flex justify-between gap-2"></div>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name"
                      {...field}
                      {...form.register("name", { required: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      {...form.register("email", { required: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="address"
                      {...field}
                      {...form.register("address", {
                        required: true,
                        // Convert input value to number
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      {...field}
                      {...form.register("password", {
                        required: true,
                        // Convert input value to number
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {selectedCustomer ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomer;
