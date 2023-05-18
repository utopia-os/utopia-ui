import { useState } from "react"
import * as React from "react"

type ModalProps = {
    clickAction: () => void
}

export function Welcome1({ clickAction }: ModalProps) {
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
                <label className="tw-btn" onClick={() => clickAction()}>Bin dabei</label>
            </div>
        </>
    )
}

export function Welcome2({ clickAction }: ModalProps) {
    return (
        <>
            <h3 className="tw-font-bold tw-text-lg">Veränderung passiert im echten Leben</h3>
            <p className="tw-py-4">
                Mal ganz ehrlich: 99% unser Zeit am Bildschirm ist sinnlose Zeit- und Energie-Verschwendung.
                <br /><br />
                Darum tauchen wir wieder in das echte Leben ein und nutzen digitale Medien nur dort, wo sie uns wirklich helfen in echt zusammen zu kommen</p>
            <div className="tw-modal-action">
                <label className="tw-btn" onClick={() => clickAction()}>Alles klar</label>
            </div>
        </>
    )
}

export function Welcome3({ clickAction }: ModalProps) {
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
                <label htmlFor="tw-my-modal" onClick={() => clickAction()} className="tw-btn">Ich mach mit</label>
            </div>
        </>
    )
}


export function Modal() {

    const [chapter, setChapter] = useState<number>(1);

    const close = () => {
        if (document.getElementById('my-modal')) {
            const el = document.getElementById('my-modal') as HTMLInputElement
            el.checked = false;
        }
    }

    const ActiveChapter = () => {
        switch (chapter) {
            case 1:
                return <Welcome1 clickAction={() => { setChapter(2) }} />
            case 2:
                return <Welcome2 clickAction={() => setChapter(3)} />
            case 3:
                return <Welcome3 clickAction={() => {
                    close()
                    setChapter(1)

                }} />
            default: return <></>
        };
    };

    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="tw-modal-toggle" />
            <div className="tw-modal">
                <label className="tw-modal-box tw-relative" htmlFor="">
                <label htmlFor="my-modal" className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2">✕</label>
                    <ActiveChapter />
                </label>
            </div>
        </>
    )
}


