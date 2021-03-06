import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
       OrderForm:{
           
                name: {
                    elementType:'input',
                    elementConfig:{
                       type:'text',
                       placeholder:'Your Name..'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
              city: {
                elementType:'input',
                elementConfig:{
                   type:'text',
                   placeholder:'Your City..'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            pincode: {
                elementType:'input',
                elementConfig:{
                   type:'text',
                   placeholder:'Pincode..'
                },
                value:'',
                validation:{
                    required:true,
                    length:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                   type:'text',
                   placeholder:'Country..'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                   type:'email',
                   placeholder:'Your Email..'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
           deliveryMethod: {
            elementType:'select',
            elementConfig:{
              options:[
                  {value:'fastest',displayValue:'Fastest'},
                  {value:'standard',displayValue:'Standard'}
              ]
            },
            value:'fastest',
            validation:{},
            valid:true
        }
       },
       formIsValid:false,
        loading: false
    }


        checkValidity(value,rules){
                 let isValid=true;
                 

                 if(!rules)
                 return true;

                 if(rules.required)
                 isValid=value.trim()!==''

                 if(rules.length)
                          isValid=(value.length===rules.length && isValid);

                 

                 return isValid;
        }



    orderHandler = ( event ) => {
      
        event.preventDefault();
        const formData={};

        for(let id in this.state.OrderForm){
            formData[id]=this.state.OrderForm[id].value;
        }
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData:formData
           
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
               this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    inputChangedHandler=(event,id)=>{
    const updatedOrderForm={
        ...this.state.OrderForm
    }
    const updatedFormElement={
        ...updatedOrderForm[id]
    }

     updatedFormElement.value=event.target.value;
     updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
     updatedFormElement.touched=true;
     updatedOrderForm[id]=updatedFormElement;

     let formIsValid=true;
     for(let key in updatedOrderForm){
         formIsValid=updatedOrderForm[key].valid  && formIsValid;
     }
 
     this.setState({OrderForm:updatedOrderForm,formIsValid:formIsValid})

    }

    render () {

        const formElementArray=[];
        for (let key in this.state.OrderForm)
        {
            formElementArray.push({
                id:key,
                config:this.state.OrderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
               
                {
                    formElementArray.map(formElement=>{
                        return <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event)=>this.inputChangedHandler(event,formElement.id)}

                        />
                    })
                }
                
                <Button disabled={!this.state.formIsValid} btnType="Success">Place Order</Button>
            </form>
            
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;