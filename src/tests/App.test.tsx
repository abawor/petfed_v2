import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, useLocation } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import petsReducer from "../redux/Pets.tsx";
import mealsReducer from "../redux/Meals.tsx";
import App from '../App.tsx';

const loadingStore = configureStore({
    reducer: {
        pets: petsReducer,
        meals: mealsReducer
    }
});

function CurrentRoute() {
    const location = useLocation();
    return <span data-testid="current-route">{location.pathname}</span>;
};

describe("App Component", () => {
    it("Renders App without crashing", () => {
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
             </Provider>
        );
    });

    it("Renders Route links", () => {
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        const petsLink = screen.getByText("Pets");
        const mealsLink = screen.getByText("Meals");
        const scheduleLink = screen.getByText("Schedule");
        const settingsLink = screen.getByText("Settings");
        expect(petsLink).toBeInTheDocument();
        expect(mealsLink).toBeInTheDocument();
        expect(scheduleLink).toBeInTheDocument();
        expect(settingsLink).toBeInTheDocument();
    });

    it("Navigates to main routes correctly", async () => {
        render(
            <Provider store={loadingStore}>
                    <MemoryRouter>
                        <App />
                        <CurrentRoute />
                    </MemoryRouter>
            </Provider>
        );
        const user = userEvent.setup();

        const petsBtn = screen.getByTestId("pets-btn");
        const mealsBtn = screen.getByTestId("meals-btn");
        const scheduleBtn = screen.getByTestId("schedule-btn");
        const settingsBtn = screen.getByTestId("settings-btn");
        
        let currentRoute = screen.getByTestId("current-route");
        expect(currentRoute.textContent).toBe("/")

        await user.click(mealsBtn);
        currentRoute = screen.getByTestId("current-route");
        expect(currentRoute.textContent).toBe("/meals")

        await user.click(scheduleBtn);
        currentRoute = screen.getByTestId("current-route");
        expect(currentRoute.textContent).toBe("/schedule")

        await user.click(settingsBtn);
        currentRoute = screen.getByTestId("current-route");
        expect(currentRoute.textContent).toBe("/settings")

        await user.click(petsBtn);
        currentRoute = screen.getByTestId("current-route");
        expect(currentRoute.textContent).toBe("/")

    });
});
