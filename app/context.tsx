"use client";

import { getInstalingAccounts } from "@/actions/instaling/accounts";
import { useCurrentUser } from "@/hooks/auth";
import { InstalingData } from "@prisma/client";
import React, { createContext, useCallback, useMemo, useState } from "react";

export type SettingsContextType = {
  showReportModal: boolean;
  showSidebar: boolean;
  setShowReportModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  instalingAccounts: InstalingData["accounts"];
  updateInstalingAccounts: () => void;
};

const defaultValues = {
  showReportModal: false,
  showSidebar: false,
};

export const SettingsContext = createContext<SettingsContextType>(
  defaultValues as SettingsContextType,
);

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();

  const [showReportModal, setShowReportModal] = useState(
    defaultValues.showReportModal,
  );
  const [showSidebar, setShowSidebar] = useState(defaultValues.showSidebar);
  const [instalingAccounts, setInstalingAccounts] = useState<
    InstalingData["accounts"]
  >(user?.instaling?.accounts ?? []);

  const updateInstalingAccounts = useCallback(async () => {
    setInstalingAccounts((await getInstalingAccounts()) ?? []);
  }, []);

  const contextValue = useMemo(
    () => ({
      showReportModal,
      setShowReportModal,
      showSidebar,
      setShowSidebar,
      instalingAccounts,
      updateInstalingAccounts,
    }),
    [
      showReportModal,
      setShowReportModal,
      showSidebar,
      setShowSidebar,
      instalingAccounts,
      updateInstalingAccounts,
    ],
  );
  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
