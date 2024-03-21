import { useHasUserPermission } from "../Map/hooks/usePermissions";

export function PlusButton({ triggerAction, color, collection="items" }: { triggerAction: any, color: string, collection?:string }) {

    const hasUserPermission = useHasUserPermission();



    return (
        <>{hasUserPermission(collection, "create") &&
                <div className="tw-dropdown tw-dropdown-top tw-dropdown-end tw-dropdown-hover tw-z-500 tw-absolute tw-right-4 tw-bottom-4" >
                    <button tabIndex={0} className="tw-z-500 tw-btn tw-btn-circle tw-shadow" onClick={() => { triggerAction() }} style={{ backgroundColor: color, color: "#fff"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="tw-w-5 tw-h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div> 
        }
        </>

    )
}
