import {useEffect, useState} from "react";
import {imagePrefix, searchTrending} from "../utils/NodeUtils";
import {Carousel} from "antd";

const PostPage = (props) => {
    const [trending, setTrending] = useState([]);
    const {handleMovie} = props;

    useEffect(() => {
        const fetchTrending = async () => {
            const data = await searchTrending();
            await setTrending(data.results);
        };
        fetchTrending();
    }, []);

    const handleClick = (item) => {
        handleMovie(item.id);
    };

    const renderTrending = () => {
        return trending.map((item) => {
            return (
                <div key={item.id}>
                    <img src={`${imagePrefix}${item.poster_path}`} alt={item.title} style={{height: "60%", width: "60%"}} onClick={(e) => {handleClick(item)}}/>
                </div>
            );
        });
    };

    return (
        <Carousel autoplay effect="fade" dots={false} style={{top: "5vh", left: "8vw", margin: "auto"}}>
            {renderTrending()}
        </Carousel>
    );
};

export default PostPage;