import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
// import Overview from '../Pages/Overview';
import Products from '../Pages/Products';
import Sales from '../Pages/Sales';
import Financials from '../Pages/Financials';
import Expenses from '../Pages/Expenses';
import Livestock from '../Pages/Livestock';
import Breedingrecord from '../Pages/BreedingRecord';
import HealthRecord from '../Pages/HealthRecord';
import Notifications from '../Pages/Notifications';
import Ai from '../Pages/Ai';
import DeleteAccount from '../Pages/DeleteAccount';

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-100">
        <Routes>
          {/* <Route path="overview" element={<Overview />} /> */}
          <Route path='' element={<Notifications/>}></Route>
          <Route path='notifications' element={<Notifications/>}></Route>
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="financials" element={<Financials />} />
          <Route path='expense' element={<Expenses/>}></Route>
          <Route path='livestock' element={<Livestock/>}></Route>
          <Route path='breedingrecord' element={<Breedingrecord/>}></Route>
          <Route path='healthrecord' element={<HealthRecord/>}></Route>
          <Route path='ai' element={<Ai/>}></Route>
          <Route path='deleteaccount' element={<DeleteAccount/>}></Route>
        </Routes>
      </div>  
    </div>
  );
}
