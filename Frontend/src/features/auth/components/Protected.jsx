import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import Loader from '../../../App/Loader'


const Protected = ({children}) => {
   

    const user=useSelector(state=>state.auth.user)
     const Loading =useSelector(state=>state.auth.Loading)
     console.log(user);


   if(Loading){
      return (
   <Loader/>
      )
    }
      



  if(!user){
    return <Navigate to="/login" replace/>
  }
  ;


  return children
}

export default Protected
