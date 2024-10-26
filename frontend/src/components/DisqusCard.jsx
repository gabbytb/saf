const DisqusCard = ({ title, subtitle }) => {
  
  
    return (
      <div className="disqus hidden">
          <span className="disqus-q">{title}</span>
          <span className="disqus-a">{subtitle}</span>
      </div>
    );
};


export default DisqusCard;
