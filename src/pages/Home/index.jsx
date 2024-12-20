import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokes } from "../../atom/pokes";
import { useAllergyPreferences } from "../../atom/surveys";
import { useUsers } from "../../atom/users";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  const { pokes } = usePokes();
  const { user } = useUsers();

  const { allergies } =
    useAllergyPreferences();
  const [filter, setFilter] = useState("All");

  const filteredPokes = (pokes || []).filter((poke) => {
    if (filter === "Without Allergies") {
      console.log(poke);
      return !poke.allergic.some((allergy) =>
        allergies.some(
          (userAllergy) =>
            userAllergy.trim().toLowerCase() === allergy.trim().toLowerCase()
        )
      );
    }
    if (filter === "Vegan") {
      return poke.vegan;
    }
    return true;
  });
  // console.log(filteredPokes);
  // console.log(userAllergies);

  return (
    <>
      {user && <div className="welcome">Welcome {user.name}! 🤗</div>}
      <div className="dropdown-container">
        <div className="dropdown">
          <button className="dropdown-button">Filter</button>
          <div class="dropdown-menu">
            <span onClick={() => setFilter("All")}>All</span>
            <span onClick={() => setFilter("Without Allergies")}>
              Without Allergies
            </span>
            <span onClick={() => setFilter("Vegan")}>Vegan</span>
          </div>
        </div>
      </div>

      <div className="home-container">
        {filteredPokes.length > 0 ? (
          filteredPokes.map((poke) => (
            <div
              className="poke-card"
              onClick={() => navigate(`/order/${poke.id}`)}
              key={poke.id}
            >
              <div className="pokeContainer">
                <div id="pokeName">{poke.title}</div>
                <div id="pokePrice">${poke.price}</div>
                <div id="pokeAllergy" className="allergic-container">
                  {poke.allergic.map((a, idx) => (
                    <div className="allergic" key={`${poke.id}-${idx}`}>
                      {a}
                    </div>
                  ))}
                </div>
                <div id="pokeDes">{poke.description}</div>
              </div>
              <div className="imgContainer">
                <img src={poke.imageUrl} alt={poke.title}></img>
              </div>
            </div>
          ))
        ) : (
          <div>No Pokes Available</div>
        )}
      </div>
    </>
  );
};

export default Home;
