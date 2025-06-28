'use client';

import {
  KeyboardEvent,
  ReactElement,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCustomToasts } from '@/hooks/use-custom-toast';
import { SessionContext } from '@/partials/ChildrenProviders';

function Tabs({ children }: { children: ReactElement[] }) {
  const [active, setActive] = useState(3);
  const tabItemsRef: RefObject<HTMLElement[]> = useRef([]);
  const [defaultFocus, setDefaultFocus] = useState(false);
  const { loginToast } = useCustomToasts();
  const session = useContext(SessionContext);

  useEffect(() => {
    if (defaultFocus) {
      //@ts-ignore
      tabItemsRef.current[active].focus();
    } else {
      setDefaultFocus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  //change tab item on click
  const handleKeyDown = (event: KeyboardEvent<EventTarget>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActive(index);
    } else if (event.key === 'ArrowRight') {
      setActive((active + 1) % children.length);
    } else if (event.key === 'ArrowLeft') {
      setActive((active - 1 + children.length) % children.length);
    }
  };

  const handleClick = (index: number) => {
    if (index === active) return;
    if (index == 2) {
      if (!session) {
        loginToast('רק משתמשים מחוברים יכולים לגשת לכרטיסייה זו');
        return;
      }
    }
    setActive(index);
  };

  return (
    <div className="tab">
      <ul className="tab-nav" role="tablist">
        {children.map((item: ReactElement, index: number) => (
          <li
            key={index}
            className={`tab-nav-item ${index === active && 'active'}`}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            onClick={() => handleClick(index)}
            onKeyDown={e => handleKeyDown(e, index)}
            //@ts-ignore
            ref={ref => (tabItemsRef.current[index] = ref)}
            id={`tab-${index}`}
          >
            {item.props.name}
          </li>
        ))}
      </ul>

      {children.map((data: ReactElement, index: number) => (
        <div
          key={index}
          className={`tab-content ${index === active ? 'block' : 'hidden'} my-2`}
        >
          {data.props.children}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
