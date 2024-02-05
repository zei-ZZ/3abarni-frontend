//import * as React from 'react';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
//import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
//import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import "../styles/ContactSearch.css";
import axiosInstance from "../utils/axiosInstance";
import { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import PropTypes from "prop-types";
import useDebounce from "../customHooks/useDebounce";
import InfiniteScroll from "react-infinite-scroller";
const backend_url = import.meta.env.VITE_BackendURL;

const ContactSearch = ({ onContactSelect }) => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  useEffect(() => {
    console.log("aaaa");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreSearchData();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      console.log("aaa");
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  // useEffect(() => {
  //   axiosInstance
  //     .get("/users")
  //     .then((response) => {
  //       console.log(response.data);
  //       setContacts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching users:", error);
  //     });
  // }, []);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  const handleCardClick = (contactId) => {
    setSelectedContact(contactId === selectedContact ? null : contactId);
    onContactSelect(contactId);
  };

  // const filteredContacts = contacts.filter((contact) =>
  //   contact.userName.toLowerCase().startsWith(searchTerm.toLowerCase())
  // );

  // start here working logic, all of the above code has to be reviewed
  const [query, setQuery] = useState("");
  const queryRef = useRef(query);
  const [searchUsers, setSearchUsers] = useState([]);

  const fetchMoreSearchData = () => {
    console.log(query);
    if (!hasMore) return;
    axiosInstance
      .get(`/users/search/${query}/${page}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length) setPage((prev) => prev + 1);
        else setHasMore(false);
        setSearchUsers((prev) => [...prev, ...response.data]);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const debouncedRequest = useDebounce(() => {
    setPage(0);
    setHasMore(true);
    if (query.trim().length == 0) {
      setSearchUsers([]);
      return;
    }
    //search backend request here
    axiosInstance
      .get(`/users/search/${query}/1`)
      .then((response) => {
        console.log(response.data);
        setSearchUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    console.log(query);
  });
  const displayedUsers = searchUsers.map((contact) => (
    <div
      key={contact.id}
      style={{
        marginBottom: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: selectedContact === contact.id ? "black" : "white",
        color: selectedContact === contact.id ? "white" : "black",
        display: "flex",
        alignItems: "center",
        padding: "15px",
      }}
      onClick={() => handleCardClick(contact.id)}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        style={{ marginRight: "10px" }}
      >
        <Avatar
          alt={contact.userName}
          src={backend_url + "/" + contact.profilePicPath}
        />
      </Badge>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          {contact.userName}
        </div>
        <div style={{ fontSize: "14px", color: "#555" }}>
          {contact.lastMessage}
          hello dude!
        </div>
      </div>

      <div style={{ marginLeft: "10px", fontSize: "12px" }}>
        {contact.lastMessageTime}
        9:35
      </div>
    </div>
  ));
  const onChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedRequest();
  };

  return (
    <div className="contacts-list max-h-full overflow-auto">
      <h2
        style={{
          fontFamily: "Manrope, sans-serif",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "32px",
          lineHeight: "44px",
          marginTop: "5px",
          marginBottom: "25px",
          marginLeft: "5.5px",
        }}
      >
        Chats
      </h2>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          borderRadius: 5,
          boxShadow: "none",
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon sx={{ color: "#B0B0B0" }} />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          onChange={onChange}
        />
        <IconButton
          color="primary"
          sx={{ p: "10px", color: "black" }}
          aria-label="filter"
        >
          <FilterListRoundedIcon />
        </IconButton>
      </Paper>

      <div
        style={{
          width: "400px",
          padding: "20px",
          height: "550px",
        }}
        className=" overflow-auto max-h-full"
      >
        {displayedUsers}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div ref={observerTarget}></div>
      </div>
    </div>
  );
};

ContactSearch.propTypes = {
  onContactSelect: PropTypes.func.isRequired,
};
export default ContactSearch;
