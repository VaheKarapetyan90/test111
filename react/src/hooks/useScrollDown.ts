import { useEffect, useState } from 'react';

// export function useScrollDown(scrollTrigger:any) {
//   useEffect(() => {
//     window.scrollTo(0, document.body.scrollHeight);
//   }, [scrollTrigger]);
// }

export const useScrollDown = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
  
    useEffect(() => {
      const updatePosition = () => {
        setScrollPosition(window.pageYOffset);
      }
    //   window.addEventListener("scroll", updatePosition);
        window.scrollTo(0, document.body.scrollHeight);

      updatePosition();
      return () => window.removeEventListener("scroll", updatePosition);
    }, []);
  
    return scrollPosition;
  };
  
//   export default useScrollPosition;