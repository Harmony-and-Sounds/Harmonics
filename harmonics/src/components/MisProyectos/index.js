import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MisProyectos.css"
import Paginacion from '../Paginacion';
import ProyectoItem from '../ProyectoItem';
import {getProyectosUsusario} from '../../servicios/servicios-proyecto'


class Search extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			token:'',
			query: '',
			results: {},
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,

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
		const access = sessionStorage.getItem('access');
		//console.log(this.state.token);
		getProyectosUsusario(access).then( respuesta => {
			const resultNotFoundMsg = ! respuesta.length
									? 'No se encontraron resultados. Por favor haga otra búsqueda.'
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


	/**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	handlePageClick = ( type, event ) => {
		event.preventDefault();
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;

		if( ! this.state.loading  ) {
			this.setState( { loading: true, message: '' }, () => {
				this.fetchSearchResults( updatePageNo, this.state.query );
			} );
		}
	};

	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					{ results.map( result => {
						let logueado = true;
						return (
							<ProyectoItem
							key = {result.id}
							id = {result.id}
						 name = {result.name}
						 voices = {result.voices}
						 logueado = {logueado}
						  />
						)
					} ) }

				</div>
			)
		}
	};

	render() {
		const { loading, message, currentPageNo, totalPages } = this.state;

		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;

		return (
			<div className="containerSearch">
			{/*	Heading*/}
			<h2 className="heading">Mis Proyectos</h2>
			{/* Search Input*/}

			{/*	Error Message*/}
				{message && <p className="message">{ message }</p>}

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
				handlePrevClick={ () => this.handlePageClick('prev' )}
				handleNextClick={ () => this.handlePageClick('next' )}
			/>

			</div>
		)
	}
}

export default Search
