import React from "react";
import './index.css'
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="home-warp">
      <Link to="CircleCrossChess">圈叉棋</Link>
    </div>
  );
}
