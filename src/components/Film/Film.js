import React, { useState, useEffect} from 'react';
import styles from './Film.module.css';
import { green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


export const Film = ({ title, producer, id }) => {
    //initializing the film box status, On/Off
    const [status, setStatus] = useState(false);

    //getting the unique data from the browser local storage
    useEffect(()=> {
        const localData = localStorage.getItem(`selectedFilm_${id}`);
        setStatus(() => {
            if(localData == null){
                return false
            }else {
                return JSON.parse(localData)
            }
        });
    },[]);

    //setting the unique data to the browser local storage,
    //calling the useEffect whenever the box status changes
    useEffect(() => {
        localStorage.setItem(`selectedFilm_${id}`, status)
    },[status]);

      
    const statusHandler= () => {
        setStatus(prev => !prev);
    }


    return (
        <div className={styles.film} onClick={statusHandler}>
            { status ?
                <div> 
                    <h3> {title} </h3>
                    <div>
                        Producer:<br></br>
                        {producer}
                    </div>
                        <br></br>
                    <CheckCircleOutlineIcon style={{ color: green[500] }} />
                </div>
                :
                <div> 
                    <h3> {title} </h3>                    
                    <div>
                        Producer:<br></br>
                        {producer}
                    </div>
                </div>
            }
                
        </div>
    );

}
