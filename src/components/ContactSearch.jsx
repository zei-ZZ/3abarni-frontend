import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
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
import ConnectedUsers  from "./ConnectedUsers";
import Badge from "@mui/material/Badge";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { startConnection, stopConnection } from '../services/signalrService';
const backend_url = import.meta.env.VITE_BackendURL;

const ContactSearch = ({ onContactSelect }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const inputRef = useRef(null);
  const scrollableDivRef = useRef(null);
  const [senderUserId, setSenderUserId] = useState("");
  const [chatHistory, setChatHistory] = useState(null);
  const [connectedUserIds, setConnectedUserIds] = useState([]);

  useEffect(() => {
    startConnection(setConnectedUserIds);
    const item = localStorage.getItem("token");

    if (item) {
      const decodedToken = jwtDecode(item);
      const userIdClaim = "user_id";
      const u = decodedToken[userIdClaim];
      setSenderUserId(u);
      fetchSearchUsers("", u, 1).then((res) => {
        setContacts(res);
      });
    }
    return () => {
      stopConnection();
    }
  }, []);

  const fetchSearchUsers = async (query, userId, page) => {
    console.log(`${query} + ${page}`);
    console.log(userId);
    if (query.trim() == "") {
      try {
        const res = await axiosInstance.get(`/contacts/${userId}/${page}`);
        if (res.data.length == 0) setHasMore(false);
        return res.data || [];
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    // Fetch contacts based on the query and page
    try {
      const res = await axiosInstance.get(`/users/search/${query}/${page}`);
      if (res.data.length == 0) setHasMore(false);
      return res.data || [];
    } catch (err) {
      console.error(err);
    }
    return [];
  };

  const [ref, inView, entry] = useInView({
    onChange: async (inView, entry) => {
      if (inView) {
        const contactsToAdd = await fetchSearchUsers(query, senderUserId, page + 1);
        setPage((prev) => prev + 1);
        setTimeout(() => {
          setContacts((prev) => [...prev, ...contactsToAdd]);
        }, 1000);
      }
    },
  });

  const handleCardClick = async (contactId) => {
    try {
        console.log("senderUserId", senderUserId);
        console.log("receiverId", contactId);
        const chatHistoryResponse = await axiosInstance.get(`/chats/messages/sender/${senderUserId}/receiver/${contactId}`);
        const chatHistory = chatHistoryResponse.data;
        console.log("history", chatHistory);
        setSelectedContact(contactId === selectedContact ? null : contactId);
        setChatHistory(chatHistory);
        onContactSelect(contactId, chatHistory);
    } catch (error) {
        console.error('Error fetching chat history:', error);
    }
};

  useEffect(() => {
    const query$ = fromEvent(inputRef.current, "input").pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((e) => fetchSearchUsers(e.target.value, senderUserId, page))
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
  }, [senderUserId]);

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
          {contact.lastMessageSent}
        </div>
      </div>

      <div style={{ marginLeft: "10px", fontSize: "12px" }}>
        {new Date(contact.lastMessageSentAt).toLocaleTimeString()}
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
      <ConnectedUsers connectedUserIds={connectedUserIds}/>
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

        <div ref={ref}></div>
      </div>
    </div>
  );
};

ContactSearch.propTypes = {
  onContactSelect: PropTypes.func.isRequired,
};
export default ContactSearch;
