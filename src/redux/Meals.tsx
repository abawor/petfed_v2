import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/config.ts";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { AppDispatch } from "../redux/store";
import { Meal } from "../../types.ts";

type MealsState = {
    meals: Meal[];
    loading: boolean;
    error: string | null;
};

const initialState: MealsState = {
    meals: [],
    loading: false,
    error: null
}

export const mealsSlice = createSlice({
    name: "meals",
    initialState: initialState,
    reducers: {
        setMeals: (state, action) => {
            state.meals = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        deleteMealLocally: (state, action) => {
            state.meals = state.meals.filter(meal => meal.id !== action.payload)
        }
    }
});

export const { setMeals, setLoading, setError, deleteMealLocally } = mealsSlice.actions

export const fetchMeals = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const mealsCol = collection(db, "meals")
        const mealsSnapshot = await getDocs(mealsCol)
        const meals = mealsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        dispatch(setMeals(meals))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    } finally {
        dispatch(setLoading(false))
    }
}

export const addMeal = (meal: Meal) => async (dispatch: AppDispatch) => {
    try {
        const mealsCol = collection(db, "meals")
        await addDoc(mealsCol, meal)
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    }
}

export const deleteMeal = (mealId: Meal["id"]) => async (dispatch: AppDispatch) => {
    try {
        const mealDoc = doc(db, "meals", mealId)
        await deleteDoc(mealDoc)
        dispatch(deleteMealLocally(mealId))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    }
}

export default mealsSlice.reducer;
