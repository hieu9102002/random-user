import React from "react";

const Dropdown = ({label, options, dropdownChange}) => {
  return (
    <div className="row">
      <div className="col-sm">
        <label htmlFor="dropdown">{label}</label>
      </div>
      <div className="col-sm">
        <select id="dropdown" onChange={(option)=>dropdownChange(option.target.value)}>
          {options.map((option, index)=>(
              <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
