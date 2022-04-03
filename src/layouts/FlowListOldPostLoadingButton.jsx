import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { changePageNo } from '../redux/FlowSlice';
import { useTranslation } from 'react-i18next';
import Spinner from './Spinner';

function FlowListOldLoadingButton() {

  const { paginationProperites, status,pageNo } = useSelector(
    (state) => state.flow
  );
  const { lastPage } = paginationProperites;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div>
      {lastPage === false && (
            <div className="d-flex justify-content-center loaded-flow mb-4">
              <a
                onClick={() => dispatch(changePageNo())}
                className={
                  status === "loading" ? "text-muted disabled-a" : "text-muted"
                }
              >
                {status === "loading" && (
                  <div>
                    <Spinner/>
                  </div>
                )}
                {status !== "loading" && (
                  <div>
                    {t("Upload old posts")} <KeyboardDoubleArrowDownIcon />{" "}
                  </div>
                )}
              </a>
            </div>
          )}
    </div>
  )
}

export default FlowListOldLoadingButton