import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AddNewSchedule from "../pages/AddNewSchedule.tsx";
import petsReducer from "../redux/Pets.tsx";

const store = configureStore({
    reducer: {
        pets: petsReducer
    }
});

describe("Add New Schedule Component", () => {
    it("Displays all fields for adding a new schedule", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/add-new-schedule"]}>
                    <Routes>
                        <Route path="/add-new-schedule" element={<AddNewSchedule />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        
        const petSelect = screen.getByTestId("pet-form");
        expect(petSelect).toHaveFormValues({pet: ""})
        
        const nameInput = screen.getByTestId("schedule-name-input");
        expect(nameInput).toBeInTheDocument();

        const daysSelect = screen.getByTestId("days-form");
        expect(daysSelect).toHaveFormValues({days: ""})

        const timeInput = screen.getByTestId("time-input");
        expect(timeInput).toBeInTheDocument();

        const saveBtn = screen.getByTestId("schedule-save-btn");
        expect(saveBtn).toBeInTheDocument();
    })

});
