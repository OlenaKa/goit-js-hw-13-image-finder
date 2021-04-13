const APY_KEY ='21066802-1751d875d52f6494cef1e0048';
const BASE_URL = 'https://pixabay.com';


export default class SearchApiService {
  constructor () {
     this.searchQuery = ''; 
     this.page = 1;
  }

  async fetchImages  () {
    const searchRef = `${BASE_URL}/api/?key=${APY_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=12`;
     
    const find = await fetch(searchRef)
    const result = find.json()
    this.page+=1;
    return result; 
  }

  get query (){
    return this.searchQuery;
  }

  set query (newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage () {
    this.page = 1;
  }
}

