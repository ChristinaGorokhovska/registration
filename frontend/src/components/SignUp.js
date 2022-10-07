import React, { useState } from "react";
import Axois from "axios";
import { Avatar, FormControl, InputLabel, Paper, Typography, Box, OutlinedInput, Button } from "@mui/material";
import { Container } from "@mui/system";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: null,
    lastName: null,
    country: null,
    email: null,
    password: null,
  });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axois.post("/api/signup", { ...form });
      Notification(res.data.message, "default");
    } catch (err) {
      console.log("error", err);
      Notification(err.response.data.message || "Error", "danger");
    }
  };

  const notificationsStyle = {
    fontFamily: "sans-serif",
  };

  const Notification = (msg, type) => {
    return Store.addNotification({
      message: msg,
      className: notificationsStyle.font,
      type: type,
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 3000,
        onScreen: true,
        showIcon: true,
      },
    });
  };

  return (
    <div>
      <div style={notificationsStyle}>
        <ReactNotifications></ReactNotifications>
      </div>
      <Container>
        <Box>
          <Paper
            elevation={16}
            sx={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "50%",
              margin: "0 auto",
              borderRadius: 10,
              border: 1,
            }}
          >
            <Avatar sx={{ bgcolor: "white" }}>
              <SensorOccupiedIcon color="secondary" fontSize="large" />
            </Avatar>
            <Typography component="h2" variant="h4" sx={{ mt: 2 }}>
              Sign Up
            </Typography>
            <Typography component="p" sx={{ mt: 2 }}>
              Enter the necessary data
            </Typography>

            <Box
              component="form"
              sx={{ mt: 2, minWidth: "60%", gap: 4, display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              <FormControl color="secondary">
                <InputLabel htmlFor="firstName-input" sx={{ bgcolor: "white" }}>
                  First Name
                </InputLabel>
                <OutlinedInput
                  id="firstName-input"
                  type="text"
                  required
                  name="firstName"
                  onChange={formHandler}
                ></OutlinedInput>
              </FormControl>

              <FormControl color="secondary">
                <InputLabel htmlFor="lastName-input" sx={{ bgcolor: "white" }}>
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id="lastName-input"
                  type="text"
                  required
                  name="lastName"
                  onChange={formHandler}
                ></OutlinedInput>
              </FormControl>

              <FormControl color="secondary">
                <InputLabel htmlFor="country-input" sx={{ bgcolor: "white" }}>
                  Country
                </InputLabel>
                <OutlinedInput
                  id="country-input"
                  type="text"
                  required
                  name="country"
                  onChange={formHandler}
                ></OutlinedInput>
              </FormControl>

              <FormControl color="secondary">
                <InputLabel htmlFor="email-input" sx={{ bgcolor: "white" }}>
                  Email
                </InputLabel>
                <OutlinedInput
                  id="email-input"
                  type="email"
                  required
                  name="email"
                  onChange={formHandler}
                ></OutlinedInput>
              </FormControl>

              <FormControl color="secondary">
                <InputLabel htmlFor="password-input" sx={{ bgcolor: "white" }}>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password-input"
                  type="password"
                  required
                  name="password"
                  onChange={formHandler}
                ></OutlinedInput>
              </FormControl>

              <Button type="submit" color="secondary" variant="outlined" sx={{ maxWidth: "30%", margin: "0 auto" }}>
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
