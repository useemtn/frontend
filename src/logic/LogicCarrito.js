import axios from "axios";

export async function getCarrito() {
    const url = "http://127.0.0.1:8000/api/carritos/get/";
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