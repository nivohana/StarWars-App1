import React, { useEffect, useState } from 'react';
import { Film } from '../Film/Film';
import styles from './Films.module.css';
import { Spinner } from '../UI/Spinner';
import axios from 'axios';


export const Films = () => {
    const [filmsObject, setFilmsObject] = useState([]);
    const [error, setError] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);




    useEffect(() => {
        axios.get('https://swapi.dev/api/films/')
            .then(res => {
                setShowSpinner(true)
                let filmsObject = []
                for (let key in res.data.results) {
                    filmsObject.push({
                        id: key,
                        title: res.data.results[key].title,
                        producer: res.data.results[key].producer,
                    })
                }
                setFilmsObject(filmsObject);
                setShowSpinner(false)
            })
            .catch(err => {
                // alert(err.message)
                setShowSpinner(false)
                setError(true);
            })
    }, [])

    return (
        <div className={styles.films}>
            {error ?
                <h1> Something Went Wrong...</h1>
                :
                <div>
                    {showSpinner ?
                        <div>
                            <Spinner />
                        </div>
                        :
                        <div>
                            <h1>Top Star Wars Movies</h1>
                            <h3>Choose the one you like...</h3>
                            {filmsObject.map(film => <Film
                                key={film.id}
                                id={film.id}
                                title={film.title}
                                producer={film.producer} />
                            )
                            }
                        </div>
                    }
                </div>
            }
        </div>
    );
}