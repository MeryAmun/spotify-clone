import React from "react";
import "./sidebar.css";
import SidebarOptions from "./SidebarOptions";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

const Sidebar = ({ playlist, tabRef, click }) => {
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
      {playlist?.items?.map(({ name, id }) => (
        <SidebarOptions
          title={name}
          key={id}
          tabRef={tabRef}
          click={click}
          id={id}
        />
      ))}
    </div>
  );
};

export default Sidebar;
