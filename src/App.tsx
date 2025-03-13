import { Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import HomeScreen from './pages/HomeScreen.tsx';
import MealsScreen from './pages/MealsScreen.tsx';
import ScheduleScreen from './pages/ScheduleScreen.tsx';
import SettingsScreen from './pages/SettingsScreen.tsx';
import AddNewMeal from './pages/AddNewMeal.tsx';
import AddNewSchedule from './pages/AddNewSchedule.tsx';
import AddNewPet from './pages/AddNewPet.tsx';
import { SafeAreaView } from 'react-native-web';
import { MdOutlinePets } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdSchedule } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


function App() {
  const [navActive, setNavActive] = useState({
    home : true,  
    meals : false,  
    schedule : false,  
    settings : false,  
  })

  return (
    <SafeAreaView>
      <div className="flex flex-col h-screen justify-between">
    
        {/* Routes for the app */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/add-new-pet" element={<AddNewPet />} />
          <Route path="/meals" element={<MealsScreen />} />
          <Route path="/add-new-meal" element={<AddNewMeal />} />
          <Route path="/schedule" element={<ScheduleScreen />} />
          <Route path="/add-new-schedule" element={<AddNewSchedule />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>

        {/* Navigation Bar */}
        <nav className="flex justify-around p-4 bg-teal-400">
          <Link
            to="/"
            className={`${navActive.home ? "text-black" : "text-white"} text-lg font-bold`}
            onClick={() => setNavActive({ home: true, meals: false, schedule: false, settings: false })}
            data-testid="pets-btn"
          >
            <MdOutlinePets size={55} className="mx-auto stroke-0"/>
            Pets
          </Link>
          <Link
            to="/meals"
            className={`${navActive.meals ? "text-black" : "text-white"} text-lg font-bold`}
            onClick={() => setNavActive({ home: false, meals: true, schedule: false, settings: false })}
            data-testid="meals-btn"
            >
            <IoFastFoodOutline size={55} className="mx-auto"/>
            Meals
          </Link>
          <Link
            to="/schedule"
            className={`${navActive.schedule ? "text-black" : "text-white"} text-lg font-bold`}
            onClick={() => setNavActive({ home: false, meals: false, schedule: true, settings: false })}
            data-testid="schedule-btn"
          >
            <MdSchedule size={55} className="mx-auto"/>
            Schedule
          </Link>
          <Link
            to="/settings"
            className={`${navActive.settings ? "text-black" : "text-white"} text-lg font-bold`}
            onClick={() => setNavActive({ home: false, meals: false, schedule: false, settings: true })}
            data-testid="settings-btn"
          >
            <IoSettingsOutline size={55} className="mx-auto"/>
            Settings
          </Link>
        </nav>
      </div>
    </SafeAreaView>
  );
}

export default App
