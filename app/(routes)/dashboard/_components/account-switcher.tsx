"use client";

import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUser } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useContext } from "react";

type Team = { id: number; label: string };

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export const AccountSwitcher = ({ className }: TeamSwitcherProps) => {
  const user = useCurrentUser();
  const { instalingAccounts } = useContext(SettingsContext);
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
    groups[0].teams[user?.instaling?.selectedAccount ?? 0] || {
      id: 0,
      label: "Brak kont",
    },
  );
  const pathname = usePathname();

  if (pathname !== "/dashboard/instaling") return null;

  return (
    <Dialog
      open={showNewUserDialog}
      onOpenChange={setShowNewUserDialog}
      data-disabled={null}
    >
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
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
