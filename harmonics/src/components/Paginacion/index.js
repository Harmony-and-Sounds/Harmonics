import React from 'react';

export default ( props ) => {
	const {
		      loading,
		      showPrevLink,
		      showNextLink,
		      handlePrevClick,
		      handleNextClick,
	      } = props;
	return (
		<div className="navSearch-link-container">
			{/* eslint-disable-next-line */}
			<a
				//href="#"
				className={
					`navSearch-link
					${ showPrevLink ? 'show' : 'hide'}
					${ loading ? 'greyed-out' : ''
					}`
				}
				onClick={ handlePrevClick }
			>
				Prev
			</a>
			{/* eslint-disable-next-line */}
			<a
				//href="#"
				className={
					`navSearch-link
					${ showNextLink ? 'show' : 'hide'}
					${ loading ? 'greyed-out' : '' }
					`}
				onClick={ handleNextClick }
			>
				Next
			</a>
		</div>
	)
}
