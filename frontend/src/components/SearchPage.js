import {List, message, Radio, Space, Typography} from 'antd';
import Search from "antd/es/input/Search";
import {searchDescription} from "../utils/PyUtils";
import React, {useState} from "react";
import {imagePrefix, searchExactName, searchName} from "../utils/NodeUtils";

const {Text} = Typography;

const SearchPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('Recommendation');
    const {handleMovie} = props;

    const handleRecommendationSearch = async (value) => {
        setIsLoading(true);
        try {
            const recommendation = await searchDescription(value);
            const results = await searchName(recommendation);
            setSearchResults(results);
        } catch (e) {
            message.error('Error: ' + e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExactSearch = async (value) => {
        setIsLoading(true);
        try {
            const results = await searchExactName(value);
            setSearchResults(results);
            console.log(results);
        } catch (e) {
            message.error('Error: ' + e);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClick = (item) => {
        handleMovie(item.id);
    };

    const fontStyle = {
        color: '#FFFFFF',
        fontSize: "100px",
        display: "block",
        fontFamily: "Gill Sans, sans-serif"
    };

    return (
        <div style={{width: "800px"}}>
            {searchType === 'Recommendation' &&
                <>
                    <Text style={fontStyle} strong>DISCOVER</Text>
                    <Text style={fontStyle} strong>MORE.</Text>
                </>
            }
            {searchType === 'Search' &&
                <>
                    <Text style={fontStyle} strong>SEARCH</Text>
                    <Text style={fontStyle} strong>WATCH.</Text>
                </>
            }
            <div style={{backgroundColor: "rgba(147,147,155,0.3)", borderRadius: "10px"}}>
                <Radio.Group onChange={(e) => {
                    setSearchType(e.target.value);
                    setSearchResults([]);
                }}
                             value={searchType}
                             options={[
                                 {label: "Recommendation", value: "Recommendation"},
                                 {label: "Exact Search", value: "Search"},
                             ]}
                             buttonStyle="solid"
                             optionType="button"
                             disabled={isLoading}/>
                {searchType === 'Recommendation' &&
                    <Search placeholder="Describe what you want to watch." onSearch={handleRecommendationSearch}
                            disabled={isLoading} style={{width: "800px"}}/>}
                {searchType === 'Search' &&
                    <Search placeholder="Input the movie name." onSearch={handleExactSearch} disabled={isLoading}
                            style={{width: "800px"}}/>}
            </div>
            {searchResults.length > 0 &&
                <List style={{
                    overflow: "scroll",
                    maxHeight: "500px",
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: "10px"
                }}
                      dataSource={searchResults}
                      renderItem={(item) => (
                          <List.Item extra={<img src={`${imagePrefix}${item.poster_path}`} alt={item.title}
                                                 style={{height: "15%", width: "15%"}}/>}>
                              <Space direction="vertical">
                                  <Text style={{
                                      color: '#FFFFFF',
                                      fontSize: "20px",
                                      display: "block",
                                      fontFamily: "monospace"
                                  }} onClick={(e) => handleClick(item)}>{item.title}</Text>
                                  <Text style={{
                                      color: '#FFFFFF',
                                      fontSize: "13px",
                                      display: "block",
                                      fontFamily: "monospace"
                                  }}>{item.release_date}</Text>
                              </Space>
                          </List.Item>
                      )}/>
            }
        </div>
    );
};

export default SearchPage;