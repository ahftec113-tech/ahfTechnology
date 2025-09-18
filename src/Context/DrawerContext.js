import React, { createContext, useContext, useRef } from 'react';

const DrawerContext = createContext();

export const useDrawer = () => useContext(DrawerContext);

export const DrawerProvider = ({ children }) => {
  const drawerRef = useRef(null);

  const openDrawer = () => {
    drawerRef.current?.openDrawer?.();
  };

  const closeDrawer = () => {
    drawerRef.current?.closeDrawer?.();
  };

  const setDrawerRef = ref => {
    drawerRef.current = ref;
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, setDrawerRef }}>
      {children}
    </DrawerContext.Provider>
  );
};
