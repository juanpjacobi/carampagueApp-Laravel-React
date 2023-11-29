import React from 'react'
import { Link } from 'react-router-dom'

export const InfoIcon = ({id}) => {
  return (
    <Link to={`/clientes/${id}`}>
        <svg className="h-8 w-8 text-teal-600 cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="8" x2="12.01" y2="8" />  <rect x="4" y="4" width="16" height="16" rx="2" />  <polyline points="11 12 12 12 12 16 13 16" /></svg>
    </Link>
  )
}
