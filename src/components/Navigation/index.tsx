import React, {FunctionComponent} from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import YouTubeIcon from "@material-ui/icons/YouTube";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import {useHistory} from "react-router-dom";
import {Avatar, LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import Logo from "../../media/ChannelLogo.svg";
import VideoSearch from "./videoSearch";
import LoginMenu from "./LoginMenu";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PropTypes from "prop-types";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "#303030",
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#303030",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      justifyContent: "flex-end",
      height: "75px",
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    grow: {
      flexGrow: 0.4,
    },
  }),
);

export const Navigation: FunctionComponent = ({children}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const {isLoading} = useSelector((state: RootState) => state.videos);
  const admin = useSelector((state: RootState) => state.admin);


  const pushToRoute = (route: string) => {
    history.push(route);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const search = (event: React.FormEvent<HTMLDivElement>, value: string) => {
    event.preventDefault();

    pushToRoute(`/search?search=${value}`);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{minHeight: "75px"}}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            alt="Conservative Christian logo"
            src={Logo}
            style={{marginRight: "10px"}}
          />
          <Typography variant='h6' noWrap>
            Conservative Christian
          </Typography>
          <div className={classes.grow} />
          <VideoSearch search={search} />
          <div style={{flexGrow: 0.6}} />
          <LoginMenu />
        </Toolbar>
        {isLoading ? <LinearProgress color='secondary' /> : null}
        <Divider />
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => pushToRoute("/home")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem button onClick={() => pushToRoute("/videos")}>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary='Videos' />
          </ListItem>
          {admin.admin ?
          <ListItem button onClick={() => pushToRoute("/admin/dashboard")}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary='Admin Dashboard' />
          </ListItem>:
          null}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              window.open(
                  "https://www.youtube.com/channel/UCAqB5OuNHZXMChmbVbLZkaw",
                  "_blank",
              );
            }}
          >
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <ListItemText primary='YouTube' />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              window.open(
                  "https://parler.com/profile/OfficialConservativeChristian/posts",
                  "_blank",
              );
            }}
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary='Parler' />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

Navigation.propTypes = {
  children: PropTypes.any,
};
