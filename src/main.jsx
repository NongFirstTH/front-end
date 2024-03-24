import ReactDOM from "react-dom/client";
import Index from "./index";




// ReactDOM.createRoot(document.getElementById("root")).render(<Index />);


import React from 'react'
import {store} from "./store/store.ts";
import {Provider} from "react-redux";


ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
       <Provider store={store}>
           <Index />
       </Provider>
   </React.StrictMode>,
)
