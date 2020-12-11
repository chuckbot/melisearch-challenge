import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from './Spinner';
import GetData from './GetData';
import ItemProductDetail from './ItemProductDetail';
import '../assets/styles/Items.scss';
import ErrorImage from '../assets/img/ErrorImage.jpg';
import NotFoundImage from '../assets/img/NotFoundImage.jpg';

function ItemProduct() {
    const [loader, setLoader] = useState(true)
    const [searchStatus, setSearchStatus] = useState()
    const [items, setItems] = useState()
    const history = useHistory()

    useEffect(() => {
        const getItem = () => {
            let search = window.location.pathname.toString().split('/')
            search = search[2]

            if (search) {
                GetData.getItem(search)
                    .then(response => {
                        setSearchStatus(200)
                        setItems(response.item)
                        setLoader(false)
                    })
                    .catch(error => {
                        setSearchStatus(500)
                        setLoader(false)
                    })
            } else {
                setLoader(false)
            }
        }

        getItem();

        return history.listen((location) => {
            getItem()
        })

    }, [history]);

    const showResults = () => {
        if (searchStatus === 200 && items) {
            return (
                <ItemProductDetail items={items} />
            )
        } else {
            let title
            let smallTitle
            let imageMsg

            if (searchStatus === 200) {
                title = 'No hay publicaciones que coincidan con tu búsqueda.'
                smallTitle = 'Utilizá palabras más genéricas o menos palabras.'
                imageMsg = NotFoundImage;
            } else {
                title = '¡Ooops!, ha ocurrido un error al procesar tu búsqueda.'
                smallTitle = 'Inténtalo nuevamente.'
                imageMsg = ErrorImage;
            }

            return (
                <div className="items">
                    <div className="card-message">
                        <img src={imageMsg} alt="Nunca dejes de buscar" />
                        <div className="items-textbox">
                            <h3>{title}</h3>
                            <small className="items-smalltitle">{smallTitle}</small>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            { loader ? <Spinner /> : showResults()}
        </div>
    )
}

export default ItemProduct;