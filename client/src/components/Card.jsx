import React from "react";

function Card(props) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatSource = (source) => {
        if (!source) return "Unknown Source";
        return source.length > 25 ? source.substring(0, 25) + "..." : source;
    };

    const getCategory = () => {
        // Simple category detection based on content
        const title = props.title?.toLowerCase() || '';
        const description = props.description?.toLowerCase() || '';
        const content = title + ' ' + description;
        
        if (content.includes('technology') || content.includes('tech') || content.includes('ai') || content.includes('digital')) {
            return 'Technology';
        } else if (content.includes('business') || content.includes('economy') || content.includes('market') || content.includes('finance')) {
            return 'Business';
        } else if (content.includes('health') || content.includes('medical') || content.includes('hospital')) {
            return 'Health';
        } else if (content.includes('sports') || content.includes('football') || content.includes('basketball') || content.includes('soccer')) {
            return 'Sports';
        } else if (content.includes('entertainment') || content.includes('movie') || content.includes('music') || content.includes('celebrity')) {
            return 'Entertainment';
        } else if (content.includes('science') || content.includes('research') || content.includes('study')) {
            return 'Science';
        } else if (content.includes('politics') || content.includes('government') || content.includes('election') || content.includes('policy')) {
            return 'Politics';
        }
        return 'General';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Technology': '#3b82f6',
            'Business': '#10b981',
            'Health': '#ef4444',
            'Sports': '#f59e0b',
            'Entertainment': '#8b5cf6',
            'Science': '#06b6d4',
            'Politics': '#6366f1',
            'General': '#6b7280'
        };
        return colors[category] || colors['General'];
    };

    const category = getCategory();
    const categoryColor = getCategoryColor(category);

    return (
        <article className="news-card">
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="news-card-link">
                <span className="sr-only">Read full article</span>
            </a>
            
            {props.imgUrl && (
                <div className="relative overflow-hidden">
                    <img 
                        className="news-card-image" 
                        src={props.imgUrl} 
                        alt={props.title}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            )}
            
            <div className="news-card-content">
                <div 
                    className="news-card-category"
                    style={{ backgroundColor: categoryColor }}
                >
                    {category}
                </div>
                
                <h3 className="news-card-title">
                    {props.title}
                </h3>
                
                {props.description && (
                    <p className="news-card-description">
                        {props.description}
                    </p>
                )}
                
                <div className="news-card-meta">
                    <div className="flex items-center gap-2">
                        <span className="news-card-source">
                            {formatSource(props.source)}
                        </span>
                        {props.author && (
                            <span className="text-xs text-gray-400">
                                • {props.author.length > 20 ? props.author.substring(0, 20) + "..." : props.author}
                            </span>
                        )}
                    </div>
                    
                    <time className="news-card-date">
                        {formatDate(props.publishedAt)}
                    </time>
                </div>
            </div>
        </article>
    );
}

export default Card;