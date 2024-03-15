"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { register } from "@/actions/register";
import Providers from "@/app/(routes)/(auth)/_components/provider";
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
import { RegisterSchema } from "@/schemas";
import { UpdateIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useTransition } from "react";
import Turnstile from "react-turnstile";

const RegisterForm = () => {
  const [isPending, setIsPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      repeatPassword: "",
      captcha: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setError("");
    setSuccess("");

    setIsPending(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }

  return (
    <section className="flex min-h-screen items-center justify-center pt-32">
      <div className="container mx-auto grid h-full place-items-center gap-10 px-8">
        <Title
          title="Zarejestruj się"
          desc=<>
            Cieszymy się, że jesteś z&nbsp;
            <span className="font-semibold text-[#565656]">nami!</span>
          </>
        />
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mx-auto w-full rounded-[20px] bg-white px-6 py-8 shadow-[0px_3px_12px_0px_#D7DDFC] lg:w-1/2"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa użytkownika</FormLabel>
                    <FormControl>
                      <Input placeholder="Janek" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="jankowalski@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                <Link
                  className="mb-5 text-xs font-bold text-[#3452fe] hover:text-[#3452fe]/90"
                  href="https://dc.ezinstaling.pl/"
                >
                  Nie mogę się zarejestrować
                </Link>
                <div className="flex w-full items-center justify-between">
                  <Button
                    type="submit"
                    className="font-semibold"
                    disabled={isPending}
                  >
                    {isPending && <UpdateIcon className="mr-2 animate-spin" />}
                    <span>Zarejestruj się</span>
                  </Button>
                  <Providers />
                </div>
              </div>
              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                onVerify={(token) => form.setValue("captcha", token)}
              />
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
          Masz już konto?{" "}
          <span className="font-bold text-[#3452fe] hover:text-[#3452fe]/90">
            Zaloguj się!
          </span>
        </Link>
      </div>
    </section>
  );
};

export default RegisterForm;
