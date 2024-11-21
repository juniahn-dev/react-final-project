import { isNil } from "ramda";
import { useEffect, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useUser } from "./user";

const { persistAtom } = recoilPersist();

const invoiceState = atom({
  key: "Invoice",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useInvoice = (initValue) => {
  const [invoice, setInvoice] = useRecoilState(invoiceState);
  const { user } = useUser();

  useEffect(() => {
    !isNil(initValue) && setInvoice(initValue);
  }, [initValue, setInvoice]);

  const targetInvoice = useMemo(() => {
    const findInvoice = invoice?.[user];

    return findInvoice || null;
  }, [invoice, user]);

  return {
    invoice: targetInvoice,
    setInvoice,
  };
};
