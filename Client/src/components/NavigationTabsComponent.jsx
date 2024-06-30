import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IoChatbubbleEllipses } from "react-icons/io5"
import { MdGroups } from "react-icons/md"
import { IoMdSettings } from "react-icons/io"
import { FaSearch } from "react-icons/fa"
import Tooltip from '@mui/material/Tooltip';
import LogoutComponent from './LogoutComponent'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <p>{children}</p>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function NavigationTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className=' bg-white h-full flex flex-col'>
            <div className=' my-5 font-FutuBd text-[#252525] w-full flex justify-center text-4xl  pb-2 '>
                <span className=' text-3xl sm:text-4xl'>FalConverse</span>
            </div>
            <hr className=' w-full h-[2px] bg-gray-300' />
            <Box

                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', }}
            >

                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', }}
                >
                    <Tooltip title = 'Chat' placement='right' >
                        <Tab label={<IoChatbubbleEllipses className=' text-4xl'/>} {...a11yProps(0)} />
                    </Tooltip>
                    
                    <Tooltip title = 'Groups' placement='right' >
                        <Tab label={<MdGroups className=' text-4xl'/>} {...a11yProps(1)} />
                    </Tooltip>
                    <Tooltip title = 'Search users' placement='right' >
                        <Tab label={<FaSearch className=' text-4xl'/>} {...a11yProps(2)} />
                    </Tooltip>
                    <Tooltip title = 'Settings' placement='right' >
                        <Tab label={<IoMdSettings className=' text-4xl'/>} {...a11yProps(3)} />
                    </Tooltip>
                   
                    

                </Tabs>
                <TabPanel value={value} index={0}>
                    <div className=' w-72 h-full'>
                        <p>Chat list</p>
                    </div>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className=' w-72 h-full'>
                        <p>Group list</p>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className=' w-72 h-full'>
                        <p>Search</p>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div className=' w-72 h-full'>
                        <p>Settings</p>
                    </div>
                </TabPanel>

            </Box>
            <hr className=' w-full h-[2px] bg-gray-300' />
            <div className=' flex justify-end py-3 px-5'>
                <LogoutComponent/>
            </div>
        </div>

    );
}
