import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import petsReducer from "../redux/Pets.tsx";
import ScheduleList from '../components/ScheduleList.tsx';

const loadingStore = configureStore({
    reducer: {
        pets: petsReducer,
    }
});

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
});
