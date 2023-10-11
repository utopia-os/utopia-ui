import { useState } from "react"
import * as React from "react"
import { useSetQuestOpen } from "./hooks/useQuests"

type ChapterProps = {
    clickAction?: () => void
}


export function Welcome1({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg">Welcome, glad you are here!</h3>
            <img className="tw-float-right tw-w-32 tw-m-2" src="earth.svg"></img>
            <p className="tw-py-3">
            In the 21st century, humanity is at a special point in its history. 
            </p>
            <p className="tw-py-1">
                On the one hand, the people of Planet Earth are facing a multitude of fundamental crises.
                </p>
            <p className="tw-py-1">
                On the other hand, we have all the knowledge and technology to heal the planet and live in harmony with Mother Earth.                  </p>
            <div className="tw-modal-action">
                <label className="tw-btn" onClick={() => clickAction!()}>Next</label>

            </div>
        </>
    )
}

export function Welcome2({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg"> Hypnosis and Disillusion </h3>
            
            <p className="tw-py-3">
            Most people are still stuck in old ways of thinking and living.       </p>
            <img className="tw-float-right tw-w-32 tw-mx-4 tw-my-2" src="fear2.svg"></img>

            <p className="tw-py-1">
            Hypnotised, they sit in front of screens in concrete blocks, flooded and disillusioned by irrelevant information.
            </p>

            <p className="tw-py-1">
                From an early age, they are trained to do alienated work and consume unhealthy and meaningless products.
             </p>
            <div className="tw-modal-action">
                <label className="tw-btn" onClick={() => clickAction!()}>next</label>
            </div>
        </>
    )
}

export function Welcome3({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg">But Consciousness is rising </h3>
            <p className="tw-py-3">
            More and more people are waking up to what's really happening. </p>
            <p className="tw-py-1">
            They are in the process of understanding the potential that is within themselves and within true community.
            </p>
                        <img className="tw-float-left tw-w-32 tw-mx-4" src="camp3.svg"></img>

            <p className="tw-py-1">
                Starting to reconnect with our Mother Earth and beginning to question things that have been taken for granted. 
             </p>
            <div className="tw-modal-action">
                <label className="tw-btn" onClick={() => clickAction!()}>next</label>
            </div>
        </>
    )
}

export function Welcome4({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg"> Gemeinsam erschaffen wir Strukturen </h3>
            <ul className='tw-flex-row tw-pl-4 tw-mt-4'>
                <li>🥕 Essen & Trinken</li>
                <li>🏡 Wohn- & Lebensraum</li>
                <li>💬 Kommunikation</li>
                <li>💡 Energie</li>
                <li>🚐 Mobilität</li>
            </ul>
            <div className="tw-modal-action">
                <button className="tw-btn tw-btn-neutral" onClick={() => clickAction!()}>Ich mach mit</button>
            </div>
        </>
    )
}

const close = () => {
    window.my_modal_3.close();
}


export function Modal() {

    const [chapter, setChapter] = useState<number>(1);
    const setQuestsOpen = useSetQuestOpen();



    const ActiveChapter = () => {
        switch (chapter) {
            case 1:
                return <Welcome1 clickAction={() => { setChapter(2) }} />
            case 2:
                return <Welcome2 clickAction={() => { setChapter(3) }} />
            case 3:
                return <Welcome3 clickAction={() => {
                    setChapter(1);
                    close();
                    setTimeout(() => {
                        setQuestsOpen(true);
                    }, 1000);
                    
                }} />
            default: return <></>
        };
    };

    return (
        <>

            {/* You can open the modal using ID.showModal() method */}
            <dialog id="my_modal_3" className="tw-modal">
                <form method="dialog" className="tw-modal-box">
                    <button className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2">✕</button>
                    <ActiveChapter />
                </form>
                <form method="dialog" className="tw-modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

