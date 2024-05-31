import axios from "axios";

const mainUrl = 'https://pixabay.com/api/';

export async function searchImg(query, page) {
    const response = await axios(mainUrl, {
        params: {
            key: '43997530-fac9ffe50b9517751943b9e7a',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: page,
            per_page: 15,
        }
    })
    return response.data;
}



