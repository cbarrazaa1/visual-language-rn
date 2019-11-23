import * as React from 'react';
import {useState} from 'react';

const BottomDrawerContext = React.createContext({height: 0});
export function BottomDrawerContextProvider({children}) {
  const [height, setHeight] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  return (
    <BottomDrawerContext.Provider
      value={{height, setHeight, offsetY, setOffsetY}}>
      {children}
    </BottomDrawerContext.Provider>
  );
}

export default BottomDrawerContext;
