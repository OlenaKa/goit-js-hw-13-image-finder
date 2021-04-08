
import galleryItemTemplate from '../templates/gallery-item.hbs';
import SearchApiService from './apiService';
import PicturesApiService from './apiService';


const galleryRef = document.querySelector ('.my-gallery')
const inputRef = document.querySelector ('input')
const searchFormRef = document.querySelector ('.search-form')
const searchBtnRef = document.querySelector('.search')
const showMoreBtnRef = document.querySelector('.show-more')
searchFormRef.addEventListener('submit', markupGallery)
showMoreBtnRef.addEventListener('click', onShowMore)
// searchBtnRef.addEventListener('click', markupGallery)


const searchApiService = new PicturesApiService();

// console.log(findImage('dog',1,myKey)); 

async function markupGallery (e) {
  e.preventDefault();
  searchApiService.query = e.currentTarget.elements.query.value
  searchApiService.resetPage();
  const response = await searchApiService.findImage()
  const items = response.hits
  console.log(items);
  galleryRef.innerHTML = galleryItemTemplate(items)
}


async function onShowMore () {
  const response = await searchApiService.findImage()
  const items = response.hits
  galleryRef.insertAdjacentHTML('beforeend', galleryItemTemplate(items))

}

// markupGallery()