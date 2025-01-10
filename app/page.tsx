'use client';

import { useState } from 'react';

import AddRestaurantModal from '../components/AddRestaurantModal/AddRestaurantModal';
import { Button } from '@mui/material';
import {
    useAddRestaurantMutation, useDeleteRestaurantMutation,
    useGetRestaurantsQuery,
    useUpdateRestaurantRatingMutation
} from "@/services/restaurantsApi";
import {Header} from "@/components/Header/Header";
import {SearchBar} from "@/components/SearchBar/SearchBar";
import {RestaurantCard} from "@/components/RestaurantCard/RestaurantCard";
import {RegisterForm} from "@/components/RegisterForm/RegisterForm";
import {LoginForm} from "@/components/LoginForm/LoginForm";

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {data: restaurants = [], isLoading, isError} = useGetRestaurantsQuery();
    const [updateRating] = useUpdateRestaurantRatingMutation();
    const [addRestaurant] = useAddRestaurantMutation();
    const [deleteRestaurant] = useDeleteRestaurantMutation();
    // ===================================================================================
    const [isLogin, setIsLogin] = useState(true);
    // ===================================================================================

    const handleRatingChange = async (id: string, newRating: number) => {
        try {
            await updateRating({id, rating: newRating}).unwrap();
        } catch (error) {
            console.error('Failed to update rating:', error);
        }
    };

    const handleAddRestaurant = async (data: { name: string; cuisine: string }) => {
        try {
            await addRestaurant(data).unwrap();
        } catch (error) {
            console.error('Failed to add restaurant:', error);
        }
    };

    const handleDeleteRestaurant = async (id: string) => {
        try {
            await deleteRestaurant(id).unwrap();
        } catch (error) {
            console.error('Failed to delete restaurant:', error);
        }
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading restaurants</div>;

    // <div style={{padding: '20px', maxWidth: '400px', margin: '0 auto'}}>
    //     <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
    //     {isLogin ? <LoginForm/> : <RegisterForm/>}
    //     <button
    //         onClick={() => setIsLogin(!isLogin)}
    //         style={{marginTop: '10px', color: 'blue', cursor: 'pointer'}}
    //     >
    //         {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
    //     </button>
    // </div>

    return (
        <div style={{maxWidth: '60vw', margin: '0 auto'}}>
            <Header/>

            <SearchBar onSearch={setSearchQuery}/>
            <Button variant="contained" onClick={() => setIsModalOpen(true)} sx={{mb: 2}}>
                Добавить ресторан
            </Button>
            <AddRestaurantModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddRestaurant}
            />
            {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    cuisine={restaurant.cuisine}
                    rating={restaurant.rating}
                    onRatingChange={(newRating) => handleRatingChange(restaurant.id, newRating)}
                    onDelete={handleDeleteRestaurant}
                />
            ))}
        </div>
    );
}