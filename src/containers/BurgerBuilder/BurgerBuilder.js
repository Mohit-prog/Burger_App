import React, { Component } from "react";
import Aux from "../../hoc/Auxi/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const PRICES = {
  meat: 80,
  salad: 30,
  bacon: 50,
  cheese: 20,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 50,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error:false
  };

  componentDidMount() {
    const order = axios.get(
      "https://my-burger-reactjs-cdfe8-default-rtdb.firebaseio.com/ingredients.json"
    );

    order
      .then((response) => {
        this.setState({ ingredients: response.data});
        this.updatePurchaseState(this.state.ingredients);

      })
      .catch((error) => {
       
          this.setState({error:true})
        
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchaseable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;

    const priceAddition = PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });

    this.updatePurchaseState(updatedIngredient);
  };
  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0) return;

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;

    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;

    const priceDeletion = PRICES[type];
    const newPrice = this.state.totalPrice - priceDeletion;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });

    this.updatePurchaseState(updatedIngredient);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    //alert("यह खंड अभी तक नहीं बना है!!");
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Mohit",
        address: {
          state: "New Delhi",
          pincode: "110081",
        },
        email: "m98716@gmail.com",
      },
      deliveryMethod: "cod",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
      });
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;

    let orderSummary=null;
 

   

    let burger = this.state.error?<p style={{textAlign:'center'}}><strong>Can't Load Burger 
                                    <br/>Check your Internet</strong></p>:
                                     <Spinner />;

    if (this.state.ingredients) {
        orderSummary = (
            <OrderSummary
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice}
            />
          );
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientDeleted={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
            purchaseable={this.state.purchaseable}
          />
        </Aux>
      );

    }
    if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
