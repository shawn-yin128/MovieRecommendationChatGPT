import {Avatar, Card, Carousel, Col, Divider, List, Rate, Row, Skeleton, Space, Typography} from "antd";
import {FrownOutlined, MehOutlined, SmileOutlined} from '@ant-design/icons';
import {useEffect, useState} from "react";
import {imagePrefix, searchDetails, searchName} from "../utils/NodeUtils";
import {searchSimilar} from "../utils/PyUtils";
import ISO6391 from "iso-639-1";
import Meta from "antd/es/card/Meta";
import ImageGallery from 'react-image-gallery';
import YouTube from "react-youtube";

const {Text, Title, Paragraph} = Typography;

const MoviePage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieInfo, setMovieInfo] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [details, setDetails] = useState(null);
    const [backdrops, setBackdrops] = useState([]);
    const [titles, setTitles] = useState([]);
    const [casts, setCasts] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [videos, setVideos] = useState([]);
    const {movie, handleMovie} = props;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            await setIsLoading(true);
            const data = await searchDetails(movie);
            await setMovieInfo(data);
            const similar = await searchSimilar(data.details.title);
            const similarData = await searchName(similar);
            await setSimilarMovies(similarData);
            await setIsLoading(false);
        };
        fetchMovieDetails();
    }, [movie]);

    useEffect(() => {
        if (movieInfo !== null) {
            setDetails(movieInfo.details);
            setBackdrops(movieInfo.images.backdrops.map(backdrop => `${imagePrefix}${backdrop.file_path}`));
            setTitles(movieInfo.titles.titles.slice(0, 5));
            setCasts(movieInfo.credits.cast.slice(0, 10));
            setDirectors(movieInfo.credits.crew.filter(crew => crew.job === 'Director').map(crew => crew.name).slice(0, 3));
            setReviews(movieInfo.reviews.results);
            setVideos(movieInfo.videos.results.filter(video => video.site === 'YouTube').slice(0, 4));
        }
    }, [movieInfo]);

    const labelStyle = {
        color: 'rgba(255,255,255,0.5)',
        fontSize: "25px",
        fontFamily: "Gill Sans, sans-serif"
    };

    const contentStyle = {
        color: '#FFFFFF',
        fontSize: "25px",
        fontFamily: "Gill Sans, sans-serif"
    };

    const rateIcons = {
        1: <FrownOutlined/>,
        2: <FrownOutlined/>,
        3: <MehOutlined/>,
        4: <SmileOutlined/>,
        5: <SmileOutlined/>,
    };

    const playOpts = {
        height: '400',
        width: '640',
        playerVars: {
            autoplay: 0,
        }
    };

    return (isLoading ?
            <>
                <Skeleton.Avatar active/>details
                <Skeleton active paragraph={{rows: 12}}/>
            </>
            :
            <>
                <div style={{height: "20vh", position: "relative"}}>
                    <img alt={details.title} src={`${imagePrefix}${details.poster_path}`}
                         style={{top: "5vh", left: "2vw", position: "absolute"}}/>
                    <Title style={{
                        left: "30vw",
                        top: "10vh",
                        position: "absolute",
                        color: '#FFFFFF',
                        fontSize: "50px",
                        fontFamily: "Gill Sans, sans-serif"
                    }}>{details.title}</Title>
                    <div style={{left: "88vw", top: "15vh", position: "absolute"}}>
                        <Text style={labelStyle}>Rate: </Text>
                        <Rate disabled allowHalf defaultValue={details.vote_average / 2}
                              character={({index}) => rateIcons[index + 1]}/>
                    </div>
                </div>
                <div style={{backgroundColor: "rgba(4,4,6,0.5)", height: "80vh"}}>
                    <List style={{left: "30vw", position: "absolute", maxHeight: "80vh", overflow: "scroll"}}
                          size="small" split={false}>
                        <List.Item>
                            <Row>
                                <Col span={12}>
                                    <List.Item style={{paddingLeft: "0px"}}>
                                        <Text style={labelStyle}>Director:
                                            <Text style={contentStyle}>{directors.join(" / ")}</Text>
                                        </Text>
                                    </List.Item>
                                    <List.Item style={{paddingLeft: "0px"}}>
                                        <Text style={labelStyle}>Genres:
                                            <Text
                                                style={contentStyle}>{details.genres.map((genre) => genre.name).join(" / ")}</Text>
                                        </Text>
                                    </List.Item>
                                    <List.Item style={{paddingLeft: "0px"}}>
                                        <Text style={labelStyle}>Production Countries:
                                            <Text
                                                style={contentStyle}>{details.production_countries.map((country) => country.name).join(" / ")}</Text>
                                        </Text>
                                    </List.Item>
                                    <List.Item style={{paddingLeft: "0px"}}>
                                        <Text style={labelStyle}>Language:
                                            <Text
                                                style={contentStyle}>{ISO6391.getName(details.original_language)}</Text>
                                        </Text>
                                    </List.Item>
                                    <List.Item style={{paddingLeft: "0px"}}>
                                        <Text style={labelStyle}>Release Date:
                                            <Text style={contentStyle}>{details.release_date}</Text>
                                        </Text>
                                    </List.Item>
                                    <List.Item style={{paddingLeft: "0px"}}>
                                        <Text style={labelStyle}>Runtime:
                                            <Text style={contentStyle}>{details.runtime + " minutes"}</Text>
                                        </Text>
                                    </List.Item>
                                    {titles.length > 0 &&
                                        <List.Item style={{paddingLeft: "0px"}}>
                                            <Text style={labelStyle}>Alternative Title:
                                                <Text
                                                    style={contentStyle}>{titles.map((title) => title.title).join(" / ")}</Text>
                                            </Text>
                                        </List.Item>
                                    }
                                </Col>
                                <Col span={10}>
                                    {backdrops.length > 0 &&
                                        <>
                                            <List.Item>
                                                <Text style={labelStyle}>Photography: </Text>
                                            </List.Item>
                                            <List.Item>
                                                <ImageGallery autoPlay={true}
                                                              items={backdrops.map((path) => {
                                                                  return {
                                                                      original: path
                                                                  };
                                                              })}/>
                                            </List.Item>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </List.Item>
                        <List.Item>
                            <Text style={labelStyle}>Overview:</Text>
                        </List.Item>
                        <List.Item>
                            <Text style={contentStyle}>{details.overview}</Text>
                        </List.Item>
                        <List.Item>
                            <Text style={labelStyle}>Casts: </Text>
                        </List.Item>
                        <List.Item>
                            <List dataSource={casts}
                                  grid={{column: 5}}
                                  renderItem={(item) => (
                                      <List.Item>
                                          <Card cover={<img src={`${imagePrefix}${item.profile_path}`}
                                                            alt={item.name}/>}>
                                              <Meta title={item.name} description={item.character}/>
                                          </Card>
                                      </List.Item>
                                  )}/>
                        </List.Item>
                        <List.Item>
                            <Text style={labelStyle}>Similar Movies: </Text>
                        </List.Item>
                        <List.Item>
                            <List dataSource={similarMovies}
                                  grid={{column: 5}}
                                  renderItem={(item) => (
                                      <List.Item>
                                          <Card cover={<img src={`${imagePrefix}${item.poster_path}`}
                                                            alt={item.title}
                                                            onClick={() => handleMovie(item.id)}/>}>
                                              <Meta title={item.title} onClick={() => handleMovie(item.id)}/>
                                          </Card>
                                      </List.Item>
                                  )}/>
                        </List.Item>
                        {reviews.length > 0 &&
                            <>
                                <List.Item>
                                    <Text style={labelStyle}>Reviews: </Text>
                                </List.Item>
                                <List.Item>
                                    <List dataSource={reviews}
                                          style={{
                                              maxHeight: "400px",
                                              overflow: "scroll",
                                              backgroundColor: "rgba(255,255,255,0.5)",
                                              borderRadius: "10px"
                                          }}
                                          renderItem={(item) => (
                                              <List.Item style={{
                                                  backgroundColor: "#FFFFFF",
                                                  margin: "10px 10px",
                                                  borderRadius: "10px"
                                              }}>
                                                  <List.Item.Meta avatar={<Avatar size="large"
                                                                                  src={item.author_details.avatar_path !== null && item.author_details.avatar_path.startsWith("http") ? item.author_details.avatar_path : `${imagePrefix}${item.author_details.avatar_path}`}/>}
                                                                  title={item.author}
                                                                  description={item.created_at.substring(0, 10)}/>
                                                  <hr/>
                                                  {item.content}
                                              </List.Item>
                                          )}/>
                                </List.Item>
                            </>
                        }
                        {videos.length > 0 &&
                            <>
                                <List.Item>
                                    <Text style={labelStyle}>Videos: </Text>
                                </List.Item>
                                <List.Item>
                                    <List dataSource={videos}
                                          grid={{column: 2}}
                                          renderItem={(item) => (
                                              <List.Item>
                                                  <YouTube videoId={item.key} opts={playOpts}/>
                                              </List.Item>
                                          )}/>
                                </List.Item>
                            </>
                        }
                    </List>
                </div>
            </>
    );
};

export default MoviePage;