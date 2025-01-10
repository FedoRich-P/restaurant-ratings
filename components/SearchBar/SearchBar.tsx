'use client';

import { TextField } from '@mui/material';

export const SearchBar = ({ onSearch }:SearchBarProps) => {
    return (
        <TextField
            fullWidth
            label="Найти кухню"
            variant="outlined"
            onChange={(e) => onSearch(e.target.value)}
            sx={{ mb: 2 }}
        />
    );
};

type SearchBarProps ={
    onSearch: (query: string) => void;
}