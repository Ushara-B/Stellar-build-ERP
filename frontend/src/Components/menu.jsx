import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import SupplierPage from '../Supplierpage'; // Import the SupplierPage component

const SideMenuBar = styled('div')({
  backgroundColor: '#1B1A55',
  color: 'white',
  position: 'fixed',
  paddingTop: 120,
  top: 0,
  left: 0,
  bottom: 0,
  width: '250px'
});

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover, &.Mui-selected': {
    backgroundColor: '#070F2B',
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      color: '#ffffff',
    },
  },
}));

export default function NestedList() {
  const [openMenus, setOpenMenus] = React.useState({});
  const [renderedComponent, setRenderedComponent] = React.useState(null);

  const handleMenuClick = (menuName) => {
    setOpenMenus((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      newState[menuName] = !prevState[menuName];

      return newState;
    });
    setRenderedComponent(null); // Clear the rendered component
  };

  const handleSubMenuClick = (menuName, subMenuName) => {
    if (menuName === 'Contact' && subMenuName === 'Suppliers') {
      setRenderedComponent(<SupplierPage />); // Render the SupplierPage component
    } else {
      setRenderedComponent(null); // Clear the rendered component
    }
  };

  const mainMenus = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Contact', path: '/contact', subMenus: ['Suppliers', 'Clients', 'Add contacts'] },
    { name: 'Projects', path: '/projects', subMenus: ['All projects', 'New projects', 'Project categories'] },
    { name: 'Inventory', path: '/inventory', subMenus: ['Add Inventory', 'View inventory list'] },
    { name: 'Financial', path: '/financial', subMenus: ['Financial Dashboard', 'Expenses', 'Incomes', 'Categories'] },
    { name: 'Vehicle', path: '/vehicle', subMenus: ['View Vehicles', 'Add Vehicle', 'Assign drivers'] },
    { name: 'Loans Management', path: '/loan-management', subMenus: ['Add loans', 'Bank/Bussines Loans', 'Vehicle  finance'] },
    { name: 'User Management', path: '/user-management', subMenus: ['View users', 'Add users'] },
    { name: 'Employee Management', path: '/employee-management', subMenus: ['View employees', 'Leaves', 'Attendance'] },
  ];

  return (
    <SideMenuBar>
      <StyledList component="nav" aria-labelledby="nested-list-subheader">
        {mainMenus.map((menu) => (
          <React.Fragment key={menu.name}>
            <StyledListItemButton onClick={() => handleMenuClick(menu.name)}>
              <ListItemText primary={menu.name} />
              {menu.subMenus && (openMenus[menu.name] ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItemButton>
            {menu.subMenus && (
              <Collapse in={openMenus[menu.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.subMenus.map((subMenu) => (
                    <StyledListItemButton sx={{ pl: 4 }} key={subMenu} onClick={() => handleSubMenuClick(menu.name, subMenu)}>
                      <ListItemText primary={subMenu} />
                    </StyledListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </StyledList>
      {renderedComponent}
    </SideMenuBar>
  );
}