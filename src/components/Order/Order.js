import React, { Component } from 'react';
import classes from './Order.module.css'

const order=props=>(
    <div className={classes.Order}>
             <p>ingredients:salad</p>
             <strong>Price:80Rs</strong>
    </div>
);
export default order;