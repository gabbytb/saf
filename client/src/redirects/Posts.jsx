import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';







const Posts = () => {

    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {       
        if (window.location.pathname === '/blog/page' || window.location.pathname === '/blog/page/') {        
            navigate('/blog');
        };    
    }, [window.location.pathname]);    
    const navigate = useNavigate();
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    
    
    return (
        <></>
    );

};

export default Posts;