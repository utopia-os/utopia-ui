import * as React from 'react';
import { useState, useEffect } from 'react';

const typeMapping = [
    {value: null, label: 'Kein Filter'},
    {value: 'kompass', label: 'Würdekompass'},
    {value: 'themenkompass', label: 'Themenkompass-Gruppe'},
    {value: 'liebevoll.jetzt', label: 'liebevoll.jetzt'}
];

const CustomFilterIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"  // Changed from 'none' to 'currentColor'
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const CheckmarkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const FilterControl = ({ activeFilter, setActiveFilter }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    const applyFilter = (filterValue) => {
        setActiveFilter(filterValue);
        setIsOpen(false);
    };

    return (
        <div className="tw-relative">
            <div className="tw-indicator">
                {activeFilter !== null && (
                    <span className="tw-indicator-item tw-badge tw-badge-secondary tw-bg-red-500 tw-border-red-500"></span>
                )}
                <button
                    className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-base-100 tw-flex tw-items-center tw-justify-center tw-border tw-border-gray-300 hover:tw-bg-gray-200 focus:tw-bg-gray-200 focus:tw-outline-none"
                    onClick={toggleFilter}
                >
                    <CustomFilterIcon size={24} />
                </button>
            </div>

            {isOpen && (
                <div className="tw-absolute tw-bottom-12 tw-left-0 tw-bg-base-100 tw-shadow-xl tw-rounded-lg tw-overflow-hidden tw-border tw-border-gray-200 tw-min-w-[250px]">
                    <ul className="tw-py-1">
                        {typeMapping.map((type) => (
                            <li key={type.value}>
                                <button
                                    onClick={() => applyFilter(type.value)}
                                    className={`tw-w-full tw-text-left tw-text-sm tw-px-4 tw-py-2 tw-flex tw-items-center tw-space-x-2
                                      hover:tw-bg-gray-300 focus:tw-bg-gray-300 focus:tw-outline-none
                                      ${activeFilter === type.value ? 'tw-bg-gray-200' : ''}`}
                                >
                                     <span className="tw-w-4">
                                        {activeFilter === type.value && <CheckmarkIcon />}
                                     </span>
                                    <span>{type.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterControl;