export default class SearchApiService {
  constructor () {
     this.searchQuery = ''; 
     this.page = 1;
  }

  async findImage  () {
    console.log('before', this);
    const myKey = '21066802-1751d875d52f6494cef1e0048';
    const searchRef = `https://pixabay.com/api/?key=${myKey}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=12`;
     
    const find = await fetch(searchRef)
    const result = await find.json(this.page+=1)
    console.log(this);
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

