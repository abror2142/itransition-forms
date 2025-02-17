import { useRef, useEffect, ReactNode } from "react";

function useOutsideAlerter(ref: React.RefObject<any>, setActive: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setActive]);
}

export default function OutsideAlerter(
  { children, setActive }: 
  {children: ReactNode, setActive: React.Dispatch<React.SetStateAction<boolean>>}
) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setActive);
  return <div ref={wrapperRef}>{children}</div>;
}
