import React, { useState, useEffect } from "react";
import { useDataLayerValue } from "../../context/DataLayer";
import "./body.css";
import Header from "./Header";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as actionTypes from "../../constants/actionTypes";
import { SongRow } from "../index";
import{ Table ,TableBody,TableCell,TableHead,TableContainer,TableRow}from '@mui/material';
import moment from "moment";

const Body = ({ spotify, playlist, name }) => {
  const [{ user, token }, dispatch] = useDataLayerValue();
  const [itemName, setItemName] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [itemUri, setItemUri] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line
    playlist?.items?.map((item) => {
      if (item.name === name) {
        setItemName(item?.name);
        setDescription(item?.description);
        setImageUrl(item?.images[0]?.url);
        setItemUri(`${item?.items?.track?.album?.uri}`);
        setItemId(item?.id);
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
  }, [user, name, itemUri, playlist?.items, token]);
  // console.log(user)
  //console.log('playlist',playlist)
   console.log('tracks',tracks)

  const playPlaylist1 = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:${itemId}`,
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

  const playSong = async (id) => {
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        context_uri: `spotify:album:${id}`,
        offset: {
          position: 5,
        },
        position_ms: 0,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const playSong = (id) => {
  //   spotify
  //     .play({
  //       uris: [`spotify:track:${id}`],
  //     })
  //     .then((res) => {
  //       spotify.getMyCurrentPlayingTrack().then((r) => {
  //         dispatch({
  //           type: actionTypes.SET_ITEM,
  //           item: r.item,
  //         });
  //         dispatch({
  //           type: actionTypes.SET_PLAYING,
  //           playing: true,
  //         });
  //       });
  //     });
  // };

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
          {/* <FavoriteIcon className="" fontSize="large" /> */}
          <MoreHorizIcon className="" />
        </div>
        {/* songs */}
        {/* <hr /> */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell>#Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell><AccessTimeIcon/></TableCell>
            </TableRow>
            </TableHead>
          
          <TableBody>
           {tracks?.items?.map((item) => (
          <TableRow className="body__tableBody_tableRow">
           <TableCell component="th" scope="row">
           <SongRow
            track={item?.track}
            key={item?.track?.id}
            onClick={playSong}
            id={item?.track?.id}
          />
          </TableCell>
              <TableCell align="right">{item?.track?.album?.name}</TableCell>
              <TableCell align="right">{moment(item?.added_at).fromNow()}</TableCell>
              <TableCell align="right">{Math.round(item?.track?.duration_ms / 60).toFixed()}</TableCell>
          </TableRow>

        ))}
          </TableBody>
          </Table>
        </TableContainer>
       

        {
          // console.log(playlist?.items[2]?.tracks)
        }
      </div>
    </div>
  );
};

export default Body;
