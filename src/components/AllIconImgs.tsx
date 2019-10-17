import React from 'react';
import * as allIconImgs from '../constants/imgPaths';

function AllIconImgs() {
  const style = {
    height: 50,
    width: 50,
    padding: 10,
  };
  const disabledStyle = {
    ...style,
    opacity: 0.3,
  };
  return (
    <div>
      {Object.keys(allIconImgs).map(iconName => (
        <div key={iconName}>
          <img style={style} src={allIconImgs[iconName]} alt={iconName} />
          <img style={disabledStyle} src={allIconImgs[iconName]} alt={iconName} />
        </div>
      ))}
    </div>
  );
}

export default AllIconImgs;
