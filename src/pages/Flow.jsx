import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FlowsList from '../layouts/FlowsList';
import SharePost from '../layouts/SharePost'
import {  getFlows, resetContent } from '../redux/FlowSlice';

function Flow() {

  const {pageNo,content } = useSelector(
    (state) => state.flow
  );

  const {loggedInUser} = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(resetContent());
    await dispatch(getFlows({ pageNo: pageNo, pageSize: process.env.REACT_APP_PAGE_SIZE }));
  }, [pageNo]);


  
  return (
    <div className='flow-main'>
        <div className='flow-sub container'>
             {/* Column-8 */}
            <div className='col-8'>
                <SharePost />
                <FlowsList userId={55}/>
            </div>
            {/* Column-4 */}
            <div className='col-4'>
                
            </div>
        </div>
    </div>
  )
}

export default Flow