export type NewPet = {
    name: string;
    photo: string;
    schedules: Schedule[];
    feedingLog: [];
};

export type Pet = {
    id: string;
    name: string;
    photo: string;
    schedules: Schedule[];
    feedingLog: [];
};

export type NewMeal = {
    name: string;
    quantity: string;
    type: string;
    unit: string;
};

export type Meal = {
    id: string;
    name: string;
    quantity: string;
    type: string;
    unit: string;
};

export type Schedule = {
    id: string;
    days: string[];
    name: string;
    reminder: boolean;
    time: string;
};
