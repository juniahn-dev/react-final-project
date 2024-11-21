import { useState, useEffect } from "react";

export default function FilterPoke({ surveyAnswers }) {
    const [pokeOptions, setPokeOptions] = useState([]);
    const [filteredPoke, setFilteredPoke] = useState([]);

    useEffect(() => {
        fetch("/poke.json")
            .then((response) => response.json())
            .then((data) => setPokeOptions(data))
            .catch((error) => console.error("Error loading poke options:", error));
    }, []);

    useEffect(() => {
        if (surveyAnswers.length > 0) {
            const { mainIngredient = [], preferredFlavour = [] } = surveyAnswers[0];

            console.log("Survey Answers:", surveyAnswers);
            console.log("Main Ingredient:", mainIngredient);
            console.log("Preferred Flavour:", preferredFlavour);

            const filtered = pokeOptions.filter((poke) => {
                const pokeMainIngredient = Array.isArray(poke.mainIngredient)
                    ? poke.mainIngredient.map((ingredient) => ingredient.toLowerCase())
                    : [poke.mainIngredient.toLowerCase()];
                const pokeFlavour = Array.isArray(poke.flavour)
                    ? poke.flavour.map((flavour) => flavour.toLowerCase())
                    : [poke.flavour.toLowerCase()];

                // console.log("Main Ingredient:", pokeMainIngredient);
                // console.log("Flavour:", pokeFlavour);

                const matchesMainIngredient =
                    mainIngredient.length === 0 ||
                    mainIngredient.some((ingredient) =>
                        pokeMainIngredient.includes(ingredient.toLowerCase())
                    );
                const matchesFlavour =
                    preferredFlavour.length === 0 ||
                    preferredFlavour.some((flavour) =>
                        pokeFlavour.includes(flavour.toLowerCase())
                    );

                // console.log("matchesMainIngredient:", matchesMainIngredient);
                // console.log("matchesFlavour:", matchesFlavour);

                return matchesMainIngredient && matchesFlavour;
            });

            setFilteredPoke(filtered);
            console.log("Filtered Poke:", filtered);
        }
    }, [surveyAnswers, pokeOptions]);

    return (
        <div>
            {/* <p>Filtered Poke Count: {filteredPoke.length}</p> */}
            {filteredPoke.length > 0 ? (
                filteredPoke.map((poke) => (
                    <div key={poke.id}>
                        <span>{poke.title}</span>
                    </div>
                ))
            ) : (
                <span>No matching poke found</span>
            )}
        </div>
    );
}
