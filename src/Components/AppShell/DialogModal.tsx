import * as React from "react";
import { MouseEvent, useEffect, useRef } from "react";


const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  title: string;
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const DialogModal = ({
  title,
  isOpened,
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);


  return (
    <dialog id="signup_modal" className='tw-card tw-shadow-xl tw-absolute tw-right-0 tw-top-0 tw-bottom-0 tw-left-0 tw-m-auto tw-transition-opacity tw-duration-300'
    
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
     <div className="tw-card-body tw-p-2">
     <button className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2" onClick={onClose}>✕</button>

     <h2 className='tw-text-2xl tw-font-semibold tw-mb-2 tw-text-center'>{title}</h2>

      {children}

      </div>
    </dialog>
  );
};

export default DialogModal;
