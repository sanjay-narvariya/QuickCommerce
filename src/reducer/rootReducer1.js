
const initialState={
    product:{}
}

export default function rootReducer1(state=initialState,action)
{
      switch(action.type)
      {
         case "ADD_PRO":
           state.product[action.payload[0]]=action.payload[1]
               return({product:state.product})
       
         case "EDIT_PRO":
              state.product[action.payload[0]]=action.payload[1]
               return({product:state.product})
     
         case "DELETE_PRO":
              delete  state.product[action.payload[0]]
               //  return({product:state.product})
       
        default:
            return({product:state.product})

      }
}