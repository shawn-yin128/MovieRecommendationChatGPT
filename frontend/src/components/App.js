import {Content} from "antd/es/layout/layout";
import {Col, Row} from "antd";
import SearchPage from "./SearchPage";
import PostPage from "./PostPage";
import {useState} from "react";
import MoviePage from "./MoviePage";

const App = () => {
    const [movieId, setMovieId] = useState(null);

    return (
        <Content style={{
            background: 'linear-gradient(120deg, #040406, #93939B)',
            width: '100%',
            height: '100%',
            top: '0px',
            bottom: '0px',
            position: 'absolute',
            zIndex: '-1',
            overflow: "scroll"
        }}>
            {movieId === null ?
                <Row>
                    <Col span={12}>
                        <PostPage handleMovie={setMovieId}/>
                    </Col>
                    <Col span={12}>
                        <SearchPage handleMovie={setMovieId}/>
                    </Col>
                </Row>
                :
                <div style={{maxHeight: "100vh", maxWidth: "100vw", overflow: "scroll"}}>
                    <MoviePage movie={movieId} handleMovie={setMovieId}/>
                </div>
            }
        </Content>
    );
}

export default App;
