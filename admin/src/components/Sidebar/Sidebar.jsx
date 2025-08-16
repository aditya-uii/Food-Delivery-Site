import { assets } from '../../assets/assets'; 
import { NavLink } from 'react-router-dom';
// import './Side.css';

const Sidebar = () => {
  return (
    <div className="sidebar w-[18%] min-h-[100vh] border border-[#a9a9a9] border-t-0">
      <div className="sidebar-options pt-[50px] pl-[20%] flex flex-col gap-[20px]">
        {[
          { to: '/add', icon: assets.add_icon, label: 'Add items' },
          { to: '/list', icon: assets.order_icon, label: 'List items' },
          { to: '/orders', icon: assets.order_icon, label: 'Orders' }
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-option flex items-center gap-3 border border-[#a9a9a9] border-r-0 py-[8px] px-[10px] rounded-[10px] ${
                isActive ? 'bg-red-300' : ''
              }`
            }
          >
            <img src={icon} alt={label} />
            <p>{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
