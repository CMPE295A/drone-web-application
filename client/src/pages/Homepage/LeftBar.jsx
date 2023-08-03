import './leftBar.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const LeftBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <div className='leftBar'>
      <div className='container'>
        <div className='menu'>
          <NavLink to='/dashboard' style={{ textDecoration: 'none' }}>
            <div className={`item ${isActive('/dashboard') ? 'active' : ''}`}>
              <HomeOutlinedIcon className='option' />
              <span className='option'>Dashboard</span>
            </div>
          </NavLink>
          <NavLink to='/settings' style={{ textDecoration: 'none' }}>
            <div className={`item ${isActive('/settings') ? 'active' : ''}`}>
              <SettingsIcon className='option' />
              <span className='option'>Settings</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};


export default LeftBar;
