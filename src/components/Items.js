import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Spinner from './Spinner';
import GetData from './GetData';
import Item from './Item';
import '../assets/styles/Items.scss';

function Items() {
    const [loader, setLoader] = useState(true)
    const [searchStatus, setSearchStatus] = useState()
    const [categories, setCategories] = useState()
    const [items, setItems] = useState()
    const history = useHistory()

    useEffect(() => {
        const makeSearch = () => {
            let search = window.location.search
            const parsedSearch = queryString.parse(search);
            search = parsedSearch.search

            if (search) {
                GetData.searchItem(search)
                    .then(response => {
                        setSearchStatus(200)
                        setCategories(response.categories)
                        setItems(response.items)
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

        makeSearch();

        return history.listen((location) => {
            makeSearch()
        })

    }, [history]);

    const showResults = () => {
        if (searchStatus === 200 && items) {
            let arrayCateg;

            if(categories){ arrayCateg = categories.toString().split(',')}

            return (
                <Item categories={arrayCateg} items={items} />
            )
        } else {
            let title
            let smallTitle
            let imageMsg

            if (searchStatus === 200) {
                title = 'No hay publicaciones que coincidan con tu búsqueda.'
                smallTitle = 'Utilizá palabras más genéricas o menos palabras.'
            } else {
                title = '¡Ooops!, ha ocurrido un error al procesar tu búsqueda.'
                smallTitle = 'Por favor inténtalo nuevamente, ¡nunca dejes de buscar!.'
            }

            return (
                <div className="items">
                    <div className="card-message">
                        <img src={imageMsg} alt="Nunca dejes de buscar" />
                        <div className="card-textbox">
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

export default Items;
