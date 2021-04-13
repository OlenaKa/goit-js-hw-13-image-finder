
import PicturesApiService from './apiService';
import galleryItemTemplate from '../templates/gallery-item.hbs';
import { addBackToTop } from 'vanilla-back-to-top';
const basicLightbox = require('basiclightbox');
const { error } = require('@pnotify/core');
const { defaults } = require('@pnotify/core');


const searchApiService = new PicturesApiService();
let observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting){
     searchPictures();
    }
  })
});

const refs = {
  gallery: document.querySelector ('.my-gallery'),
  input: document.querySelector ('input'),
  searchForm: document.querySelector ('.search-form'),
  searchBtn: document.querySelector('.search'),
  showMoreBtn: document.querySelector('.search'),
  scrollFlag: document.querySelector('.loader-ellips'),
  endOfSearch: document.querySelector('.end-of-search'),
};

let searchResults = [];

refs.searchForm.addEventListener('submit', onSearchSubmit)
refs.gallery.addEventListener('click', onGalleryClick)

function onSearchSubmit (e) {
  e.preventDefault();

  searchApiService.resetPage();
  searchApiService.query = e.currentTarget.elements.query.value;
  refs.gallery.innerHTML = '';
  refs.endOfSearch.classList.add('is-hidden');
  
   if (searchApiService.query === '') {
    refs.gallery.innerHTML = ''
    stopSearch();
    return showErrorAlert();
  } else {
    searchResults = [];
    searchPictures();
  }
   
}

async function fetchPictures() {
  try {
   const response = await searchApiService.fetchImages();
   const items = response.hits;
   searchResults.push(...items);
   return items;
  }
   catch (err) {
      onFetchResults(err);
    }   
   
}

function onFetchResults (items) {
  
  if (items === undefined && searchResults.length > 0) {
    stopSearch();
    refs.endOfSearch.classList.remove('is-hidden')
  } 
  else if (items === undefined && searchResults === 0) {
    refs.scrollFlag.classList.add('is-hidden')
    return showErrorAlert();
  }
  else if (items.length === 12) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryItemTemplate(items));
    refs.scrollFlag.classList.remove('is-hidden')
    observer.observe(refs.scrollFlag);
  } 
  else if (items.length < 12 && items.length > 0 && searchResults.length > 0){
    refs.gallery.insertAdjacentHTML('beforeend', galleryItemTemplate(items));
    stopSearch();
    refs.endOfSearch.classList.remove('is-hidden')
  } 
  else if (items.length === 0 && searchResults.length === 0) {
    showErrorAlert();
    refs.endOfSearch.classList.add('is-hidden')
  }
}

async function searchPictures () {
  const items = await fetchPictures();
    onFetchResults(items);
}

function stopSearch () {
  observer.unobserve(refs.scrollFlag)
  refs.scrollFlag.classList.add('is-hidden');
}

function showErrorAlert () {
  defaults.closer = false;
  defaults.sticker = false;
  defaults.width = '300px';
  defaults.delay = 800;

  error ({
    text: 'Ups. Something went wrong. Try to check spelling.',
  });
}

function onGalleryClick (e) {
 
  if (!e.target.classList.contains('gallery_image')){
    return;
   } 
      
   let currentImgSrcObj = searchResults.find(
     ({webformatURL})=>webformatURL === e.target.getAttribute('src'));

   basicLightbox.create(`<img src=${currentImgSrcObj.largeImageURL} alt='${currentImgSrcObj.tags}' class="basicLightbox-image">`).show();

}

addBackToTop({backgroundColor: '#70cceb'});
