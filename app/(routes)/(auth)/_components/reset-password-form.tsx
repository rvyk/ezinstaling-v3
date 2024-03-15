"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { newPassword } from "@/actions/new-password";
import { FormError } from "@/app/(routes)/(auth)/_components/ui/form-error";
import { FormSuccess } from "@/app/(routes)/(auth)/_components/ui/form-success";
import Title from "@/components/_typography/title";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas";
import { UpdateIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Coś poszło nie tak! :c"));
    });
  }

  return (
    <section className="flex min-h-screen items-center justify-center pt-16 lg:pt-32">
      <div className="container mx-auto grid h-full place-items-center gap-10 px-8">
        <Title title="Stwórz nowe hasło" />
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mx-auto w-full rounded-[20px] bg-white px-6 py-8 shadow-[0px_3px_12px_0px_#D7DDFC] lg:w-1/2"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Powtórz hasło</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="flex w-full flex-col items-end ">
                <div className="flex w-full items-center justify-between">
                  <Button
                    type="submit"
                    className="font-semibold"
                    disabled={isPending}
                  >
                    {isPending && <UpdateIcon className="mr-2 animate-spin" />}
                    <span>Zresetuj hasło</span>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <Link
          className="mb-5 text-xs font-medium text-[#54575b]"
          href="/login"
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-offset={-500}
        >
          Hasło zostało zmienione?{" "}
          <span className="font-bold text-[#3452fe] hover:text-[#3452fe]/90">
            Zaloguj się!
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
