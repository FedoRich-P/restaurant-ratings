import * as yup from 'yup';

export const restaurantSchema = yup.object({
    name: yup.string().required('Название ресторана обязательно'),
    cuisine: yup.string().required('Название кухни обязательна'),
});

export type RestaurantFormData = yup.InferType<typeof restaurantSchema>;