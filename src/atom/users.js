import { isNil } from "ramda";
import { useEffect, useMemo } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { useUser } from "./user";

const { persistAtom } = recoilPersist();

const usersState = atom({
  key: "Users",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const useUsers = (initValue) => {
  const [users, setUsers] = useRecoilState(usersState);
  const { user } = useUser();

  useEffect(() => {
    !isNil(initValue) && setUsers(initValue);
  }, [initValue, setUsers]);

  const targetUser = useMemo(() => {
    const findUsers = users.find((u) => u.id === user);

    return findUsers || null;
  }, [user, users]);

  return {
    users,
    user: targetUser,
    lastId: users[users?.length - 1]?.id || null,
    setUsers,
  };
};
