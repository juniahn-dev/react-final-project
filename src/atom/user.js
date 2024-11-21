import { isNil } from "ramda";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const userState = atom({
  key: "User",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useUser = (initValue) => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    !isNil(initValue) && setUser(initValue);
  }, [initValue, setUser]);

  return {
    user,
    setUser,
  };
};
