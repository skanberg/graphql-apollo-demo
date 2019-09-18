import React, { useState } from "react";

const Login = ({ setName }) => {
  const [value, setValue] = useState("");
  return (
    <div className="login">
      <h3>Welcome to SlaQL</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          setName(value);
        }}
      >
        <input
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          placeholder="Enter your name"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Login;
