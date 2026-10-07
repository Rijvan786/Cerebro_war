import {createBrowserRouter} from "react-router"
import Home from "../features/Game/pages/Home"
import GameSetup from "../features/Game/pages/GameSetup"
import GameArena from "../features/Game/pages/GameArena"
import IntegrationSheet from "../features/Game/pages/IntegrationSheet"
import MCQArena from "../features/Game/pages/MCQArena"
import GameOver from "../features/Game/pages/GameOver"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import Resendmail from "../features/auth/components/Resendmail"
import SendForgetmail from "../features/auth/components/SendForgetmail"
import Forgotpassword from "../features/auth/components/Forgotpassword"
import Protected from "../features/auth/components/Protected"




export const router=createBrowserRouter([
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
    
    {
        path:"/setup",
        element:<GameSetup/>
    },
    {path:"play",
    element:<GameArena/>
    },
    {
        path:"/mcq-play",
        element:<MCQArena/>
    },
    {   path:"/integration",
        element:<IntegrationSheet/>
    },
    {
        path:"/gameover",
        element:<GameOver/>
    }, {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/resendmail",
        element:<Resendmail/>
    },
    {
        path:"/forgetmail",
        element:<SendForgetmail/>
    },
    {
        path:"/forgetpassword",
        element:<Forgotpassword/>
    }
    
])