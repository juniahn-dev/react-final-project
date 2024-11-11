import { isNil } from "ramda";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const invoiceState = atom({
  key: "Invoice",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const useInvoice = (initValue) => {
  const [invoice, setInvoice] = useRecoilState(invoiceState);

  useEffect(() => {
    !isNil(initValue) && setInvoice(initValue);
  }, [initValue, setInvoice]);

  return {
    invoice,
    setInvoice,
  };
};
