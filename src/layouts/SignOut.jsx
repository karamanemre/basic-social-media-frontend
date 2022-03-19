import React from 'react'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function SignOut(props) {
    const { t } = props
    return (
      <div>
            <Link to={"/login"} >
              <button className="btn">{t("Login")}</button>
              </Link>
  
              <Link to={"/signup"}>
              <button className="btn btn-primary signup-button">{t("Sign Up")}</button>
              </Link>
           
      </div>
    )
}

export default withTranslation()(SignOut)