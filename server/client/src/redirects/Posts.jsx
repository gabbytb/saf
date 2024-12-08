import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';







const Posts = () => {

    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    const navigate = useNavigate();
    useEffect(() => {       
        if (window.location.pathname === '/blog/post') {        
            navigate('/blog');
        };    
    }, [navigate]);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    
    
    
    
    return (
        <></>
    );

};

export default Posts;