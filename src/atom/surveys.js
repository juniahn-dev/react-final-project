// surveys.js
import { atom, useRecoilState } from "recoil";
import { useEffect, useMemo } from "react";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const allergiesState = atom({
    key: "allergiesState",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const isVeganState = atom({
    key: "isVeganState",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const surveyAnswersState = atom({
    key: "surveyAnswersState",
    default: {
        mainIngredient: [],
        preferredFlavour: [],
    },
    effects_UNSTABLE: [persistAtom],
});

// Allergies & Vegan
export const useAllergyPreferences = (initValue) => {
    const [allergies, setAllergies] = useRecoilState(allergiesState);
    const [isVegan, setIsVegan] = useRecoilState(isVeganState);

    useEffect(() => {
        if (initValue) {
            setAllergies(initValue.allergies || []);
            setIsVegan(initValue.isVegan || false);
        }
    }, [initValue, setAllergies, setIsVegan]);

    return {
        allergies,
        setAllergies,
        isVegan,
        setIsVegan,
    };
};

// Survey answers
export const useSurveyAnswers = () => {
    const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
    return { surveyAnswers, setSurveyAnswers };
};