import { NavLink } from 'react-router-dom';

interface SectionNavItemProps {
  to: string;
  label: string;
  indent?: boolean;
  bold?: boolean;
  onClick?: () => void;
}

export default function SectionNavItem({
  to,
  label,
  indent = false,
  bold = false,
  onClick,
}: SectionNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        `block py-1.5 text-sm transition-colors truncate
        ${indent ? 'pl-6' : 'pl-4'} pr-4
        ${bold ? 'font-semibold' : 'font-normal'}
        ${
          isActive
            ? 'text-blue-700 bg-blue-50 border-r-2 border-blue-500'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        }`
      }
    >
      {label}
    </NavLink>
  );
}
