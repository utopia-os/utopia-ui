import { useState } from "react"
import * as React from "react"

type ChapterProps = {
    clickAction?: () => void
}


export function Welcome1({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg">Welcome, glad you are here!</h3>
            <p className="tw-py-4">
                Let's play a game together where we explore ourselves and our dreams and come together to make them come true.
                <br /><br />
                <b>Would you like to join us?</b></p>
            <div className="tw-modal-action">
                <label className="tw-btn tw-btn-neutral" onClick={() => clickAction!()}>Yes</label>

                <label className="tw-btn tw-btn-neutral" onClick={() => close()}>No</label>


            </div>
        </>
    )
}

export function Welcome2({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg"> Imagine ...</h3>
            <p className="tw-py-4">
                you wake up sometime in the early twenties of the 21st century on planet Earth from a hypnosis that has somehow kept you and all other people under some kind of external control all your life.
            </p>
            <div className="tw-modal-action">
                <label className="tw-btn tw-btn-neutral" onClick={() => clickAction!()}>next</label>
            </div>
        </>
    )
}

export function Welcome3({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg">Many people  ... </h3>
            <p className="tw-py-4">
                are still trapped in old and dysfunctional structures. But magically, a new consciousness is suddenly rising. More and more people are awakening from hypnosis.            </p>
            <div className="tw-modal-action">
                <label className="tw-btn tw-btn-neutral" onClick={() => clickAction!()}>next</label>
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

