import { createContext, useContext, useState } from "react";
import { Item, LayerProps } from '../../../types';

type UseSelectPositionManagerResult = ReturnType<typeof useSelectPositionManager>;

const SelectPositionContext = createContext<UseSelectPositionManagerResult>({
    selectPosition: null,
    setSelectPosition: () => { },
});

function useSelectPositionManager(): {
    selectPosition: Item | LayerProps | null;
    setSelectPosition: React.Dispatch<React.SetStateAction< Item | LayerProps | null>>;
} {
    const [selectPosition, setSelectPosition] = useState<LayerProps | null | Item>(null);
    return { selectPosition, setSelectPosition };
}

export const SelectPositionProvider: React.FunctionComponent<{
    children?: React.ReactNode
}> = ({ children }) => (
    <SelectPositionContext.Provider value={useSelectPositionManager()}>
        {children}
    </SelectPositionContext.Provider>
);

export const useSelectPosition = (): Item | LayerProps | null => {
    const { selectPosition } = useContext(SelectPositionContext);
    return selectPosition;
};

export const useSetSelectPosition = (): UseSelectPositionManagerResult["setSelectPosition"] => {
    const { setSelectPosition } = useContext(SelectPositionContext);
    return setSelectPosition;
}