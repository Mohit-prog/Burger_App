import React from 'react';
import classes from './BuildControl.module.css'

const BuildControl=(props)=>(
    <div className={classes.BuildControl}>

    <div className={classes.Label}>{props.label}</div>

    <button  className={classes.More} 
    onClick={props.added}>
    Increase
    </button>
    <button className={classes.Less}
     onClick={props.deleted} 
     disabled={props.disabled}>
     Decrease
     </button>
        
    </div>
);

export default BuildControl;