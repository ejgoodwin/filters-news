import NewsArticle from './NewsArticle';
import React from 'react';

const NewsContainer = (props) => {
	return (
		props.newsData.map((article) => {
			return (
				<NewsArticle 
					heading={article.webTitle}
					link={article.webUrl}
					date={article.webPublicationDate}
					image={article.fields.thumbnail}
					trailText={article.fields.trailText}
					show={article.show}
					searchTerm={props.searchTerm}
					key={article.id} />
			);
		})
	)
}

export default NewsContainer;