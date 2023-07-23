import { useState } from "react"
import * as React from "react"

type ChapterProps = {
    clickAction?: () => void
}


export function Welcome1({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg">Herzlich Willkommen, schön dass du da bist! </h3>
            <p className="tw-py-4">
                Wir erschaffen zusammen eine Welt, in der wir frei und menschlich zusammen leben dürfen.
                Dafür bauen wir ein Netzwerk in dem wir uns im echten Leben begegnen und helfen
                ... ganz ohne Geld 😉
                <br /><br />
                <b>Hast du Lust mitzumachen?</b></p>
            <div className="tw-modal-action">
                <label className="tw-btn tw-btn-neutral" onClick={() => clickAction!()}>Bin dabei</label>
            </div>
        </>
    )
}

export function Welcome2({ clickAction }: ChapterProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg">Veränderung passiert im echten Leben</h3>
            <p className="tw-py-4">
                Mal ganz ehrlich: 99% unser Zeit am Bildschirm ist sinnlose Zeit- und Energie-Verschwendung.
                <br /><br />
                Darum tauchen wir wieder in das echte Leben ein und nutzen digitale Medien nur dort, wo sie uns wirklich helfen in echt zusammen zu kommen</p>
            <div className="tw-modal-action">
                <label className="tw-btn tw-btn-neutral" onClick={() => clickAction!()}>Alles klar</label>
            </div>
        </>
    )
}

export function Welcome3({ clickAction }: ChapterProps) {
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


export function Modal() {

    const [chapter, setChapter] = useState<number>(1);

    const close = () => {
        window.my_modal_3.close();
    }

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


