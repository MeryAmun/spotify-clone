import React from "react";
import { useDataLayerValue } from "../../context/DataLayer";
import "./body.css";
import Header from "./Header";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as actionTypes from '../../constants/actionTypes'
import { SongRow } from "../index";

const Body = ({ spotify }) => {
  const [{ discover_weekly,user }, dispatch] = useDataLayerValue();
  console.log(spotify)
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri:  `spotify:playlist:${user?.id}`,
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
        <img src={discover_weekly?.images[0]?.url} alt="discover weekly" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleIcon className="body__shuffle"  onClick={playPlaylist}/>
          <FavoriteIcon className="" fontSize="large" />
          <MoreHorizIcon className="" />
        </div>
        {/* songs */}
        {discover_weekly?.tracks?.items?.map(({ track }, index) => (
          <SongRow track={track} key={index}  playSong={playSong}/>
        ))}
      </div>
    </div>
  );
};

export default Body;
