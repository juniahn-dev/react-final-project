import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { useUser } from "../../atom/user";
import { useUsers } from "../../atom/users";
import "./index.css";

const loginAtom = atom({
  key: "Login",
  default: { name: "", email: "", address: "", pass: "" },
});

export default function Login() {
  const navigate = useNavigate();

  const { users, lastId, setUsers } = useUsers();
  const { setUser } = useUser();

  const [value, setValue] = useRecoilState(loginAtom);
  const [isRegister, setIsRegister] = useState(false);

  const clean = (e) => {
    e.preventDefault();

    setValue((prevValue) => ({
      ...prevValue,
      name: "",
      email: "",
      pass: "",
      address: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = (e) => {
    e.preventDefault();

    const findUsers = users.find(
      (u) => u.email === value.email && u.pass === value.pass
    );

    if (findUsers) {
      setUser(findUsers.id);
      navigate("/");
      return;
    }

    alert("nonono");
  };

  const register = () => {
    const userInfo = {
      id: lastId ? lastId + 1 : 1,
      name: value.name,
      email: value.email,
      pass: value.pass,
      address: value.address,
    };

    alert(`Welcome! ${value.name}`);
    setIsRegister(false);
    setUsers((user) => [...user, userInfo]);
  };

  return (
    <div className="container justify-content-center d-flex">
      <div className="border pb-5 w-75  mt-5 pt-4 background-image border border-5 border-primary">
        <div className="pb-5 ">
          <div className="pb-5 ">
            <div className="pb-5 pt-5">
              <div className="pb-5 pt-5">
                <div className="pb-5 pt-5">
                  {isRegister ? (
                    <div className="p-0 container  rounded  shadow pb-2  border mt-5  wida bg-white">
                      <h1 className="fs-4 pt-4 ms-3">Register</h1>
                      <p className="d-flex justify-content-between align-items-center pb-2 fs-6 mx-3">
                        Please enter your details
                        <button
                          onClick={() => setIsRegister(false)}
                          className="btn btn-info text-white"
                        >
                          Login
                        </button>
                      </p>
                      <div className="grid grid-cols-1 ms-48 m-0 text-center">
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={value.name}
                            onChange={handleChange}
                            className="rounded  w-75"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={value.email}
                            onChange={handleChange}
                            className="rounded  w-75  "
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={value.address}
                            onChange={handleChange}
                            className="rounded  w-75  "
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="password"
                            placeholder="Password"
                            name="pass"
                            value={value.pass}
                            onChange={handleChange}
                            className=" rounded w-75 "
                          />
                        </div>
                        <div className="mt-4 pb-3">
                          <button
                            className="btn btn-primary me-16 rounded"
                            onClick={register}
                          >
                            Submit
                          </button>
                          <button
                            type="submit"
                            onClick={clean}
                            className=" btn btn-secondary rounded ms-5"
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-0 container  rounded  shadow pb-2  border mt-5  wida bg-white">
                      <h1 className="fs-4 pt-4 ms-3">Welcome Back</h1>
                      <p className="d-flex justify-content-between align-items-center pb-2 fs-6 mx-3">
                        Please enter your details
                        <button
                          onClick={() => setIsRegister(true)}
                          className="btn btn-info text-white"
                        >
                          Register
                        </button>
                      </p>
                      <form
                        onSubmit={login}
                        className="grid grid-cols-1 ms-48 m-0 text-center "
                      >
                        <div className="col-12 mb-3">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={value.email}
                            onChange={handleChange}
                            className="rounded w-75"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <input
                            type="password"
                            placeholder="Password"
                            name="pass"
                            value={value.pass}
                            onChange={handleChange}
                            className="rounded w-75"
                          />
                        </div>
                        <div className="mt-4 pb-3">
                          <button
                            type="submit"
                            className="btn btn-primary    me-16 rounded "
                          >
                            Submit
                          </button>
                          <button
                            type="submit"
                            onClick={clean}
                            className=" btn btn-secondary rounded ms-5"
                          >
                            delete
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
