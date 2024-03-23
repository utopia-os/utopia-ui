import { useState } from 'react'

type ChapterProps = {
    clickAction?: () => void
}


export function Welcome1({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="font-bold text-lg">Welcome to the Collaboative Finance Map</h3>
            <img className="float-right w-32 m-2" src="/cofi1.png"></img>
            <p className="py-3">
                This map is a tool for connecting the movement and making projects, local initiatives, people and events visible.
            </p>
            <p className="py-1">
                Help fill this map by adding projects and events to the map.
            </p>
            <p className="py-1">

                Sign up to create your personal profile and add it to the map.
            </p>
            <div className="grid">
                <label className="btn place-self-end mt-4" onClick={() => clickAction!()}>Close</label>
            </div>
        </>
    )
}

export function Welcome2({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="font-bold text-lg"> Hypnosis and Disillusion </h3>

            <p className="py-3">
                Most people are still stuck in old ways of thinking and living.       </p>
            <img className="float-right w-32 mx-4 my-2" src="/fear2.svg"></img>

            <p className="py-1">
                Hypnotised, they sit in front of screens in concrete blocks, flooded and disillusioned by irrelevant information.
            </p>

            <p className="py-1">
                From an early age, they are trained to do alienated work and consume unhealthy and meaningless products.
            </p>
            <div className="grid">
                <button className="btn place-self-end mt-4" onClick={() => clickAction!()}>next</button>
            </div>
        </>
    )
}

export function Welcome3({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="font-bold text-lg">But Consciousness is rising </h3>
            <p className="py-3">
                More and more people are waking up to what's really happening. </p>
            <p className="py-1">
                They are in the process of understanding the potential that is within themselves and within the whole mankind.
            </p>
            <img className="float-left w-32 mx-4" src="/camp3.svg"></img>

            <p className="py-1">
                Starting to reconnect with our Mother Earth and beginning to question things that long times have been taken for granted.
            </p>
            <div className="grid">
                <label className="btn place-self-end mt-4" onClick={() => clickAction!()}>next</label>
            </div>
        </>
    )
}

export function Welcome4({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="font-bold text-lg"> Gemeinsam erschaffen wir Strukturen </h3>
            <ul className='flex-row pl-4 mt-4'>
                <li>🥕 Essen & Trinken</li>
                <li>🏡 Wohn- & Lebensraum</li>
                <li>💬 Kommunikation</li>
                <li>💡 Energie</li>
                <li>🚐 Mobilität</li>
            </ul>
            <div className="grid">
                <button className="btn btn-neutral place-self-end" onClick={() => clickAction!()}>Ich mach mit</button>
            </div>
        </>
    )
}

const close = () => {
    window.my_modal_3.close();
}

export const ModalContent = () => {

    const [chapter, setChapter] = useState<number>(1);
    //const setQuestsOpen = useSetQuestOpen()



    const ActiveChapter = () => {
        switch (chapter) {
            case 1:
                return <Welcome1 clickAction={() => { close(); }} />
            case 2:
                return <Welcome2 clickAction={() => { setChapter(3) }} />
            case 3:
                return <Welcome3 clickAction={() => {

                    close();
                    setTimeout(() => {
                        //  setQuestsOpen(true);
                        setChapter(1);
                    }, 1000);

                }} />
            default: return <></>
        };
    };

    return (
        <ActiveChapter />
    )
}
