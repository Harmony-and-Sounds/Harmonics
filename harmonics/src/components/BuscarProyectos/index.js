import React,{useState} from 'react';
import './search.css';
import Loader from './loader.gif';
import Paginacion from '../Paginacion';
import ProyectoItem from '../ProyectoItem';
import Multiselect from 'react-widgets/lib/Multiselect'
import {getProyectos} from '../../servicios/servicios-proyecto'

let instrumentos = ['Guitarra', 'Charango', 'Flauta', 'Bateria', 'Voz'];

class Search extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
			results: {},
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
			tags: [],
		};
		this.fetchSearchResults( 1,'');
		this.cancel = '';
	}


	/**
	 * Get the Total Pages count.
	 *
	 * @param total
	 * @param denominator Count of results per page
	 * @return {number}
	 */
	getPageCount = ( total, denominator ) => {
		const divisible	= 0 === total % denominator;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor( total/denominator ) + valueToBeAdded;
	};

	/**
	 * Fetch the search results and update the state with the result.
	 * Also cancels the previous query before making the new one.
	 *
	 * @param {int} updatedPageNo Updated Page No.
	 * @param {String} query Search Query.
	 *
	 */
	fetchSearchResults = ( updatedPageNo = '', query = '' ) => {
		getProyectos().then( respuesta => {
			const json = respuesta;
			console.log(json);
			const resultNotFoundMsg = ! respuesta.length
									? 'There are no more search results. Please try a new search'
									: '';
				this.setState( {
					results: respuesta,
					message: resultNotFoundMsg,
					loading: false
				} )
		});

		/*
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
		const searchUrl = `https://pixabay.com/api/?key=15542906-13f04010e64dbf82fca50e361&q=${query}${pageNumber}`;
		console.log(searchUrl);
		if( this.cancel ) {
			this.cancel.cancel();
		}

		this.cancel = axios.CancelToken.source();

		axios.get( searchUrl, {
			cancelToken: this.cancel.token
		} )
			.then( res => {
				const total = res.data.total;
				const totalPagesCount = this.getPageCount( total, 10 );
				const resultNotFoundMsg = ! res.data.hits.length
										? 'There are no more search results. Please try a new search'
										: '';
				this.setState( {
					results: res.data.hits,
					message: resultNotFoundMsg,
					totalResults: total,
					totalPages: totalPagesCount,
					currentPageNo: updatedPageNo,
					loading: false
				} )
			} )
			.catch( error => {
				if ( axios.isCancel(error) || error ) {
					this.setState({
						loading: false,
						message: 'Failed to fetch the data. Please check network'
					})
				}
			} )*/


	};

	handleOnInputChange = ( event ) => {
		const query = this.state.query;
		if ( ! query ) {
			this.setState( { query, results: {}, message: '', totalPages: 0, totalResults: 0 } );
		} else {
			this.setState( { query, loading: true, message: '' }, () => {
				this.fetchSearchResults( 1, query );
			} );
		}
	};

	/**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	handlePageClick = ( type, event ) => {
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;

		if( ! this.state.loading  ) {
			this.setState( { loading: true, message: '' }, () => {
				this.fetchSearchResults( updatePageNo, this.state.query );
			} );
		}
	};
	setValue = ( event ) => {
		const query = event.target.value;
		console.log(query);

		this.setState( { query: query });
	};
	setTags = ( values ) => {
		const tags = values;
		console.log(tags);

		this.setState( { tags: tags });
	};

	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					{ results.map( result => {
						return (
							<ProyectoItem
				       data={result} />
						)
					} ) }

				</div>
			)
		}
	};

	render() {

		const { query, loading, message, currentPageNo, totalPages,tags } = this.state;

		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;

		return (
			<div className="containerSearch">
				{/*	Heading*/}
				<h2 className="headingSearch">Buscar Proyectos</h2>
					{/* Search Input*/}
						<label className="search-label" htmlFor="search-input">
							<input
							type="text"
							name="query"
							id="search-input"
							placeholder="Search..."
							value={query}
							onChange={this.setValue}
							/>
							<Multiselect
				 				data={instrumentos}
				 				value={tags}
				 				onChange={this.setTags}
			 				/>
				 	 	<button type="submit" onClick={() => this.handleOnInputChange()} >buscar</button>
					 </label>

			{/*	Error Message*/}
				{message && <p className="message">{ message }</p>}

			{/*	Loader*/}
			<img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>

			{/*Navigation*/}
			<Paginacion
				loading={loading}
				showPrevLink={showPrevLink}
				showNextLink={showNextLink}
				handlePrevClick={ () => this.handlePageClick('prev' )}
				handleNextClick={ () => this.handlePageClick('next' )}
			/>

			{/*	Result*/}
			{ this.renderSearchResults() }

			{/*Navigation*/}
			<Paginacion
				loading={loading}
				showPrevLink={showPrevLink}
				showNextLink={showNextLink}
				handlePrevClick={ () => this.handlePageClick('prev')}
				handleNextClick={ () => this.handlePageClick('next')}
			/>

			</div>
		)
	}
}

export default Search
