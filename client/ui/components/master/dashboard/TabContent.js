import React from 'react';

export default (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment>
          {children}
        </React.Fragment>
      )}
    </div>
  );
}