
import * as L from 'leaflet';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';

export function MapOverlayPage({ children, className, backdrop }: { children: React.ReactNode, className?: string, backdrop?: boolean }) {


    const closeScreen = () => {
        navigate(`/`);
    }

    const navigate = useNavigate();

    const overlayRef = React.createRef<HTMLDivElement>()


    React.useEffect(() => {
        if (overlayRef.current !== null) {
            L.DomEvent.disableClickPropagation(overlayRef.current)
            L.DomEvent.disableScrollPropagation(overlayRef.current)
        }
    }, [overlayRef])


    return (
        <div className={`tw-absolute tw-h-full tw-w-full tw-m-auto ${backdrop && "tw-z-[2000]"}`}>
            <div className={`${backdrop && "tw-backdrop-brightness-75"} tw-h-full tw-w-full tw-grid tw-place-items-center tw-m-auto`} >
                <div ref={overlayRef} className={`tw-card tw-shadow-xl tw-bg-base-100 tw-p-4 ${className && className} ${!backdrop && "tw-z-[2000]"} tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-m-auto`}>
                    <div className="tw-card-body tw-p-2 tw-h-full">
                        {children}
                        <button className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2" onClick={() => closeScreen()}>✕</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

