import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FlowsList from '../layouts/FlowsList';
import SharePost from '../layouts/SharePost'
import {  getFlows } from '../redux/FlowSlice';

function Flow() {

  const {pageNo,content } = useSelector(
    (state) => state.flow
  );
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getFlows({ pageNo: pageNo, pageSize: 2 }));
  }, [pageNo]);



  
  return (
    <div className='flow-main'>
        <div className='flow-sub container'>
             {/* Column-8 */}
            <div className='col-8'>
                <SharePost />
                <FlowsList />
            </div>
            {/* Column-4 */}
            <div className='col-4'>
                
            </div>
        </div>
    </div>
  )
}

export default Flow