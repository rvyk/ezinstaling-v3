"use client";

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

import {
  addAccount,
  updateSelectedAccount,
} from "@/actions/instaling/accounts";
import { SettingsContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentUser } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { AddInstalingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "../../(auth)/_components/ui/form-error";
import { FormSuccess } from "../../(auth)/_components/ui/form-success";

type Team = { id: number; label: string };

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export const AccountSwitcher = ({ className }: TeamSwitcherProps) => {
  const user = useCurrentUser();
  const { instalingAccounts, updateInstalingAccounts } =
    useContext(SettingsContext);
  const groups = [
    {
      label: "Dodane konta",
      teams:
        instalingAccounts.map((ac, i) => {
          return { id: i, label: ac.login };
        }) ?? [],
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [showNewUserDialog, setShowNewUserDialog] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(
    groups[0].teams.find(
      (account) => account.label === user?.instaling?.selectedAccount,
    ) || {
      id: -1337,
      label: "Brak kont",
    },
  );

  useEffect(() => {
    updateSelectedAccount(selectedTeam.label);
  }, [selectedTeam]);

  const pathname = usePathname();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddInstalingSchema>>({
    resolver: zodResolver(AddInstalingSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof AddInstalingSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      addAccount(values.login, values.password)
        .then((data) => {
          form.reset();
          updateInstalingAccounts();
          if (selectedTeam.id == -1337)
            setSelectedTeam({ id: 0, label: values.login });
          setSuccess("Konto dodane pomyślnie");
        })
        .catch((e) => setError(e.message ?? "Coś poszło nie tak :c"));
    });
  }

  if (pathname !== "/dashboard/instaling") return null;

  return (
    <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="combobox"
            role="combobox"
            aria-expanded={open}
            aria-label="Wybierz konto"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedTeam.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Wyszukaj konto" />
              <CommandEmpty>Nieznaleziono konta</CommandEmpty>
              {!!groups.length &&
                groups.map((group) => (
                  <CommandGroup
                    key={group.label}
                    heading={`${group.label} (${group.teams.length}/3)`}
                  >
                    {group.teams.map((team) => (
                      <CommandItem
                        key={team.label}
                        onSelect={() => {
                          setSelectedTeam(team);
                          setOpen(false);
                        }}
                        className="text-sm"
                      >
                        {team.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedTeam.id === team.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewUserDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Dodaj konto
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj konto</DialogTitle>
          <DialogDescription>Dodaj nowe konto Instaling.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="1lo2137" {...field} />
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
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </Form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setError("");
              setSuccess("");
              form.reset();
              setShowNewUserDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
