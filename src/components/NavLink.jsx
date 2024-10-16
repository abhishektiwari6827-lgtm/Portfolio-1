import { Link } from 'react-router-dom'

export default function NavLink({ to, children, ...props }) {
  return (
    <Link 
      to={to} 
      className="text-gray-300 hover:text-white transition-colors duration-200"
      {...props}
    >
      {children}
    </Link>
  )
}