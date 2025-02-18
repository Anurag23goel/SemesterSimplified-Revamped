"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FilterIcon } from "lucide-react";

export default function FiltersDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const filterOptions = [
    { name: "Sort By", options: ["Newest", "Oldest", "Most Popular"] },
    { name: "Category", options: ["Beginner", "Intermediate", "Advanced"] },
    { name: "Price Range", options: ["Free", "Paid"] },
  ];

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <h3 className="text-lg font-semibold px-4 py-2">Filters</h3>
        {filterOptions.map((filter, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemText primary={filter.name} className="font-bold px-4" />
            </ListItem>
            {filter.options.map((option, subIndex) => (
              <ListItem key={subIndex} disablePadding>
                <ListItemButton>
                  <ListItemText primary={option} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="w-fit">
      <Button onClick={toggleDrawer(true)}><FilterIcon/></Button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </div>
  );
}
