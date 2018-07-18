export class FetchService{
	constructor(tagName){
		this.data = {
			url: 'https://api.flickr.com/services/rest/',
			format: 'json',
			sort: 'random',
			method:'flickr.photos.search',
			tags: tagName,
			tag_mode: 'all',
			api_key: '0e2b6aaf8a6901c264acb91f151a3350',
			nojsoncallback: 1,
			page: 1
		};
	}
    
	createUrl(){
		return `${this.data.url}?format=${this.data.format}&sort=${this.data.sort}&method=${this.data.method}&tags=${this.data.tags}&api_key=${this.data.api_key}&nojsoncallback=${this.data.nojsoncallback}&page=${this.data.page}`;
	}

	next(){
		this.data.page = ++this.data.page;
	}

	previous(){
		this.data.page = --this.data.page;
	}

	setTagName(newTagName){
		this.data.tags = newTagName;
		this.data.page = 1;
	}

	fetchApi(callback) {
        // ES2017
		new Promise((resolve, reject) => {
			fetch(this.createUrl()).then(response => {
				let contentType = response.headers.get('content-type');
				if (contentType && contentType.includes('application/json') && response.status === 200) {
					resolve(response.json());
				} else {
					reject({status: 'failed'});
				}
			}).catch(function(error) {reject({status: error});});
            
		}).then(callback);
	}
}