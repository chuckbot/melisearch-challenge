import React from 'react';
import HomeImage from '../assets/img/HomeImage.jpg';

function Home() {
    return (
        <div className="home">
            <div className="card-message">
                <img src={HomeImage} alt="Comienza a buscar"/>
                <div className="card-textbox">
                    <h3>Bienvenido a Mercado Libre</h3>
                    <small className="card-smalltitle">Descubri la mejor forma de comprar online.</small>
                </div>
            </div>
        </div>
    )
}

export default Home;