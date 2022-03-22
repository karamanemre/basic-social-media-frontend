import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithPending from "../layouts/ButtonWithPending";
import { getAllUsersWithPage } from "../redux/UserSlice";

function UsersList() {

  const [pageNo,setPageNo] = useState(1);
  const [pageSizeNo,setPageSizeNo] = useState(5);

  const { items, status, isLoading } = useSelector((state) => state.user);
  const { content,pageNumber,pageSize,totalPages,totalElements,firstPage,lastPage } = items;
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAllUsersWithPage({pageNo,pageSizeNo}))
  }, [pageNo]);

  const changePage = () => {
    //dispatch(getAllUsersWithPage())
  }

  return (
    <div>
      <div style={{textAlign:"center"}}>
      <table className="table table-hover" style={{width:"400px"}}>
        <thead>
          <tr>
            <th scope="col">Kullanıcılar</th>
          </tr>
        </thead>
        <tbody>
          {content && content.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
            </tr>
          ))}
        </tbody>
        <button  onClick={()=>setPageNo(pageNo-1)}>geri</button> 
       <button  onClick={()=>setPageNo(pageNo+1)}>ilwri</button>
      </table>
    </div>
    </div>
  );
}

export default UsersList;
