import axios from "axios";

export async function getCarrito() {
    const url = "https://web-production-2e42.up.railway.app/api/carritos/get/";
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}