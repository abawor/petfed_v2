import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./Meals.tsx";
import petsReducer from "./Pets.tsx";

const store = configureStore({
    reducer: {
        meals: mealsReducer,
        pets: petsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store
