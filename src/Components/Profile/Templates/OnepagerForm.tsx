import * as React from 'react'
import { useEffect } from "react";
import { Item, Tag } from "../../../types"
import { TextAreaInput, TextInput } from "../../Input"
import ComboBoxInput from "../../Input/ComboBoxInput"

export const OnepagerForm = ({ item, state, setState }: {
    state: {
        color: string;
        id: string;
        groupType: string;
        status: string;
        name: string;
        subname: string;
        text: string;
        contact: string;
        telephone: string;
        nextAppointment: string;
        image: string;
        markerIcon: string;
        offers: Tag[];
        needs: Tag[];
        relations: Item[];
    },
    setState: React.Dispatch<React.SetStateAction<any>>,
    item: Item
}) => {

    useEffect(() => {
        switch (state.groupType) {
            case "wuerdekompass":
                setState(prevState => ({
                    ...prevState,
                    color: item?.layer?.menuColor || "#1A5FB4",
                    markerIcon: "group",
                    image: "59e6a346-d1ee-4767-9e42-fc720fb535c9"
                }));
                break;
            case "themenkompass":
                setState(prevState => ({
                    ...prevState,
                    color: "#26A269",
                    markerIcon: "group",
                    image: "59e6a346-d1ee-4767-9e42-fc720fb535c9"
                }));
                break;
            case "liebevoll.jetzt":
                setState(prevState => ({
                    ...prevState,
                    color: "#E8B620",
                    markerIcon: "liebevoll.jetzt",
                    image: "e735b96c-507b-471c-8317-386ece0ca51d"
                }));

                break;
            default:
                break;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.groupType])


    const typeMapping = [
        { value: 'wuerdekompass', label: 'Regional-Gruppe' },
        { value: 'themenkompass', label: 'Themen-Gruppe' },
        { value: 'liebevoll.jetzt', label: 'liebevoll.jetzt' }
    ];
    const statusMapping = [
        { value: 'active', label: 'aktiv' },
        { value: 'in_planning', label: 'in Planung' },
        { value: 'paused', label: 'pausiert' }
    ];

    return (
        <div className="tw-space-y-6 tw-mt-6">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                <div>
                    <label htmlFor="groupType" className="tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1">
                        Gruppenart:
                    </label>
                    <ComboBoxInput
                        id="groupType"
                        options={typeMapping}
                        value={state.groupType}
                        onValueChange={(v) => setState(prevState => ({
                            ...prevState,
                            groupType: v
                        }))}
                    />
                </div>
                <div>
                    <label htmlFor="status" className="tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1">
                        Gruppenstatus:
                    </label>
                    <ComboBoxInput
                        id="status"
                        options={statusMapping}
                        value={state.status}
                        onValueChange={(v) => setState(prevState => ({
                            ...prevState,
                            status: v
                        }))}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1">
                    Email-Adresse (Kontakt):
                </label>
                <TextInput
                    placeholder="Email"
                    defaultValue={state.contact}
                    updateFormValue={(v) => setState(prevState => ({
                        ...prevState,
                        contact: v
                    }))}
                />
            </div>

            <div>
                <label htmlFor="telephone" className="tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1">
                    Telefonnummer (Kontakt):
                </label>
                <TextInput
                    placeholder="Telefonnummer"
                    defaultValue={state.telephone}
                    updateFormValue={(v) => setState(prevState => ({
                        ...prevState,
                        telephone: v
                    }))}
                />
            </div>

            <div>
                <label htmlFor="nextAppointment" className="tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1">
                    Nächste Termine:
                </label>
                <TextAreaInput
                    placeholder="Nächste Termine"
                    defaultValue={state.nextAppointment}
                    updateFormValue={(v) => setState(prevState => ({
                        ...prevState,
                        nextAppointment: v
                    }))}
                    inputStyle="tw-h-24"
                />
            </div>

            <div>
                <label htmlFor="description" className="tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1">
                    Gruppenbeschreibung:
                </label>
                <TextAreaInput
                    placeholder="Beschreibung"
                    defaultValue={state.text || ""}
                    updateFormValue={(v) => setState(prevState => ({
                        ...prevState,
                        text: v
                    }))}
                    inputStyle="tw-h-48"
                />
            </div>
        </div>
    )
}
