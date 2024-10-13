import { UtopiaMapProps } from "../../types";
import { ContextWrapper } from "../AppShell/ContextWrapper";
import { UtopiaMapInner } from "./UtopiaMapInner";

function UtopiaMap(props: UtopiaMapProps) {
    return (
        <ContextWrapper>
            <UtopiaMapInner {...props} />
        </ContextWrapper>
    );
}

export { UtopiaMap };
