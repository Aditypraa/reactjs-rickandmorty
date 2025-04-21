import React from "react";

const Error = ({
  message = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="alert alert-danger text-center my-4" role="alert">
      {message}
    </div>
  );
};

export default Error;
