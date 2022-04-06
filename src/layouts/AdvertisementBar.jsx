import React from "react";

function AdvertisementBar() {
  return (
    <div className="d-flex justify-content-center rounded">
      <div className="img-container ">
        <img
          src="https://www.techmagic.co/blog/content/images/2021/04/Node.js-vs-Java-Copy.png"
          alt=""
          className="img-fluid rounded"
          style={{ marginBottom: "3.1rem",height:"110px",width:"100%" }}
        />
        <img
          src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/128936526/original/12ac1adf42f702cf640dbccd5f2b1bbd99def1e1/do-full-stack-development-using-java-golang-node-and-react.jpg"
          alt=""
          className="img-fluid rounded mb-4"
        />
        <img
          src="https://miro.medium.com/max/600/1*dUCWPN9nE1TG45Sd5aAsJg.png"
          alt=""
          className="img-fluid rounded mb-4"
        />
      </div>
    </div>
  );
}

export default AdvertisementBar;
