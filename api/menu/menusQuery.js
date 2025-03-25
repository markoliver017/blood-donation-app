import axiosInstance from '@api/axiosInstance';

export const getAllMenus = async () => {
    try {
        const response = await axiosInstance.get('/menus');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const storeMenu = async (data) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: '/menus',
            data: data,
        });
        console.log('store menu success', response);
        return {
            error: false,
            msg: 'New Menu has been successfully created!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const updateMenu = async (menu_id, data) => {
    try {
        const response = await axiosInstance({
            method: 'put',
            url: `/menus/${menu_id}`,
            data: data,
        });
        return {
            error: false,
            msg: 'Menu has been successfully updated!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const deleteMenu = async (menu_id) => {
    try {
        const response = await axiosInstance({
            method: 'delete',
            url: `/menus/${menu_id}`,
        });
        console.log('Menu deletion success', response);
        return {
            error: false,
            msg: 'Menu has been successfully deleted!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};
