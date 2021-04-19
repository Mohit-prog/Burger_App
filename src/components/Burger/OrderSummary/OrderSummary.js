import React from 'react';
import Auxi from '../../../hoc/Auxi'
import Button from '../../UI/Button/Button'
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
        <p>Continue to checkout ?</p>
        <p><strong>Total price : {props.price}rs</strong></p>
        <Button
        btnType="Danger"
        clicked={props.purchaseCancelled}
        >CANCEL
        </Button>
        <Button
        btnType="Success"
        clicked={props.purchaseContinued}
        >
        CONTINUE
        </Button>
        </Auxi>
    );
}

export default OrderSummary;