import React from 'react';
import './CSS/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import amazon__icon from "./Images/amazon__icon.png";
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  }

 
  return (
    <div className='header'>
      <Link to='/'>
        <img className='header__logo' src={amazon__icon} alt='amazon-logo'></img>
      </Link>
      
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to='/login' className='signin__link'>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">Hello, {user?.email}</span>
            <span className="header__optionLineTwo">{ user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>

          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

        <Link to='/checkout' className='checkout__bag'>
          <div className="header__optionBasket">
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
            <ShoppingBasketIcon />
          </div>
        </Link>
          
        
      </div>
    </div>
  );
}


export default Header