import React, { createContext, useState } from 'react';

const TabContext = createContext();

function TabProvider ({children}) {
  const [tab, setTab] = useState(0);
  
  function changeTab(tabIndex) {
    setTab(tabIndex);
  }

  return (
    <TabContext.Provider value={{
      tab,
      changeTab,
    }}>
      {children}
    </TabContext.Provider>
  )
}

export { TabContext, TabProvider }