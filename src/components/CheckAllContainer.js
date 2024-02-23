import React from "react";

export default function CheckaAllContainer({ checkAll, remainCount }) {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={checkAll}>
          Check All
        </div>
      </div>

      <span>
        {remainCount} item{remainCount > 1 ? "s" : ""} remaining
      </span>
    </div>
  );
}
