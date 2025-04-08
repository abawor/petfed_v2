import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import petsReducer from "../redux/Pets.tsx";
import ScheduleList from '../components/ScheduleList.tsx';
import AddNewSchedule from '../pages/AddNewSchedule.tsx';

const loadingStore = configureStore({
    reducer: {
        pets: petsReducer,
    }
});

const emptyStore = configureStore({
    reducer: {
        pets: () => ({
            pets: [],
            loading: false,
            error: null
        })
    }
});

const store = configureStore({
    reducer: {
        pets: () => ({
            pets: [{
                id: '1',
                name: 'poppy',
                photo: 'poppy.jpg',
                schedules: [{
                    id: '1',
                    days: ["Monday", "Tuesday"],
                    name: "Breakfast",
                    reminder: true,
                    time: "9:00"
                }]
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

describe("ScheduleList Component", () => {
    it("Renders without crashing", () => {
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <ScheduleList />
                </MemoryRouter>
             </Provider>
        );
        const loadingMsg = screen.getByTestId("schedule-list-loading");
        expect(loadingMsg).toBeInTheDocument();
        expect(loadingMsg).toHaveTextContent(/Loading schedules...$/);
    });

    it("Renders add new schedule button and when clicked routes to /add-new-schedule", async () => {
        render(
            <Provider store={emptyStore}>
                <MemoryRouter initialEntries={["/schedule"]}>
                    <Routes>
                        <Route path="/schedule" element={<><ScheduleList /><CurrentRoute /></>} />
                        <Route path="/add-new-schedule" element={<><AddNewSchedule /><CurrentRoute /></>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const user = userEvent.setup();
        const addNewScheduleBtn = screen.getByTestId("add-new-schedule-btn");
        expect(addNewScheduleBtn).toBeInTheDocument();

        await user.click(addNewScheduleBtn);
        
        const newRoute = screen.getByTestId("current-route");
        expect(newRoute.textContent).toBe("/add-new-schedule")
    })

    it("Renders a schedule from store", () => {
                render(
                    <Provider store={store}>
                        <MemoryRouter>
                            <ScheduleList />
                        </MemoryRouter>
                     </Provider>
                );
                const scheduleItem = screen.getByTestId("schedule-item");
                expect(scheduleItem).toBeInTheDocument();
        });
});
