import { isNil } from "ramda";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const pokesState = atom({
  key: "Pokes",
  default: null,
});

export const usePokes = (initValue) => {
  const [pokes, setPokes] = useRecoilState(pokesState);

  useEffect(() => {
    !isNil(initValue) && setPokes(initValue);
  }, [initValue, setPokes]);

  return {
    pokes,
    setPokes,
  };
};
