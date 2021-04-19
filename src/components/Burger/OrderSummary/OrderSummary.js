import React from 'react';
import Auxi from '../../../hoc/Auxi'
const OrderSummary=props=>{
    const ingredientSummary=Object.keys(props.ingredients)
                 .map(igKeys=>{
                     return (
                     <li key={igKeys}>
                     <span style={{textTransform:'capitalize'}}>{igKeys}</span>: {props.ingredients[igKeys]}
                     </li>
                     )
                 })
    return(
        <Auxi>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients</p>
        <ul>
           {ingredientSummary}
        </ul>
        <p>Continue to checkout</p>

        </Auxi>
    );
}

export default OrderSummary;