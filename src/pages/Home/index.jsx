import { useNavigate } from "react-router-dom";
import { usePokes } from "../../atom/pokes";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  const { pokes } = usePokes();

  return (
    <div className="home-container">
      {pokes ? (
        pokes.map((poke) => (
          <div
            className="poke-card"
            onClick={() => navigate(`/order/${poke.id}`)}
            key={poke.id}
          >
            <div>{poke.title}</div>
            <div>${poke.price}</div>
            <div className="allergic-container">
              {poke.allergic.map((a, idx) => (
                <div className="allergic" key={`${poke.id}-${idx}`}>
                  {a}
                </div>
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
