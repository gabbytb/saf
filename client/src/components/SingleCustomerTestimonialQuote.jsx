import { Link } from "react-router-dom";


const SingleCustomerTestimonialQuote = ({ textQuote, textAuthor, linkURL, linkText }) => {


    return (
        <div className="testimonial-quotes">
            <blockquote>{textQuote}</blockquote>
            <div className="testimonial-author">
                <span>{textAuthor}</span>
                <Link to={linkURL} target="_blank">{linkText}</Link>
            </div>
        </div>
    );
};


export default SingleCustomerTestimonialQuote;
