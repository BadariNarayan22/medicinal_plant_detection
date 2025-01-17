"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { usePathname } from 'next/navigation'
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { BiMenuAltLeft } from "react-icons/bi";

const drawerWidth = 240;

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const handleItemClick = (index: any) => {
    setActiveIndex(index);
    setSelectedItem(index);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const pathname = usePathname()
  React.useEffect(()=>{
    console.log(pathname)
    if (pathname == "/details")return setActiveIndex(2)
    if (pathname == "/chatbot")return setActiveIndex(1)
    if (pathname == "/predict")return setActiveIndex(0)
    if (pathname == "/")return setActiveIndex(0)
  },[pathname])
  // const handleItemClick = (index: any) => {
  //   setSelectedItem(index);
  // };

  const drawer = (
    <div>
      <Toolbar />
      {/* <Divider /> */}
      <List>
        {["Predict", "Chatbot", "Details"].map((text, index) => (
          <Link href={`/${text.toLowerCase()}`} key={text}>
            <ListItem
              disablePadding
              onClick={() => handleItemClick(index)}
              sx={{
                backgroundColor:
                  activeIndex === index ? "rgb(255, 87, 51)" : "transparent",
              }}
              // className={index === selectedItem ? "bg-gray-300" : ""}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {/* <MenuIcon /> */}
            <BiMenuAltLeft />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Medicinal Plant Detection
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
    </ThemeProvider>
  );
}
