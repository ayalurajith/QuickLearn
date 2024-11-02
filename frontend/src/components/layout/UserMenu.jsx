import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const UserMenu = () => {
  const [auth] = useAuth();

  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">User Menu</h2>
        <div className="space-y-4">
          <Link
            to="/dashboard/user/profile"
            className="block text-center bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 shadow-md"
          >
           Update Profile
          </Link>
          <Link
            to={`/dashboard/user/orders/${auth.user._id}`}
            className="block text-center bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 shadow-md"
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
