import React from 'react';

const NewsArticle = (props) => {
	const show = props.show ? 'show' : 'hide';
	// Format date
	const datePublished = new Date(props.date);
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const dateTimeFormat = new Intl.DateTimeFormat('en-gb', options);
	const dateFormatted = dateTimeFormat.format(datePublished);

	// Reformat heading.
	// split string at certain letters, adding spans around those letters.
	const searchTerm = props.searchTerm !== '' ? props.searchTerm : null;
	let newHeading = props.heading;
	let trailText = props.trailText;

	// Split the heading into smaller parts by splitting at the search term.
	// Search term is included as one of the smaller parts.
	// `g`: global - find all matches, not just first.
	// `i`: insensitive - case insensitive.
	const subStringsHeading = newHeading.split(new RegExp(`(${searchTerm})`, 'gi'));
	newHeading = subStringsHeading.map((sub, index) => {
		if (sub.toLowerCase() === searchTerm) {
			return <mark key={index}>{sub}</mark>;
		} else {
			return sub;
		}
	});

	const subStringsTrailText = trailText.split(new RegExp(`(${searchTerm})`, 'gi'));
	trailText = subStringsTrailText.map((sub, index) => {
		if (sub.toLowerCase() === searchTerm) {
			return <mark key={index}>{sub}</mark>;
		} else {
			return sub;
		}
	});

	return (
		<div className={`news-article ${show}`}>
			<h2 className="article-heading">
				<a 
					className="article-heading-link" 
					href={props.link}
					target="_blank"
					rel="noreferrer">
					{newHeading}
				</a>
			</h2>
			<a 
				href={props.link} 
				className="article-image-link"
				target="_blank"
				rel="noreferrer">
				<img src={props.image} alt="" />
			</a>
			<p className="article-trail-text">{trailText}</p>
			<p className="article-date">Published: {dateFormatted}</p>
			<a 
				className="article-button" 
				href={props.link}
				target="_blank"
				rel="noreferrer">
				Read article
			</a>
		</div> 
	);
}

export default NewsArticle;