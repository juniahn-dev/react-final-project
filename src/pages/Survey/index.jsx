import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllergyPreferences, useSurveyAnswers } from "../../atom/surveys";
import { useUser } from "../../atom/user";
import FilterPoke from "../../components/FilterPoke";
import "./index.css";

export default function Survey() {
  const navigate = useNavigate();

  // two modals
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  const { user } = useUser();
  // first modal
  const { allergies, setAllergies, isVegan, setIsVegan } =
    useAllergyPreferences();
  // second modal
  const { surveyAnswers, setSurveyAnswers } = useSurveyAnswers();

  // recommendation
  // const [recommendedPoke, setRecommendedPoke] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const allergyOptions = [
    "Salmon",
    "Peanut",
    "Tuna",
    "Shrimp",
    "Soy",
    "Gluten",
    "Avocado",
    "Sesame",
    "Mango",
    "Scallop",
  ];

  // first modal
  const handleAllergyChange = (e) => {
    const { value, checked } = e.target;

    setAllergies((prev) => {
      const updatedAllergies = { ...prev };
      const userAllergies = updatedAllergies[user] || [];

      updatedAllergies[user] = checked
        ? [...userAllergies, value] // checked
        : userAllergies.filter((item) => item !== value); // remove check

      return updatedAllergies;
    });
  };
  const handleVeganChange = (e) => {
    const { checked } = e.target;

    setIsVegan((prev) => ({
      ...prev,
      [user]: checked, // user
    }));
  };

  // second modal
  const handleSurveyChange = (e) => {
    const { name, value, checked } = e.target;

    setSurveyAnswers((prevState) => {
      const userAnswers = prevState || {};
      const userSurveyData = userAnswers[user] || [];
      const currentAnswers = userSurveyData[0] || {};

      const updatedAnswers = checked
        ? [...(currentAnswers[name] || []), value]
        : (currentAnswers[name] || []).filter((item) => item !== value);

      const updatedSurveyData = [{ ...currentAnswers, [name]: updatedAnswers }];

      return {
        ...prevState,
        [user]: updatedSurveyData,
      };
    });
  };

  return (
    <>
      <div className="surveyBtnContainer">
        <button className="surveyBtn" onClick={() => setShowAllergyModal(true)}>
          Allergies / Vegan
        </button>
        <button className="surveyBtn" onClick={() => setShowSurveyModal(true)}>
          Preferences Survey
        </button>
      </div>

      {/* Allergy Modal */}
      {showAllergyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={() => setShowAllergyModal(false)}>X</button>
            </div>
            <h5>Allergy and Dietary Preferences</h5>
            <div className="modal-body">
              {allergyOptions.map((a) => (
                <label key={a}>
                  <input
                    type="checkbox"
                    value={a}
                    checked={(allergies || []).includes(a)}
                    onChange={handleAllergyChange}
                  />
                  {a} Allergy
                </label>
              ))}
              <label>
                <input
                  type="checkbox"
                  checked={isVegan || false}
                  onChange={handleVeganChange}
                />
                Vegan
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Survey Modal */}
      {showSurveyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button onClick={() => setShowSurveyModal(false)}>X</button>
            </div>
            <h5>Preferences Survey</h5>
            <div className="modal-body">
              <label className="surveyLabel">Favourite main ingredients</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="mainIngredient"
                    value="meat"
                    checked={surveyAnswers.mainIngredient?.includes("meat")}
                    onChange={handleSurveyChange}
                  />
                  Meat
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="mainIngredient"
                    value="fish"
                    checked={surveyAnswers.mainIngredient?.includes("fish")}
                    onChange={handleSurveyChange}
                  />
                  Fish
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="mainIngredient"
                    value="vegetable"
                    checked={surveyAnswers.mainIngredient?.includes("vegetable")}
                    onChange={handleSurveyChange}
                  />
                  Vegetable
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="mainIngredient"
                    value="seafood"
                    checked={surveyAnswers.mainIngredient?.includes("seafood")}
                    onChange={handleSurveyChange}
                  />
                  Seafood
                </label>
              </div>

              <label className="surveyLabel">Favourite main ingredients</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="preferredFlavour"
                    value="mild"
                    checked={surveyAnswers.preferredFlavour?.includes("mild")}
                    onChange={handleSurveyChange}
                  />
                  Mild
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="preferredFlavour"
                    value="spicy"
                    checked={surveyAnswers.preferredFlavour?.includes("spicy")}
                    onChange={handleSurveyChange}
                  />
                  Spicy
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="preferredFlavour"
                    value="sweet"
                    checked={surveyAnswers.preferredFlavour?.includes("sweet")}
                    onChange={handleSurveyChange}
                  />
                  Sweet
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="preferredFlavour"
                    value="savoury"
                    checked={surveyAnswers.preferredFlavour?.includes("savoury")}
                    onChange={handleSurveyChange}
                  />
                  Savoury
                </label>
              </div>
            </div>

            {/* poke recommendation */}
            <div class="recomPoke">
              <p>Here are some suggested pokes for you</p>
              <FilterPoke surveyAnswers={surveyAnswers} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
