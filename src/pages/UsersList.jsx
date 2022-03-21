import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../redux/UserSlice';

function UsersList() {

  const {items,status} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(async ()=>{
      if (status==="idle") {
          dispatch(getAllUsers())
      }
  },[])

  return (
    <div>
        
        {items.map((item) => (
           <div key={item.id}>
               {item.username}
               { console.log(item.fullName)}
           </div>
            
  ))}
    </div>
  )
}

export default UsersList