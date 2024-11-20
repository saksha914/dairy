import { Link } from 'react-router-dom';
import { FaRobot, FaBoxOpen, FaChartLine, FaMoneyBillWave, FaRegListAlt, FaHeartbeat, FaClinicMedical, FaBell } from 'react-icons/fa';
import { GiAnimalSkull } from "react-icons/gi";

export default function Sidebar() {
  return (
    <div className="bg-green-600 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-3xl font-bold">Dashboard</h2>
      </div>
      <ul className="space-y-2 text-lg">
        <li>
          <Link
            to="notifications"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700 relative"
          >
            <FaBell className="mr-3" /> Notifications
          </Link>
        </li>
        <li>
          <Link
            to="products"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaBoxOpen className="mr-3" /> Products
          </Link>
        </li>
        <li>
          <Link
            to="sales"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaChartLine className="mr-3" /> Sales
          </Link>
        </li>
        <li>
          <Link
            to="expense"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaRegListAlt className="mr-3" /> Expenses
          </Link>
        </li>
        <li>
          <Link
            to="financials"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaMoneyBillWave className="mr-3" /> Financials
          </Link>
        </li>
        <li>
          <Link
            to="livestock"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <GiAnimalSkull className="mr-3" /> Livestock
          </Link>
        </li>
        <li>
          <Link
            to="breedingrecord"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaHeartbeat className="mr-3" /> Breeding Record
          </Link>
        </li>
        <li>
          <Link
            to="healthrecord"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaClinicMedical className="mr-3" /> Health Records
          </Link>
        </li>
        <li>
          <Link
            to="ai"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaRobot className="mr-3" /> Ai Assistance
          </Link>
        </li>
        <li>
          <Link
            to="deleteaccount"
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-green-700"
          >
            <FaRobot className="mr-3" /> Delete Account
          </Link>
        </li>
      </ul>
    </div>
  );
}
