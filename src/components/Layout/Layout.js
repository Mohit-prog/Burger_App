import React from 'react';
import Aux from '../../hoc/Auxi';
import classes from './Layout.module.css'
const layout =(props)=>(
    <Aux>
    <div>toolbar,sidebar,backdrop</div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </Aux>
)
export default layout;