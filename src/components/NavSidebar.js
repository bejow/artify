import React from 'react';

export const NavSidebar = (props) => {
    return(
    <div className="primary-nav">

        <button href="#" className="hamburger open-panel nav-toggle">
        <span className="screen-reader-text">Menu</span>
        </button>

            <nav role="navigation" className="menu">

                <a href="#" className="logotype">ART<span>IFY</span></a>

                <div className="overflow-container">

                    <ul className="menu-dropdown">

                        <li><a href="#">Dashboard</a><span className="icon"><i className="fa fa-dashboard"></i></span></li>

                        <li className="menu-hasdropdown">
                            <a href="#">Settings</a><span className="icon"><i className="fa fa-gear"></i></span>

                            <label title="toggle menu" for="settings">
                <span className="downarrow"><i className="fa fa-caret-down"></i></span>
            </label>
                            <input type="checkbox" className="sub-menu-checkbox" id="settings" />

                            <ul className="sub-menu-dropdown">
                                <li><a href="">Profile</a></li>
                                <li><a href="">Security</a></li>
                                <li><a href="">Account</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Favourites</a><span className="icon"><i className="fa fa-heart"></i></span></li>
                        <li><a href="#">Messages</a><span className="icon"><i className="fa fa-envelope"></i></span></li>
                    </ul>

            </div>

        </nav>

    </div>
    )
}