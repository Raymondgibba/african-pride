'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function Toast() {
  const { toast, dismissToast, openDrawer } = useStore();
  const [last, setLast] = useState(toast);
  useEffect(() => {
    if (toast) setLast(toast); // keep the text while it slides out
  }, [toast]);
  return (
    <div id="toast" className={toast ? 'show' : ''}>
      <span>{last?.text}</span>
      {last?.view && (
        <button onClick={() => { dismissToast(); openDrawer(); }}>View cart</button>
      )}
    </div>
  );
}
