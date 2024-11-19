import { isNil } from "ramda";
import { useEffect, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const invoiceState = atom({
  key: "Invoice",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useInvoice = (initValue) => {
  const [invoice, setInvoice] = useRecoilState(invoiceState);

  useEffect(() => {
    !isNil(initValue) && setInvoice(initValue);
  }, [initValue, setInvoice]);

  // TODO: apply UserID
  const targetInvoice = useMemo(() => {
    const findInvoice = invoice[1];

    return findInvoice || null;
  }, [invoice]);

  return {
    invoice: targetInvoice,
    setInvoice,
  };
};
