import React from "react";
import { Link } from "react-router-dom";

function LoginAlert() {
  return (
    <div className="login-alert alert-card">
      <div className="d-flex justify-content-center">
        <div className="card">
          Bu sayfaya ulaşmak için lütfen önce giriş yapınız
          <div className="d-flex flex-row">
            <Link to={"/login"}>
              <button className="btn btn-outline-primary">Giriş Yap</button>
            </Link>
            <Link to={"/"}>
              <button className="btn btn-outline-dark">Anasayfa</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAlert;
