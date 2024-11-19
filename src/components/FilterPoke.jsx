import { useState, useEffect } from "react";

export default function FilterPoke({ surveyAnswers }) {
    const [pokeOptions, setPokeOptions] = useState([]);

    useEffect(() => {
        fetch("/poke.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch poke options");
                }
                return response.json();
            })
            .then((data) => setPokeOptions(data))
            .catch((error) => console.error("Error loading poke options:", error));
    }, []);

    const filterPoke = (answers = {}) => {
        const { allergies = [], mainIngredient = [], preferredFlavour = [] } = answers;

        return pokeOptions.filter((poke) => {
            const matchesAllergies = allergies.every(
                (allergy) => !poke.allergic.includes(allergy.toLowerCase())
            );

            const matchesMainIngredient =
                mainIngredient.length === 0 ||
                mainIngredient.some((ingredient) =>
                    poke.mainIngredient.includes(ingredient.toLowerCase())
                );

            const matchesFlavour =
                preferredFlavour.length === 0 ||
                preferredFlavour.some((flavour) =>
                    poke.flavour.includes(flavour.toLowerCase())
                );

            return matchesAllergies && matchesMainIngredient && matchesFlavour;
        });
    };

    const recommendedPoke = filterPoke(surveyAnswers);

    return (
        <div>
            {recommendedPoke.length > 0 ? (
                recommendedPoke.map((poke) => (
                    <div key={poke.id}>
                        <span>{poke.title}</span>
                    </div>
                ))
            ) : (
                <span>No recommendations available</span>
            )}
        </div>
    );
}




