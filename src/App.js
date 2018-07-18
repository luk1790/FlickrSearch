import React, {Component} from 'react';
import './App.css';
import SearchComponent from './module/SearchComponent.js';
import ImagesContentComponent from './module/ImagesContentComponent.js';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tagName: 'mountain',
		};
	}

	changeTagName(newTagName){
		this.setState({
			tagName: newTagName
		});
	}

	render() {
		return (
			<div className='content'>
				<SearchComponent changeTagName={(newTagName) => this.changeTagName(newTagName)} tagName={this.state.tagName}/>
				<ImagesContentComponent tagName={this.state.tagName}/>
			</div>
		);
	}
}