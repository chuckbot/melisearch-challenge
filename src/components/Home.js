import React from 'react';
import logoSearch from '../assets/img/ic_Search.png';

function Home() {
    return (
        <div className="home">
            <div className="card-message">
                <img src={logoSearch} alt="No dejes de buscar"/>
                <div className="card-textbox">
                    <h3>Bienvenido a Mercado Libre</h3>
                    <small className="card-smalltitle">Donde puedes comprar y vender miles de productos en toda Latinoamerica.</small>
                </div>
            </div>
        </div>
    )
}

export default Home;