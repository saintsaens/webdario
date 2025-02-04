import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedIndex } from "../../store/features/channelSwitcherSlice";
import { Dialog, DialogContent, TextField, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const ChannelSwitcher = () => {
    const currentChannel = useSelector((state) => state.channelSwitcher.currentChannel);
    const selectedIndex = useSelector((state) => state.channelSwitcher.selectedIndex);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const listItems = ['lofi', 'coudrier'];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const processedItems = [...listItems]
        .sort((a, b) => a.localeCompare(b))
        .filter((item) => item !== currentChannel)
        .concat(currentChannel ? [currentChannel] : []);

    const filteredItems = processedItems.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchInputRef = useRef(null);

    const handleKeyPress = (event) => {
        const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';

        if (isModalVisible) {
            if (event.key === 'ArrowDown') {
                dispatch(setSelectedIndex((selectedIndex + 1) % filteredItems.length));
            } else if (event.key === 'ArrowUp') {
                dispatch(setSelectedIndex(
                    (selectedIndex - 1 + filteredItems.length) % filteredItems.length
                ));
            } else if (event.key === 'Enter') {
                navigate(`/${filteredItems[selectedIndex]}`);
                setIsModalVisible(false);
            } else if (event.key === 'Escape') {
                setIsModalVisible(false);
                dispatch(setSelectedIndex(0));
            }
        }
        if (isCmdK) {
            event.preventDefault();
            setIsModalVisible((prevState) => !prevState);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        if (!isModalVisible) {
            setSearchQuery('');
        }

        if (isModalVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isModalVisible, filteredItems]);

    return (
        <Dialog open={isModalVisible} onClose={() => setIsModalVisible(false)}
            sx={{
            }}>
            <DialogContent
                sx={{
                    padding: 0,
                    width: 500,
                }}
            >
                <TextField
                    inputRef={searchInputRef}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    autoFocus
                    sx={{
                    }}
                />
                <List>
                    {filteredItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton
                                selected={selectedIndex === index}
                            >
                                <ListItemText 
                                primary={item}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default ChannelSwitcher;