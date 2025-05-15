


import React, {  useLayoutEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

import { Button } from '@/components/ui/button'; 
import { Circle, Minus, Square, X } from 'lucide-react';


const TitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  useLayoutEffect(() => {
    const checkMaximized = async () => {
      const maximized = await invoke<boolean>('is_window_maximized');
      setIsMaximized(maximized);
    };

    checkMaximized();

    const resizeObserver = new ResizeObserver(checkMaximized);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);


  const handleMinimize = () => {
    invoke('minimize_window');
  };

  const handleMaximize = async() => {
    const maximized = await invoke<boolean>('is_window_maximized');
    setIsMaximized(prev => !prev);
    if (maximized) await invoke('unmaximize_window');
    else await invoke('maximize_window');
  };

  const handleClose = () => {
    invoke('close_window');
  };

  return (

    <div
      className="h-10 select-none flex w-full  justify-between items-center border-b pl-2 fixed top-0 left-0 right-0 z-100  text-muted-foreground bg-secondary/50 dark:bg-secondary/50 drag"
    >

      <div data-tauri-drag-region className="flex items-center  h-full drag"> 
        <span className="text-xs font-medium text-muted-foreground pl-1">My App</span>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-none hover:bg-secondary text-muted-foreground"
          onClick={handleMinimize}
          aria-label="Minimize"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-none hover:bg-secondary text-muted-foreground "
          onClick={handleMaximize}
          aria-label="Maximize/Restore"
        >
          {
            isMaximized ? (
              <Circle className="h-3 w-3" />
     
            ) : (
              <Square className="h-3 w-3" />
            )
          }
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 transition-colors duration-200 ease-in rounded-none 
          hover:bg-primary
          dark:hover:bg-primary
          hover:text-accent-foreground"
          onClick={handleClose}
          aria-label="Close"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default TitleBar;
