import { useState } from "react";
import { useAllergyPreferences, useSurveyAnswers } from "../../atom/surveys";
import "./index.css";
import FilterPoke from "../../components/FilterPoke";

export default function Survey() {
    // two modals
    const [showAllergyModal, setShowAllergyModal] = useState(false);
    const [showSurveyModal, setShowSurveyModal] = useState(false);

    // first modal
    const { allergies, setAllergies, isVegan, setIsVegan } = useAllergyPreferences();
    // second modal
    const { surveyAnswers, setSurveyAnswers } = useSurveyAnswers();

    // recommendation
    // const [recommendedPoke, setRecommendedPoke] = useState([]);

    const allergyOptions = [
        "Salmon", "Peanut", "Tuna", "Shrimp", "Soy", "Gluten", "Avocado", "Sesame", "Mango", "Scallop",
    ];

    // first modal
    const handleAllergyChange = (e) => {
        const { value, checked } = e.target;
        setAllergies((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };
    const handleVeganChange = (e) => {
        setIsVegan(e.target.checked);
    };

    // second modal
    const handleSurveyChange = (e) => {
        const { name, value, checked } = e.target;

        console.log("Before update:", surveyAnswers);

        setSurveyAnswers(prevState => {
            const updatedState = {
                ...prevState,
                [name]: checked
                    ? [...prevState[name], value]
                    : prevState[name].filter(item => item !== value),
            };

            console.log("Updated state:", updatedState);
            return updatedState;
        });
    };

    // first modal
    const handleAllergySubmit = () => {
        const data = { allergies, isVegan };
        localStorage.setItem("userDietPreferences", JSON.stringify(data));
        setShowAllergyModal(false);
        console.log("Preferences saved:", data);
    };

    // second modal
    // const handleSurveySubmit = () => {
    //     const filteredPoke = <FilterPoke surveyAnswers={surveyAnswers} />;
    //     setRecommendedPoke(filteredPoke);
    // };

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
                            {allergyOptions.map((allergy) => (
                                <label key={allergy}>
                                    <input
                                        type="checkbox"
                                        value={allergy}
                                        checked={allergies.includes(allergy)}
                                        onChange={handleAllergyChange}
                                    />
                                    {allergy} Allergy
                                </label>
                            ))}
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isVegan}
                                    onChange={handleVeganChange}
                                />
                                Vegan
                            </label>
                        </div>
                        <div className="surveySubmit-container">
                            <button
                                className="surveySubmit"
                                type="button"
                                onClick={handleAllergySubmit}
                            >
                                Submit
                            </button>
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
                                        checked={surveyAnswers.mainIngredient.includes("meat")}
                                        onChange={handleSurveyChange}
                                    />
                                    Meat
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="mainIngredient"
                                        value="fish"
                                        checked={surveyAnswers.mainIngredient.includes("fish")}
                                        onChange={handleSurveyChange}
                                    />
                                    Fish
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="mainIngredient"
                                        value="vegetable"
                                        checked={surveyAnswers.mainIngredient.includes("vegetable")}
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
                                        checked={surveyAnswers.mainIngredient.includes("seafood")}
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
                                        checked={surveyAnswers.preferredFlavour.includes("mild")}
                                        onChange={handleSurveyChange}
                                    />
                                    Mild
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="preferredFlavour"
                                        value="spicy"
                                        checked={surveyAnswers.preferredFlavour.includes("spicy")}
                                        onChange={handleSurveyChange}
                                    />
                                    Spicy
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="preferredFlavour"
                                        value="sweet"
                                        checked={surveyAnswers.preferredFlavour.includes("sweet")}
                                        onChange={handleSurveyChange}
                                    />
                                    Sweet
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="preferredFlavour"
                                        value="savoury"
                                        checked={surveyAnswers.preferredFlavour.includes("savoury")}
                                        onChange={handleSurveyChange}
                                    />
                                    Savoury
                                </label>
                            </div>
                        </div>
                        <div className="surveySubmit-container">
                            <button
                                className="surveySubmit"
                                type="button"
                            // onClick={handleSurveySubmit}
                            >
                                Submit
                            </button>
                        </div>

                        {/* poke recommendation */}
                        {/* <div>
                            {recommendedPoke.length > 0 ? (
                                recommendedPoke.map(poke => (
                                    <div key={poke.id}>
                                        <h3>{poke.title}</h3>
                                        <img src={poke.imageUrl} alt={poke.title} />
                                        <p>{poke.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p>.</p>
                            )}
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
}




