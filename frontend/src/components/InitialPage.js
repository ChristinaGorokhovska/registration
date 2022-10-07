import { AppBar, Box, Button, ButtonGroup, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import React from "react";
import { Link } from "react-router-dom";

const styleTheme = createTheme({
  palette: {
    primary: {
      main: "#B9B7BD",
    },
  },
});

export default function InitialPage() {
  return (
    <ThemeProvider theme={styleTheme}>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="h5" sx={{ flexGrow: 1, color: "white" }}>
              Initial page
            </Typography>
            <ButtonGroup disableElevation={true} size="large">
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button color="secondary" variant="outlined">
                  Sign in
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button color="secondary" variant="outlined">
                  Sign up
                </Button>
              </Link>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <Typography variant="h2" component="h1" color="secondary" align="center" mt={2}>
          {" "}
          Sign in or Sign up
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
