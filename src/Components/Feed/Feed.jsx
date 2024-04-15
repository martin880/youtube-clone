/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data.js";
import moment from "moment/moment.js";

// eslint-disable-next-line react/prop-types
const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=150&regionCode=ID&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };

  const fetchOtherData = async () => {
    // fetching channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <>
            <Link
              to={`video/${item.snippet.categoryId}/${item.id}`}
              key={index}
              className="card"
            >
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>
                {value_converter(item.statistics.viewCount)} views &bull;{" "}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default Feed;
