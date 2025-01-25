
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedIndex } from "../store/features/channelSwitcherSlice";

const ChannelSwitcher = () => {
    const currentChannel = useSelector((state) => state.channelSwitcher.currentChannel);
    const selectedIndex = useSelector((state) => state.channelSwitcher.selectedIndex);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Track search input

    const listItems = ['lofi', 'coudrier'];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Processed list: sort alphabetically and move currentChannel to the bottom
    const processedItems = [...listItems]
        .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
        .filter((item) => item !== currentChannel) // Exclude currentChannel temporarily
        .concat(currentChannel ? [currentChannel] : []); // Append currentChannel if it exists

    // Filter list items based on the search query
    const filteredItems = processedItems.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchInputRef = useRef(null); // Reference for the search input field

    const handleKeyPress = (event) => {
        const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'; // Detect Cmd + K or Ctrl + K

        if (isModalVisible) {
            if (event.key === 'ArrowDown') {
                dispatch(setSelectedIndex((selectedIndex + 1) % filteredItems.length)); // Wrap around for down
            } else if (event.key === 'ArrowUp') {
                dispatch(setSelectedIndex(
                    (selectedIndex - 1 + filteredItems.length) % filteredItems.length // Wrap around for up
                ));
            } else if (event.key === 'Enter') {
                navigate(`/${filteredItems[selectedIndex]}`); // Navigate to the selected channel
                setIsModalVisible(false); // Close modal after navigation
            } else if (event.key === 'Escape') {
                setIsModalVisible(false); // Close modal on Escape
                dispatch(setSelectedIndex(0)); // Reset selected index
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
                <div className="switcher-overlay">
                    <div className="switcher-content">
                        <input
                            ref={searchInputRef} // Attach the ref to the input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="switcher-search-input"
                        />
                        <ul className="switcher-results">
                            {filteredItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={selectedIndex === index ? 'selected' : ''}
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

export default ChannelSwitcher;
