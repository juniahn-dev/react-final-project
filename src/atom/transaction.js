import { isNil } from "ramda";
import { useEffect, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const transactionState = atom({
  key: "Transaction",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useTransaction = (initValue) => {
  const [transaction, setTransaction] = useRecoilState(transactionState);

  useEffect(() => {
    !isNil(initValue) && setTransaction(initValue);
  }, [initValue, setTransaction]);

  // TODO: apply UserID
  const targetTransaction = useMemo(() => {
    const findTransaction = transaction?.[1];

    return findTransaction || null;
  }, [transaction]);

  return {
    transaction: targetTransaction,
    setTransaction,
  };
};
