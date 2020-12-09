import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../assets/styles/Grid.scss'
import '../assets/styles/Header.scss'
import logo from '../assets/img/Logo_ML.png'

function Header() {
    const history = useHistory();
    const searchRef = React.createRef();

    const searchItem = e => {
        e.preventDefault();

        const searchValue = searchRef.current.value;

        if(searchValue && searchValue != null){
            history.push('/items?search='+searchValue);
        }
    }

    return (
        <header id="header">
            <form className="header-container" onSubmit={searchItem}>
                <Link to="/">
                    <img className="logo" src={logo} alt="Mercado Libre Argentina - Donde comprar y vender de todo" />
                </Link>

                <input type="text" className="input-search" ref={searchRef} placeholder="Buscar productos, marcas y mas..." />
                <button type="submit" className="btn-search" />
            </form>
        </header>
    )
}

export default Header;