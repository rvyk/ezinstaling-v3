"use client";

import { addAccount } from "@/actions/instaling/accounts";
import { SettingsContext } from "@/app/context";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";

const addAcc = async (login: string, pass: string) => {
  console.log(await addAccount(login, pass));
};

function Test() {
  const { updateInstalingAccounts } = useContext(SettingsContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex w-fit flex-col">
      <input
        className="rounded-md border-2 border-gray-300 "
        type="text"
        placeholder="login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        className="rounded-md border-2 border-gray-300 "
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={async () => {
          await addAcc(login, password);
          updateInstalingAccounts();
        }}
      >
        add account
      </Button>
    </div>
  );
}

export default Test;
