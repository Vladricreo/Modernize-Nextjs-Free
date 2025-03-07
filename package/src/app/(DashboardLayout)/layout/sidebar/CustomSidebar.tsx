import React from "react";
import { Box, Drawer, List, styled, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";

interface CustomSidebarProps {
  width: string;
  open: boolean;
  children?: React.ReactNode;
}

interface CustomLogoProps {
  img: string;
}

const SidebarWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  display: "flex",
  flexDirection: "column",
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  padding: "20px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const CustomLogo: React.FC<CustomLogoProps> = ({ img }) => {
  return (
    <LogoWrapper>
      <img src={img} alt="logo" style={{ maxHeight: "40px" }} />
    </LogoWrapper>
  );
};

export const CustomSidebar: React.FC<CustomSidebarProps> = ({
  width,
  open,
  children,
}) => {
  const theme = useTheme();

  return (
    <SidebarWrapper
      sx={{
        width: width,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {children}
    </SidebarWrapper>
  );
};

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const theme = useTheme();
  const lgUp = theme.breakpoints.up("lg");

  const sidebarWidth = "270px";

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  const renderSidebarContent = () => (
    <>
      <CustomLogo img="/images/logos/dark-logo.svg" />
      <Box sx={{ flexGrow: 1, overflow: "auto", ...scrollbarStyles }}>
        <List component="nav" sx={{ p: 2 }}>
          <SidebarItems />
        </List>
        <Upgrade />
      </Box>
    </>
  );

  // For desktop
  if (theme.breakpoints.up("lg")) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
              width: sidebarWidth,
            },
          }}
        >
          <CustomSidebar width={sidebarWidth} open={isSidebarOpen}>
            {renderSidebarContent()}
          </CustomSidebar>
        </Drawer>
      </Box>
    );
  }

  // For mobile
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: theme.shadows[8],
          ...scrollbarStyles,
          width: sidebarWidth,
        },
      }}
    >
      <CustomSidebar width={sidebarWidth} open={isMobileSidebarOpen}>
        {renderSidebarContent()}
      </CustomSidebar>
    </Drawer>
  );
};

export default MSidebar;
