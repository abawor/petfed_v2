import NameEdit from '../components/NameEdit.tsx';
import PetList from '../components/PetList.tsx';


export default function HomeScreen() {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-xl mb-2">Hello, welcome back</p>
        <NameEdit></NameEdit>
        <PetList />
      </div>
    );
  }
