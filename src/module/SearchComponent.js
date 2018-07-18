import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchComponent extends Component {
    
	constructor(props) {
		super(props);
		this.state = props;
	}
    
	handleClick(){
		let value = document.getElementsByClassName('search-input')[0].value;
		this.setState({
			tagName: value
		});
		this.props.changeTagName(value);
	}
    
	render() {
		return (
            <div className='search'>
                <span>Tag Name:</span>
                <input className='search-input' defaultValue={this.state.tagName}></input>
                <button className='btn search-btn' onClick={(e) => this.handleClick(e)}>Search</button>
            </div>
		);
	}
}

SearchComponent.propTypes = {
	changeTagName: PropTypes.func
};