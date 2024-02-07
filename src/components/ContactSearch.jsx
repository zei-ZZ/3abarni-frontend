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
import { debounceTime, switchMap, distinctUntilChanged } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { useInView } from "react-intersection-observer";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import PropTypes from "prop-types";

const backend_url = import.meta.env.VITE_BackendURL;

const ContactSearch = ({ onContactSelect }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const handleCardClick = (contactId) => {
    setSelectedContact(contactId === selectedContact ? null : contactId);
    onContactSelect(contactId);
  };
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const inputRef = useRef(null);
  const scrollableDivRef = useRef(null);

  const fetchSearchUsers = async (query, page) => {
    console.log(`${query} + ${page}`);
    if (query == "") return [];
    // Fetch contacts based on the query and page
    try {
      const res = await axiosInstance.get(`/users/search/${query}/${page}`);
      if (res.data.length == 0) setHasMore(false);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const [ref, inView, entry] = useInView({
    onChange: async (inView, entry) => {
      if (inView) {
        const contactsToAdd = await fetchSearchUsers(query, page + 1);
        setPage((prev) => prev + 1);
        setTimeout(() => {
          setContacts((prev) => [...prev, ...contactsToAdd]);
        }, 1000);
      }
    },
  });

  useEffect(() => {
    const query$ = fromEvent(inputRef.current, "input").pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((e) => fetchSearchUsers(e.target.value, page))
    );

    const sub = query$.subscribe({
      next: (res) => {
        console.log(res);
        setPage(1);
        setHasMore(true);
        setContacts(res);
      },
      error: (err) => console.error(err),
    });
    return () => sub.unsubscribe();
  }, []);

  const displayedUsers = contacts.map((contact) => (
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
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          name="query"
          ref={inputRef}
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
        ref={scrollableDivRef}
      >
        {displayedUsers}
        <div height="50px"> </div>
        {hasMore && <h3 height="40px"> loading ...</h3>}
        {!hasMore && <h3 height="40px"> Oops, no more data </h3>}

        <div ref={ref}></div>
      </div>
    </div>
  );
};

ContactSearch.propTypes = {
  onContactSelect: PropTypes.func.isRequired,
};
export default ContactSearch;
