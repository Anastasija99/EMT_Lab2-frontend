import React from 'react';
import {Link} from 'react-router-dom';
import {ImBooks} from 'react-icons/im';
import {BiCategoryAlt} from 'react-icons/bi';
import './Header.css';

const Header = () => {
    return (
        <header className={"fixed-top"}>
            <nav className={"navbar navbar-dark bg-dark"}>
                <div className={"container-fluid navbar-header justify-content-center"}>
                        <Link className={"btn "} to={"/books"}><ImBooks/> Books</Link>
                        <Link className={"btn "} to={"/categories"}><BiCategoryAlt/> Categories</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;
