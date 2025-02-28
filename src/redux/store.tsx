import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./Meals.tsx";
import petsReducer from "./Pets.tsx";

export default configureStore({
    reducer: {
        meals: mealsReducer,
        pets: petsReducer
    }
});
