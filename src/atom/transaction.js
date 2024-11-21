import { isNil } from "ramda";
import { useEffect, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useUser } from "./user";

const { persistAtom } = recoilPersist();

const transactionState = atom({
  key: "Transaction",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useTransaction = (initValue) => {
  const [transaction, setTransaction] = useRecoilState(transactionState);
  const { user } = useUser();

  useEffect(() => {
    !isNil(initValue) && setTransaction(initValue);
  }, [initValue, setTransaction]);

  const targetTransaction = useMemo(() => {
    const findTransaction = transaction?.[user];

    return findTransaction || null;
  }, [transaction, user]);

  return {
    transaction: targetTransaction,
    setTransaction,
  };
};
