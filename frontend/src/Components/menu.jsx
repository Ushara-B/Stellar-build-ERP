import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useLocation, Link } from 'react-router-dom';

const SideMenuBar = styled('div')({
  backgroundColor: '#1B1A55',
  color: 'white',
  position: 'fixed',
  paddingTop: 120,
  top: 0,
  left: 0,
  bottom: 0,
  width: '250px',
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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default function NestedList() {
  const [openMenus, setOpenMenus] = React.useState({});
  const [renderedComponent, setRenderedComponent] = React.useState(null);
  const location = useLocation();

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
    // Redirect to the related page based on the sub menu clicked
    if (menuName === 'Contact' && subMenuName === 'Suppliers') {
      window.location.href = '/supplier';
    } else if (menuName === 'Contact' && subMenuName === 'Clients') {
      window.location.href = '/clients';
    } else if (menuName === 'Contact' && subMenuName === 'Add contacts') {
      window.location.href = '/add-contacts';
    } else if (menuName === 'Projects' && subMenuName === 'All projects') {
      window.location.href = '/AllProjects';
    } else if (menuName === 'Projects' && subMenuName === 'New projects') {
      window.location.href = '/Newprojects';
    } else if (menuName === 'Projects' && subMenuName === 'Project categories') {
      window.location.href = '/project-categories';
    }else if (menuName === 'Vehicle' && subMenuName === 'View Vehicles'){
      window.location.href = '/viewvehicles';
    }else if (menuName === 'Vehicle' && subMenuName === 'Add Vehicle'){
      window.location.href = '/addvehicle';
    }else if (menuName === 'Vehicle'){
      window.location.href = '/vehicle';
    }else if (menuName === 'Inventory' && subMenuName === 'Add Inventory'){
      window.location.href = '/addinventory';
    }else if (menuName === 'Inventory' && subMenuName === 'View inventory list'){
      window.location.href = '/viewinventorylist';
    }else if (menuName === 'Inventory'){
      window.location.href = '/inventory';
    // Add more else if conditions for other sub menus and their respective URLs
    }else {
      // Handle any other cases
    }
  };

  const isMenuActive = (menuPath) => {
    return location.pathname.startsWith(menuPath);
  };

  const mainMenus = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Contact', path: '/contact', subMenus: ['Suppliers', 'Clients', 'Add contacts'] },
    { name: 'Projects', path: '/projects', subMenus: ['All projects', 'New projects', 'Project categories'] },
    { name: 'Inventory', path: '/inventory', subMenus: ['Add Inventory', 'View inventory list'] },
    { name: 'Financial', path: '/financial', subMenus: ['Financial Dashboard', 'Expenses', 'Incomes', 'Categories'] },
    { name: 'Vehicle', path: '/vehicle', subMenus: ['View Vehicles', 'Add Vehicle', 'Assign drivers'] },
    { name: 'Loans Management', path: '/loan-management', subMenus: ['Add loans', 'Bank/Bussines Loans', 'Vehicle finance'] },
    { name: 'User Management', path: '/allusers', subMenus: ['View users', 'Add users'] },
    { name: 'Employee Management', path: '/employee-management', subMenus: ['PaySlip', 'Leaves', 'Attendance'] },
  ];

  return (
    <SideMenuBar>
      <StyledList component="nav" aria-labelledby="nested-list-subheader">
        {mainMenus.map((menu) => (
          <React.Fragment key={menu.name}>
            <StyledListItemButton onClick={() => handleMenuClick(menu.name)} selected={isMenuActive(menu.path)}>
              <Link to={menu.path} style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <ListItemText primary={menu.name} />
              </Link>
              {menu.subMenus && (openMenus[menu.name] ? <ExpandLess /> : <ExpandMore />)}
            </StyledListItemButton>
            {menu.subMenus && (
              <Collapse in={openMenus[menu.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.subMenus.map((subMenu) => (
                    <StyledListItemButton
                      sx={{ pl: 4 }}
                      key={subMenu}
                      onClick={() => handleSubMenuClick(menu.name, subMenu)}
                      selected={isMenuActive(`${menu.path}/${subMenu.toLowerCase().replace(/ /g, '-')}`)}
                    >
                      <Link
                        to={`${menu.path}/${subMenu.toLowerCase().replace(/ /g, '-')}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        <ListItemText primary={subMenu} />
                      </Link>
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