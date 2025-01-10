import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Основной цвет
        },
        secondary: {
            main: '#dc004e', // Вторичный цвет
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif', // Шрифт по умолчанию
    },
});