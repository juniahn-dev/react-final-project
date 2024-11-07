import { useEffect } from "react";
import { usePokes } from "../../atom/pokes";
import runService from "../../service/HttpSerivce";
import "./index.css";

const Home = () => {
  const { pokes, setPokes } = usePokes();

  useEffect(() => {
    runService.get("poke.json").then((res) => setPokes(res.data));
  }, [setPokes]);

  return (
    <div className="home-container">
      {pokes ? (
        pokes.map((poke) => (
          <div className="poke-card">
            <div>{poke.title}</div>
            <div>${poke.price}</div>
            <div className="allergic-container">
              {poke.allergic.map((a) => (
                <div className="allergic">{a}</div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>Empty Pokes</div>
      )}
    </div>
  );
};

export default Home;
