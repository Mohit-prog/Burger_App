import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'}
]
const BuildControls=(props)=>(

    <div className={classes.BuildControls}>
    <p>TotalPrice : <strong>{props.price}</strong> Rs</p>
           {
               controls.map(ctrl=>{
                   return <BuildControl 
                   key={ctrl.label} 
                   label={ctrl.label}
                   added={()=>props.ingredientAdded(ctrl.type)}
                   deleted={()=>props.ingredientDeleted(ctrl.type)}
                   disabled={props.disabled[ctrl.type]}
                    />
               })
           }
           <button
            disabled={!props.purchaseable}
            className={classes.OrderButton}>
            Order Now
            </button>

    </div>
);

export default BuildControls;