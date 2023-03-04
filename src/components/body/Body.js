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
  //const [playlists, setPlaylists] = useState([]);

  console.log(playlist);

  //console.log(token)

  // dispatch({
  //   type:actionTypes.SET_DISCOVER_WEEKLY,
  //   discover_weekly:response
  // })
  //   GET /echo/get/json HTTP/1.1
  // Host: reqbin.com
  // Accept: application/json
  // Authorization: Bearer my token
  useEffect(() => {
    playlist?.items?.map((item) => {
      if (item.name === name) {
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
  }, []);

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
      {playlist?.items?.map((item) => {
        if (item?.name === name) {
          return (
            <div className="body__info" key={item.id}>
              <img src={item?.images[0]?.url} alt="discover weekly" />
              <div className="body__infoText">
                <strong>PLAYLIST</strong>
                <h2>{item?.name}</h2>
                <p>{item?.description}</p>
              </div>
            </div>
          );
        }
      })}
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleIcon className="body__shuffle" onClick={playPlaylist1} />
          <FavoriteIcon className="" fontSize="large" />
          <MoreHorizIcon className="" />
        </div>
        {/* songs */}
        {tracks?.items?.map((item) => (
          <SongRow track={item.track} key={item.id} playSong={playSong} />
        ))}

        {
          // console.log(playlist?.items[2]?.tracks)
        }
      </div>
    </div>
  );
};

export default Body;
