import axios from 'axios';
import { searchImg } from './js/pixabay-api.js'
import { imgCreated } from "./js/render-functions.js";
import { imgTemplate } from "./js/render-functions.js";
import { imagesGallery } from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const btnLoadMore = document.querySelector(".btn-load-more");


form.addEventListener("submit", handleSubmit);
btnLoadMore.addEventListener("click", onLoadMore);

let page = 1;
let query = '';


hideBtnLoadMore();

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none"
}

function showBtnLoadMore() {
    btnLoadMore.classList.remove('hidden');
}

function hideBtnLoadMore() {
    btnLoadMore.classList.add('hidden');
}

async function handleSubmit(event) {
    event.preventDefault();
    gallery.innerHTML = "";
    hideBtnLoadMore();
    showLoader();

  query = event.target.elements.query.value.trim();

    
   if (!query) {
        hideLoader();
        iziToast.error({
            message: `Sorry, there are no images matching your search query.`,
            messageColor: '#FAFAFB',
            color: '#EF4040',
            position: 'topRight'
        });
        return;
    }
   
    try {
      
        const data = await searchImg(query, page);
       
        

        if (data.hits.length === 0) {
            iziToast.error({
                message: `Sorry, there are no images matching your search query.`,
                messageColor: '#FAFAFB',
                color: '#EF4040',
                position: 'topRight'
            })
        }
        else {
            const markup = imgTemplate(data.hits);
            gallery.innerHTML = markup;
            imagesGallery();
            showBtnLoadMore();
        }
    }

    catch {
            iziToast.error({
                message: `Sorry, there are no images matching your search query.`,
                messageColor: '#FAFAFB',
                color: '#EF4040',
                position: 'topRight'
            });
         
        }
           
    finally {
        event.target.reset();
        hideLoader();
    }
}

 

async function onLoadMore() {
    page += 1;
    showLoader();
   const data = await searchImg(query, page);
    try {
    
            const markup = imgTemplate(data.hits);
            gallery.insertAdjacentHTML("beforeend", markup);
            imagesGallery();
        
        if (page * data.hits.length >= data.totalHits) {
            hideBtnLoadMore();
             iziToast.info({
            message: `We're sorry, but you've reached the end of search results.`,
            position: 'topRight'
        });
        }

        const card = document.querySelector(".img-item");
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight,
            behavior: "smooth"
        })
        
    }
    catch (error) {
        iziToast.info({
            message: `We're sorry, but you've reached the end of search results.`,
            position: 'topRight'
        });
    }
    finally {
        hideLoader();
    }
}


