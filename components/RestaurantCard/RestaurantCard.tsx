'use client';
import { Card, CardContent, Typography, Rating as MuiRating, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const RestaurantCard = ({
                                   id,
                                   name,
                                   cuisine,
                                   rating,
                                   onRatingChange,
                                   onDelete,
                               }: RestaurantCardProps) => {
    return (
        <Card sx={{ mb: 2, position: 'relative' }}>
            <IconButton
                aria-label="delete"
                onClick={() => onDelete(id)}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'error.main',
                }}
            >
                <DeleteIcon />
            </IconButton>

            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {cuisine}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <MuiRating
                        value={rating}
                        onChange={(_, newValue) => onRatingChange(newValue || 0)}
                        precision={0.5}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

type RestaurantCardProps = {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    onRatingChange: (newRating: number) => void;
    onDelete: (id: string) => void;
};