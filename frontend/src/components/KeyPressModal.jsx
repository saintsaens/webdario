import React, { useState, useEffect, useRef } from 'react';

const KeyPressModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0); // Track selected list item index
    const [searchQuery, setSearchQuery] = useState(''); // Track search input

    const listItems = ['lofi', 'coudrier'];

    // Filter list items based on the search query
    const filteredItems = listItems.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchInputRef = useRef(null); // Reference for the search input field

    const handleKeyPress = (event) => {
        const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'; // Detect Cmd + K or Ctrl + K

        if (isModalVisible) {
            if (event.key === 'ArrowDown') {
                setSelectedIndex((prevState) => (prevState + 1) % filteredItems.length); // Wrap around
            } else if (event.key === 'ArrowUp') {
                setSelectedIndex(
                    (prevState) => (prevState - 1 + filteredItems.length) % filteredItems.length // Wrap around
                );
            } else if (event.key === 'Escape') {
                setIsModalVisible(false); // Close modal on Escape
            }
        }
        if (isCmdK) {
            event.preventDefault(); // Prevent default Cmd + K behavior
            setIsModalVisible((prevState) => !prevState); // Toggle modal visibility
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        // Reset search field when the modal is toggled
        if (!isModalVisible) {
            setSearchQuery(''); // Clear search field when modal opens
        }

        // Focus the search bar when the modal is visible
        if (isModalVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isModalVisible, filteredItems]); // Re-run effect when modal visibility changes

    return (
        <>
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <input
                            ref={searchInputRef} // Attach the ref to the input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <ul className="modal-list">
                            {filteredItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`modal-list-item ${selectedIndex === index ? 'selected' : ''}`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default KeyPressModal;
