import { Button, Drawer, Anchor } from 'antd';
import { useState } from 'react';
import auth from '../utils/auth';

function Navbar(){
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };


      const logoutFunc =() => {
        auth.logout();
      }

    return(
        <div >
            <Button type="primary" onClick={showDrawer}>
                Nav
            </Button>
            <Drawer title="Navigation" onClose={onClose} open={open} placement='left'>
                <Anchor   
                    items={[
                        {
                            key: 'home',
                            href: '/',
                            title: 'Home',
                        },
                        {
                            key: 'profile',
                            href: '/profile',
                            title: 'Profile'
                        },
                        {
                            key: 'addproduce',
                            href: '/addproduce',
                            title: "Add Produce"
                        }
                    ]}
                />
                <Button color="danger" variant="text" onClick={logoutFunc}>Logout</Button>
            </Drawer>
        </div>
    )
}

export default Navbar;