import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AddNewMeal from "../pages/AddNewMeal.tsx";
import mealsReducer from "../redux/Meals.tsx";

const store = configureStore({
    reducer: {
        meals: mealsReducer
    }
});

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
});
