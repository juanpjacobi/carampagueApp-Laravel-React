import React from 'react'
import { Userform } from '../../components/users/UserForm'

export const CreateUser = () => {
  return (
    <>
      <h1 className="text-4xl text-gray-700 text-center">Crear nuevo usuario</h1>
      <div className="bg-white shadow-2xl shadow-gray-700 rounded-md mt-5 px-5 py-10">
       <Userform />
      </div>
    </>
  )
}
