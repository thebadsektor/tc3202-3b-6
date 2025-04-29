// sssssssss
import React from "react";
import { useParams, Link } from "react-router-dom";
import brawlerInfo from "../brawlerInfo";

const BrawlerDetail = () => {
  const { name } = useParams();
  const info = brawlerInfo[name] || {
    image: "/images/brawlers/default.png",
    info: "No info available bobo ka eh."
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to List</Link>
      <h1>{name}</h1>
      <img src={info.image} alt={name} style={{ width: "300px" }} />
      <p>{info.info}</p>
    </div>
  );
};

export default BrawlerDetail;
