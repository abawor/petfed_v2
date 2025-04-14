import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import SettingsScreen from "../pages/SettingsScreen.tsx";
import petsReducer from "../redux/Pets.tsx";

const emptyStore = configureStore({
    reducer: {
        pets: petsReducer
    }
});

describe("Settings Screen Component", () => {
    it("Renders global notification toggle", () => {
        render(
            <Provider store={emptyStore}>
                <MemoryRouter>
                    <SettingsScreen />
                </MemoryRouter>
            </Provider>
        );
        
        const globalNotificationsToggle = screen.getByTestId("global-notifications-toggle");
        expect(globalNotificationsToggle).toBeInTheDocument()
    })

    it("Changes toggle and saves value to local storage", async () => {
        render(
            <Provider store={emptyStore}>
                <MemoryRouter>
                    <SettingsScreen />
                </MemoryRouter>
            </Provider>
        );
        
        const user = userEvent.setup();
        const globalNotificationsToggle = screen.getByTestId("global-notifications-toggle");

        await user.click(globalNotificationsToggle)

        let notificationSetting = localStorage.getItem("globalNotifications")
        expect(notificationSetting).toBe("false")

        await user.click(globalNotificationsToggle)

        notificationSetting = localStorage.getItem("globalNotifications")
        expect(notificationSetting).toBe("true")  
    })

});