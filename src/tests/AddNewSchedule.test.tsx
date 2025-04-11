import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import AddNewSchedule from "../pages/AddNewSchedule.tsx";
import ScheduleScreen from "../pages/ScheduleScreen.tsx";
import petsReducer from "../redux/Pets.tsx";

const emptyStore = configureStore({
    reducer: {
        pets: petsReducer
    }
});

const store = configureStore({
    reducer: {
        pets: () => ({
            pets: [{
                id: '1',
                name: 'Poppy',
                photo: 'poppy.jpg',
                schedules: []
            }],
            loading: false,
            error: null
        })
    }
});

function CurrentRoute() {
    const location = useLocation();
    return <span data-testid="current-route">{location.pathname}</span>;
}

describe("Add New Schedule Component", () => {
    it("Displays all fields for adding a new schedule", async () => {
        render(
            <Provider store={emptyStore}>
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

    it("Navigates to ScheduleScreen when a new schedule is added", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/add-new-schedule"]}>
                    <Routes>
                        <Route path="/add-new-schedule" element={<><AddNewSchedule /><CurrentRoute /></>} />
                        <Route path="/schedule" element={<><ScheduleScreen /><CurrentRoute /></>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const user = userEvent.setup();

        const petSelect = screen.getByTestId("pet-form");
        expect(petSelect).toHaveFormValues({pet: ""})
        await selectEvent.select(screen.getByLabelText("Pet"), "Poppy")
        expect(screen.getByTestId("pet-form")).toHaveFormValues({pet: "1"})

        const nameInput = screen.getByTestId("schedule-name-input");
        await user.type(nameInput, "Breakfast")

        const daysSelect = screen.getByTestId("days-form");
        expect(daysSelect).toHaveFormValues({days: ""})
        await selectEvent.select(screen.getByLabelText("Days"), "Monday")
        expect(screen.getByTestId("days-form")).toHaveFormValues({days: "Monday"})

        const timeInput = screen.getByTestId("time-input");
        await user.type(timeInput, "9:32")

        const saveBtn = screen.getByTestId("schedule-save-btn");
        await user.click(saveBtn)

        const newRoute = screen.getByTestId("current-route");
        expect(newRoute.textContent).toBe("/schedule")
        
    })

});
