import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Users } from '../views/users/Users';
import { CreateUser } from '../views/users/CreateUser';

export const UserRouter = () => {
    return (
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/crear" element={<CreateUser />} />
        </Routes>
      );
}
