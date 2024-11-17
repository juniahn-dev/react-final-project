// import React, { useState, useEffect } from "react";

// export default function FilterPoke({ surveyAnswers }) {
//     const [pokeOptions, setPokeOptions] = useState([]);

//     useEffect(() => {
//         fetch("/poke.json")
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch poke options");
//                 }
//                 return response.json();
//             })
//             .then((data) => setPokeOptions(data))
//             .catch((error) => console.error("Error loading poke options:", error));
//     }, []);

//     const filterPoke = (answers) => {
//         return pokeOptions.filter((poke) => {
//             const matchesAllergies = answers.allergies.every(
//                 (allergy) => !poke.ingredients.includes(allergy.toLowerCase())
//             );

//             const matchesMainIngredient =
//                 answers.mainIngredient.length === 0 ||
//                 answers.mainIngredient.some((ingredient) =>
//                     poke.ingredients.includes(ingredient.toLowerCase())
//                 );

//             return matchesAllergies && matchesMainIngredient;
//         });
//     };

//     const recommendedPoke = filterPoke(surveyAnswers);

//     return (
//         <div>
//             {recommendedPoke.length > 0 ? (
//                 recommendedPoke.map((poke) => (
//                     <div key={poke.id}>
//                         <h3>{poke.title}</h3>
//                         <img src={poke.imageUrl} alt={poke.title} />
//                         <p>{poke.description}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>추천된 포케가 없습니다.</p>
//             )}
//         </div>
//     );
// }




