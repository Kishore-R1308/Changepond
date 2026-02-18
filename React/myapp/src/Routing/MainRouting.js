import { createBrowserRouter } from "react-router-dom";
import MyImagesComp from "../components/MyImagesComp";
import SliderComp from "../components/SliderComp";
import AllHooksComp from "../ReactHooks/AllHooksComp";
import DashboardComp from '../Layout/DashboardComp'
import PafeNotFoundComp from "../Layout/PafeNotFoundComp";
import VirtualDOMComp from "../Layout/VirtualDOMComp";
import UseStateComp from "../ReactHooks/UseStateComp"
import UseEffectComp from "../ReactHooks/UseEffectComp"
import FormValComp from "../components/day3/FormValComp";
import ProductDetailsComp from "../components/day4/Crud_ope/ProductDetailsComp";
import AddproductComp from "../components/day4/Crud_ope/AddproductComp";
import UpdateProductComp from "../components/day4/Crud_ope/UpdateProductComp";
import DataListComp from "../Layout/DataListComp";
import PropComp from "../components/PropComp";

const router = createBrowserRouter([

    {path:"dashboard",element:<DashboardComp />, children:[
    // naming router
    {path:"myimages", element:<MyImagesComp />},
    {path:"comp", element:<PropComp />},

    {path:"virtualdom", element:<VirtualDOMComp />},
    
    {path:"formval", element:<FormValComp />},

    {path:"productdetail", element:<ProductDetailsComp />},
    {path:"addproduct", element:<AddproductComp />},
    {path:"updateproduct/:id", element:<UpdateProductComp />},

    {path:"datalist", element:<DataListComp />},

    //5. wild card router
        {path:"*", element:<PafeNotFoundComp />},
        
    //4. Child routing
     {path:"hooks", element:<AllHooksComp />, children:[
     {path:"myimages", element:<MyImagesComp />},
     {path:"usestate", element:<UseStateComp />},
     {path:"useeffect", element:<UseEffectComp />},
     ]}
    ]},
    
        //2. default router
    //{path:"", element:<SliderComp />},

    // naming router
    //{path:"myimages", element:<MyImagesComp />},
    //path:"mycss", element:<mycss />}

    // //3. paramerter router
    // {path:"condren/:id", element:<conditionRenCom />}
    // //5. wild card router
    // {path:"*", element:<PageNotFoundComp />} 

    // 


]);

export default router;