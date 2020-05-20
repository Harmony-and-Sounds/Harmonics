import React from 'react';
import './search.css';
import Loader from './loader.gif';
import Paginacion from '../Paginacion';
import ProyectoItem from '../ProyectoItem';
import {getProyectosBusqueda} from '../../servicios/servicios-proyecto'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/components/reset.min.css';
//import 'semantic-ui-css/components/transition.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/label.min.css';
import 'semantic-ui-css/components/list.min.css';
import 'semantic-ui-css/components/menu.min.css';
import 'semantic-ui-css/components/item.min.css';


const instrumentos = [
  { key: 'vocals', text: 'Voces', value: 'vocals' },
  { key: 'piano', text: 'Piano', value: 'piano' },
  { key: 'drums', text: 'Percuciones', value: 'drums' },
  { key: 'bass', text: 'Bajo', value: 'bass' },
  { key: 'other', text: 'Otros', value: 'other' },
];

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
	fetchSearchResults = ( updatedPageNo = '', query = '', voices ='vocals,piano,drums,bass,other', ) => {


		getProyectosBusqueda(query ,voices).then( respuesta => {
			var resultNotFoundMsg = '';
			if (typeof respuesta === 'undefined' || respuesta.length === 0){
					 resultNotFoundMsg = 'No se encontraron resultados. Por favor haga otra búsqueda.';
			}
				this.setState( {
					results: respuesta ,
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
		var query = this.state.query;
		const tags = this.state.tags;
		var voices = 'vocals,piano,drums,bass,other';
		if ( ! query && tags.length === 0 ) {
			this.setState( { query, tags:[] ,results: {}, message: '', totalPages: 0, totalResults: 0 } );
			this.fetchSearchResults( 1,'');
		}
		 else {
			if (! query) {
			 	query = '';
			}
			if(tags.length > 0){
				voices = tags.join(",")
			}


			this.setState( { query, loading: true, message: '' }, () => {
				this.fetchSearchResults( 1, query,voices );
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

		this.setState( { query: query });
	};
	setTags = ( values ) => {
		const tags = values;
		this.setState( { tags: tags });
	};

	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					{ results.map( result => {
							let logueado = false;
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


		const { query, loading, message, currentPageNo, totalPages } = this.state;

		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;

		return (
			<div className="containerSearch">
			 <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/components/transition.min.css" />
				{/*	Heading*/}
				<h2 className="headingSearch">Buscar Proyectos</h2>
					{/* Search Input*/}
						<div className="row">
							<input
							type="text"
							name="query"
							id="search-input"
							placeholder="Buscar..."
							value={query}
							onChange={this.setValue}
							className="form-control"
							style={{height:"43px", fontStyle:"normal", fontSize:"17px", fontWeight:"400"}}
							/>
						</div>
						<br/>
						<div className="row">
							<Dropdown placeholder="Seleccione los instrumentos" fluid multiple selection options={instrumentos}  onChange={(event, data) => this.setTags(data.value)}/>
						</div>
						<button className="btnBuscar" type="submit" onClick={() => this.handleOnInputChange()} >Buscar</button>
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
