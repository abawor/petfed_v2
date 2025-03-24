import { describe, it, expect } from "vitest";
import { getByLabelText, getByTestId, render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import AddNewMeal from "../pages/AddNewMeal.tsx";
import mealsReducer from "../redux/Meals.tsx";
import MealsScreen from "../pages/MealsScreen.tsx";

const store = configureStore({
    reducer: {
        meals: mealsReducer
    }
});

function CurrentRoute() {
    const location = useLocation();
    return <span data-testid="current-route">{location.pathname}</span>;
}

describe("Add New Meal Component", () => {
    it("Displays all fields for adding a new meal", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/add-new-meal"]}>
                    <Routes>
                        <Route path="/add-new-meal" element={<AddNewMeal />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const nameInput = screen.getByTestId("meal-name-input");
        expect(nameInput).toBeInTheDocument();

        const typeSelect = screen.getByTestId("food-type-form");
        expect(typeSelect).toHaveFormValues({food_type: ""})

        const unitSelect = screen.getByTestId("unit-type-form");
        expect(unitSelect).toHaveFormValues({unit_type: ""})

        const quantitySelect = screen.getByTestId("meal-quantity-input");
        expect(quantitySelect).toBeInTheDocument();

        const saveBtn = screen.getByTestId("meal-save-btn");
        expect(saveBtn).toBeInTheDocument();
    })

    it("Navigates to MealsScreen when a new meal is added", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/add-new-meal"]}>
                    <Routes>
                        <Route path="/add-new-meal" element={<><AddNewMeal /><CurrentRoute /></>} />
                        <Route path="/meals" element={<><MealsScreen /><CurrentRoute /></>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const user = userEvent.setup();

        const nameInput = screen.getByTestId("meal-name-input");
        await user.type(nameInput, "Kibble")

        const typeSelect = screen.getByTestId("food-type-form");
        expect(typeSelect).toHaveFormValues({food_type: ""})
        await selectEvent.select(screen.getByLabelText("Type"), "Dry")
        expect(screen.getByTestId("food-type-form")).toHaveFormValues({food_type: "Dry"})
        
        const unitSelect = screen.getByTestId("unit-type-form");
        expect(unitSelect).toHaveFormValues({unit_type: ""})
        await selectEvent.select(screen.getByLabelText("Unit"), "grams")
        expect(screen.getByTestId("unit-type-form")).toHaveFormValues({unit_type: "grams"})

        const quantitySelect = screen.getByTestId("meal-quantity-input");
        await user.type(quantitySelect, "50")

        const saveBtn = screen.getByTestId("meal-save-btn");
        await user.click(saveBtn)

        const newRoute = screen.getByTestId("current-route");
        expect(newRoute.textContent).toBe("/meals")
        
    })
});
