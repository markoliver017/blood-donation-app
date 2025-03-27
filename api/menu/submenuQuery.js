import axiosInstance from '@api/axiosInstance';

export const storeSubMenu = async (menu_id, data) => {
    try {
        const response = await axiosInstance({
            method: 'post',
            url: `/menus/${menu_id}/sub_menu`,
            data: data,
        });
        console.log('store submenu success', response);
        return {
            error: false,
            msg: 'SubMenu has been successfully created!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const updateSubMenu = async (id, data) => {
    try {
        const response = await axiosInstance({
            method: 'put',
            url: `/sub_menu/${id}`,
            data: data,
        });
        return {
            error: false,
            msg: 'SubMenu has been successfully updated!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};

export const deleteSubMenu = async (id) => {
    try {
        const response = await axiosInstance({
            method: 'delete',
            url: `/sub_menu/${id}`,
        });
        console.log('SubMenu deletion success', response);
        return {
            error: false,
            msg: 'SubMenu has been successfully deleted!',
            data: response.data,
        };
    } catch (error) {
        throw error;
    }
};
