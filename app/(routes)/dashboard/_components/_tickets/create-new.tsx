"use client";

import { createTicket } from "@/actions/tickets/create";
import { FormError } from "@/app/(routes)/(auth)/_components/ui/form-error";
import { FormSuccess } from "@/app/(routes)/(auth)/_components/ui/form-success";
import { SettingsContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { reportSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import Turnstile from "react-turnstile";
import { z } from "zod";

const CreateNewTicket = () => {
  const { showReportModal, setShowReportModal } = useContext(SettingsContext);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktop) {
    return (
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="p-2">
          <ReportForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={showReportModal} onOpenChange={setShowReportModal}>
      <DrawerContent>
        <ReportForm />
      </DrawerContent>
    </Drawer>
  );
};

const ReportForm = () => {
  const { setShowReportModal } = useContext(SettingsContext);
  const [isPending, setIsPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      captcha: "",
      description: "",
      priority: "low",
      problemType: "instaling",
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof reportSchema>) {
    setError("");
    setSuccess("");

    setIsPending(() => {
      createTicket(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);

          if (data.success) {
            setTimeout(() => {
              setShowReportModal?.(false);
              router.push(`/dashboard/tickets/${data.ticketId}`);
            }, 3000);
          }
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-none shadow-none">
          <CardHeader>
            <CardTitle>Utwórz nowy ticket (Czat)</CardTitle>
            <CardDescription>
              Skontaktuj się z nami, aby uzyskać pomoc.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="problemType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rodzaj problemu</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="instaling"
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-[8px]">
                            <SelectValue placeholder="Wybierz rodzaj" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="instaling">Instaling</SelectItem>
                          <SelectItem value="platnosci">Płatności</SelectItem>
                          <SelectItem value="konto">Konto</SelectItem>
                          <SelectItem value="inne">Inne</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priorytet</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="low">
                        <FormControl>
                          <SelectTrigger className="rounded-[8px]">
                            <SelectValue placeholder="Wybierz priorytet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Niski</SelectItem>
                          <SelectItem value="medium">Średni</SelectItem>
                          <SelectItem value="high">Wysoki</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temat</FormLabel>
                    <FormControl>
                      <Input placeholder="Temat problemu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Krótki opis</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Krótki opis problemu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <p className="text-xs font-medium text-muted-foreground opacity-80">
              <span className="font-bold">Uwaga!</span> Utwórz kanał pomocy
              tylko w razie rzeczywistej potrzeby. Niezwiązane z tym działania
              mogą skutkować zablokowaniem.
            </p>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button
              variant="secondaryBlue2"
              type="button"
              disabled={isPending}
              onClick={() => setShowReportModal?.(false)}
            >
              Anuluj
            </Button>
            <Button disabled={isPending} variant="secondaryBlue" type="submit">
              {isPending ? (
                <span className="inline-flex items-center justify-between">
                  <UpdateIcon className="mr-2 animate-spin" />
                  Utwórz czat
                </span>
              ) : (
                "Utwórz czat"
              )}
            </Button>
          </CardFooter>
        </Card>
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
          onVerify={(token) => form.setValue("captcha", token)}
        />
      </form>
    </Form>
  );
};

export default CreateNewTicket;
