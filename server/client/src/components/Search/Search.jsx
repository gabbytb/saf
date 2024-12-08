import { useEffect, useState } from "react";
import api from "../../api";








function Search() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Number of items per page

    const fetchData = async () => {
        return api.get(`/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { staffsList, } = data;

            if (!success && message === "No staff found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setData(staffsList);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    
    const [query, setQuery] = useState("");
    const search_parameters = Object.keys(Object.assign({}, ...data));


    function search(data) {
        return data?.filter((data) =>
            search_parameters.some((parameter) =>
                data[parameter]?.toString()?.toLowerCase()?.includes(query)
        ));
    };


    return (
        <div className="container">

            <div className="input-box">
                <input
                    type="search"

                name="search-form"

                id="search-form"

                className="search-input"

                onChange={(e) => setQuery(e.target.value)}

                placeholder="Search user"
                />
            </div>
            {/**/}
            <center>
                {search(data).map((dataObj) => {
                    return (
                        <div className="box">
                            <div className="card">
                                <div className="category">@{dataObj?.firstName} </div>
                                <div className="heading">
                                    {dataObj?.lastName} <div className="author">{dataObj?.email}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </center>

        </div>
    );
};

export default Search;