import React, { useState, useEffect } from "react";
import { useDataLayerValue } from "../../context/DataLayer";
import "./body.css";
import Header from "./Header";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as actionTypes from "../../constants/actionTypes";
import { SongRow } from "../index";

const Body = ({ spotify, playlist, name }) => {
  const [{ user, token }, dispatch] = useDataLayerValue();
  const [itemName, setItemName] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [trackId, setTrackId] = useState([]);

  console.log(playlist);


  useEffect(() => {
    playlist?.items?.map((item) => {
      if (item.name === name) {
        setItemName(item?.name)
        setDescription(item?.description);
        setImageUrl(item?.images[0]?.url)
        fetch(`${item?.tracks?.href}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTracks(data);
          });
        
      }
    });
    
  }, [user,name]);

  console.log(tracks);
  const playPlaylist1 = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:${user?.id}`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: actionTypes.SET_ITEM,
            item: r.item,
          });
          dispatch({
            type: actionTypes.SET_PLAYING,
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />
            <div className="body__info">
              <img src={imageUrl} alt="discover weekly" />
              <div className="body__infoText">
                <strong>PLAYLIST</strong>
                <h2>{itemName}</h2>
                <p>{description}</p>
              </div>
            </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleIcon className="body__shuffle" onClick={playPlaylist1} />
          <FavoriteIcon className="" fontSize="large" />
          <MoreHorizIcon className="" />
        </div>
        {/* songs */}
        {tracks?.items?.map((item) => (
          <SongRow track={item?.track} key={item?.track?.id} playSong={playSong} />
        ))}

        {
          // console.log(playlist?.items[2]?.tracks)
        }
      </div>
    </div>
  );
};

export default Body;
