import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {FetchService} from './FetchService.js';

export default class ImagesContentComponent extends Component {
    
	constructor(props) {
		super(props);
		this.state = {
			tagName: props.tagName,
			currentImage: 0
		};
		this.fetchService = new FetchService(props.tagName);
	}

	shouldComponentUpdate(){
		return this.state.currentImage !== 4;
	}

	componentWillReceiveProps(nextProps){
		this.fetchService.setTagName(nextProps.tagName);
		this.getOrReload();
	}

	previousClick(){
		if(this.state.currentImage === 0){
			this.fetchService.previous();
			this.getOrReload();
			this.setState({currentImage: 4});
		} else {
			this.setState({
				currentImage: this.state.currentImage-1
			});
		}
	}

	nextClick(){
		if(this.state.currentImage === this.state.perpage-1){
			this.fetchService.next();
			this.getOrReload();
			this.setState({currentImage: 0});
		} else {
			this.setState({
				currentImage: this.state.currentImage+1
			});
		}
		
	}

	showBigImageClick(){
		const element = <Image key={this.state.photo[this.state.currentImage].id} data={this.state.photo[this.state.currentImage]} size='h' />;
		const imageOuter = document.getElementsByClassName('big-image')[0];
		const imageContainer = document.getElementsByClassName('big-image-container')[0];
		ReactDOM.render(element, imageContainer);
		imageOuter.classList.remove('hidden');
	}

	hideBigImageClick(){
		const imageOuter = document.getElementsByClassName('big-image')[0];
		imageOuter.classList.add('hidden');
	}
    
	render() {
		let imageElement;
		if(this.state.photo){
			imageElement = <Image key={this.state.photo[this.state.currentImage].id} data={this.state.photo[this.state.currentImage]} size='n'/>;
		}

		return (
            <div className='images-content-component'>
				<div className='big-image hidden'>
					<div className='big-image-container'></div>
					<div className='close' onClick={(e) => this.hideBigImageClick(e)}>x</div>
				</div>
				{imageElement}
				<div className='nav'>
					<a className={(this.state.page === 1&&this.state.currentImage === 0 )?'btn prev hidden':'btn prev'} onClick={(e) => this.previousClick(e)}>Previous image</a>
					<span className='btn current-image' onClick={(e) => this.showBigImageClick(e)}>Current large photo</span>
					<a className={(this.state.page === this.state.pages && this.state.currentImage === this.state.perpage)?'btn next hidden':'btn next'} onClick={(e) => this.nextClick(e)}>Next image</a>
				</div>
            </div>
		);
	}


	componentDidMount(){
		this.getOrReload();
	}

	getOrReload() {
		this.fetchService.fetchApi(response => this.setState(response.photos));
	}
}

ImagesContentComponent.propTypes = {
	tagName: PropTypes.string
};

function Image(props) {
	let propsLocal = props;
	let urlImage = `https://farm${propsLocal.data.farm}.staticflickr.com/${propsLocal.data.server}/${propsLocal.data.id}_${propsLocal.data.secret}_${propsLocal.size}.jpg`;
	return (
		<img src={urlImage} className='image' alt='test'/>
	);
}