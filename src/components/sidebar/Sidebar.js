import React from "react";
import "./sidebar.css";
import SidebarOptions from "./SidebarOptions";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="logo"
        className="sidebar__logo"
      />
      <SidebarOptions title="Home" Icon={HomeIcon} />
      <SidebarOptions title="Search" Icon={SearchIcon} />
      <SidebarOptions title="Your Library" Icon={LibraryMusicIcon} />

      <br />
      <strong>
        <div className="sidebar__title">PLAYLISTS</div>
      </strong>
      <hr />
      <SidebarOptions title="Hiphop" />
      <SidebarOptions title="Rock" />
      <SidebarOptions title="RnB" />
    </div>
  );
};

export default Sidebar;
