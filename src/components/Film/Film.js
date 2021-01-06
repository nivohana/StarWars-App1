import React, { useState, useEffect} from 'react';
import styles from './Film.module.css';
import { green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';



export const Film = ({ title, producer, id }) => {
    const [clicked, setClicked] = useState(false);

    useEffect(()=> {
        const localData = localStorage.getItem(`selectedFilm_${id}`);
        setClicked(() => {
            if(localData == null){
                return false
            }else {
                return JSON.parse(localData)
            }
        });
    },[]);

    useEffect(() => {
        localStorage.setItem(`selectedFilm_${id}`, clicked)
    },[clicked]);

      
    const clickedHandler= () => {
        setClicked(prev => !prev);
    }


    return (
        <div className={styles.film} onClick={clickedHandler}>
            { clicked ?
                <div> 
                    <h3> {title} </h3>
                    <div> {producer} </div>
                        <br></br>
                    <CheckCircleOutlineIcon style={{ color: green[500] }} />
                </div>
                :
                <div> 
                    <h3> {title} </h3>                    
                    <p> {producer} </p>
                </div>
            }
                
        </div>
    );

}
