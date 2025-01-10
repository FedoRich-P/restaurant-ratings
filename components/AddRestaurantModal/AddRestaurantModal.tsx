'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import {RestaurantFormData, restaurantSchema} from "@/validation/validationSchemas";
import s from './AddRestaurantModal.module.css'

const AddRestaurantModal = ({ open, onClose, onSubmit }: AddRestaurantModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RestaurantFormData>({
        resolver: yupResolver(restaurantSchema),
    });

    const handleFormSubmit: SubmitHandler<RestaurantFormData> = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className={s.modal}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} variant="outlined">
                        Закрыть
                    </Button>
                </Box>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Добавить ресторан
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <TextField
                        fullWidth
                        label="Название"
                        margin="normal"
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        fullWidth
                        label="Кухня"
                        margin="normal"
                        {...register('cuisine')}
                        error={!!errors.cuisine}
                        helperText={errors.cuisine?.message}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Добавить
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddRestaurantModal;

type AddRestaurantModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; cuisine: string }) => void;
};