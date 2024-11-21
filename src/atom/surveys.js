// surveys.js
import { atom, useRecoilState } from "recoil";
import { useEffect, useMemo } from "react";
import { recoilPersist } from "recoil-persist";
import { useUser } from "./user";

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
    default: {},
    effects_UNSTABLE: [persistAtom],
});

// Allergies & Vegan
export const useAllergyPreferences = (initValue) => {
    const [allergies, setAllergies] = useRecoilState(allergiesState);
    const [isVegan, setIsVegan] = useRecoilState(isVeganState);
    const { user } = useUser();

    useEffect(() => {
        if (initValue) {
            setAllergies((prev) => ({
                ...prev,
                [user]: initValue.allergies || [],
            }));
            setIsVegan((prev) => ({
                ...prev,
                [user]: initValue.isVegan || false,
            }));
        }
    }, [initValue, setAllergies, setIsVegan, user]);

    const targetAllergy = useMemo(() => allergies?.[user] || [], [allergies, user]);
    const targetVegan = useMemo(() => isVegan?.[user] || false, [isVegan, user]);

    return {
        allergies: targetAllergy,
        setAllergies,
        isVegan: targetVegan,
        setIsVegan,
    };
};

// Survey answers
export const useSurveyAnswers = (initValue) => {
    const [surveyAnswers, setSurveyAnswers] = useRecoilState(surveyAnswersState);
    const { user } = useUser();

    useEffect(() => {
        if (initValue) {
            setSurveyAnswers((prev) => ({
                ...prev,
                [user]: initValue.surveyAnswers || [],
            }));
        }
    }, [initValue, setSurveyAnswers, user]);

    const targetSurveyAnswers = useMemo(() => surveyAnswers?.[user] || [], [surveyAnswers, user]);

    return { surveyAnswers: targetSurveyAnswers, setSurveyAnswers };
};