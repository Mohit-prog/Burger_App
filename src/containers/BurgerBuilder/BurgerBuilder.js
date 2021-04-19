import React,{Component} from 'react';
import  Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
const PRICES={
    meat:80,
    salad:30,
    bacon:50,
    cheese:20
};
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0 
        },
        totalPrice:50,
        purchaseable:false
    }
    
    updatePurchaseState(ingredients){
       
        const sum=Object.keys(ingredients)
            .map(igKey=>{
              return ingredients[igKey]
            }).reduce((sum,el)=>{
                return sum+el;
            },0);

        this.setState({purchaseable:sum>0});

    }
addIngredientHandler=type=>{
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredient={...this.state.ingredients};
              updatedIngredient[type]=updatedCount;

    const priceAddition =PRICES[type];
    const newPrice=this.state.totalPrice+priceAddition;
              this.setState({totalPrice:newPrice,ingredients:updatedIngredient});
        
              this.updatePurchaseState(updatedIngredient);
}
removeIngredientHandler=type=>{
    if(this.state.ingredients[type]<=0)return;

    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount-1;
   
    const updatedIngredient={...this.state.ingredients};
              updatedIngredient[type]=updatedCount;

    const priceDeletion =PRICES[type];
    const newPrice=this.state.totalPrice-priceDeletion;
              this.setState({totalPrice:newPrice,ingredients:updatedIngredient});

              this.updatePurchaseState(updatedIngredient);   
}
    
    render(){
        const disabledInfo={...this.state.ingredients};

        for(let key in disabledInfo)
         disabledInfo[key]=disabledInfo[key]<=0;

        return(
            <Aux>
              <Burger ingredients={this.state.ingredients}/>
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientDeleted={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
            />
            </Aux>
        );
    }
}

export default BurgerBuilder;