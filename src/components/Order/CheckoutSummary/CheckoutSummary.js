import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
const checkoutSummary=props=>{
  return(
      <div className={classes.CheckoutSummary}>
          <h1>Your Delicious burger :-|</h1>
          <div style={{width:'100%',margin:'auto'}}>
              <Burger
              ingredients={props.ingredients}
               />
          </div>

          <Button 
          btnType="Success"
          clicked={props.checkoutContinued}
          >PROCEED

          </Button>
          <Button 
          btnType="Danger"
          clicked={props.checkoutCancelled}
          >CANCEL
          </Button>

      </div>
  );

}

export default checkoutSummary;