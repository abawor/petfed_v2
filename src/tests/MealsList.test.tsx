import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import mealsReducer from "../redux/Meals.tsx";
import MealsList from '../components/MealsList.tsx';

const loadingStore = configureStore({
    reducer: {
        meals: mealsReducer,
    }
});

describe("MealList Component", () => {
    it("Renders without crashing", () => {
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <MealsList />
                </MemoryRouter>
             </Provider>
        );
        const loadingMsg = screen.getByTestId("meal-list-loading");
        expect(loadingMsg).toBeInTheDocument();
        expect(loadingMsg).toHaveTextContent(/Loading meals...$/);
    });
});
