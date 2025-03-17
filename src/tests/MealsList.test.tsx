import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event'
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import mealsReducer from "../redux/Meals.tsx";
import MealsList from '../components/MealsList.tsx';
import AddNewMeal from "../pages/AddNewMeal.tsx";

const loadingStore = configureStore({
    reducer: {
        meals: mealsReducer,
    }
});

const emptyStore = configureStore({
    reducer: {
        meals: () => ({
            meals: [],
            loading: false,
            error: null
        })
    }
});

function CurrentRoute() {
    const location = useLocation();
    return <span data-testid="current-route">{location.pathname}</span>;
}

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

    it("Renders add new meal button and when clicked routes to /add-new-meal", async () => {
        render(
            <Provider store={emptyStore}>
                <MemoryRouter initialEntries={["/meals"]}>
                    <Routes>
                        <Route path="/meals" element={<><MealsList /><CurrentRoute /></>} />
                        <Route path="/add-new-meal" element={<><AddNewMeal /><CurrentRoute /></>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const user = userEvent.setup();
        const addNewMealBtn = screen.getByTestId("add-new-meal-btn");
        expect(addNewMealBtn).toBeInTheDocument();

        await user.click(addNewMealBtn);
        
        const newRoute = screen.getByTestId("current-route");
        expect(newRoute.textContent).toBe("/add-new-meal")
    })

});
