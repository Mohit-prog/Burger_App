import React,{Component}from 'react';
import Auxi from '../../../hoc/Auxi/Auxi'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component{

   /* componentWillMount()
    {
        console.log('order summary');

    }*/
   
                 render(){
                    const ingredientSummary=Object.keys(this.props.ingredients)
                    .map(igKeys=>{
                        return (
                        <li key={igKeys}>
                        <span style={{textTransform:'capitalize'}}>{igKeys}</span>:
                         {this.props.ingredients[igKeys]}
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
                        <p><strong>Total price : {this.props.price}rs</strong></p>
                        <Button
                        btnType="Danger"
                        clicked={this.props.purchaseCancelled}
                        >CANCEL
                        </Button>
                        <Button
                        btnType="Success"
                        clicked={this.props.purchaseContinued}
                        >
                        CONTINUE
                        </Button>
                        </Auxi>);
                 }
  
}

export default OrderSummary;