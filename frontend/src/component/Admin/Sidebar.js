import React, { Fragment } from 'react';
import "./Sidebar.css";
import logo from "../../images/Lavishta.png";
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Sidebar = () => {
    return (
        <Fragment>
            <div className='sidebar'>
                <Link to="/">
                    <img src={logo} alt="Lavishta" />
                </Link>
                <Link to='/admin/dashboard'>
                    <p>
                        <DashboardIcon /> Dashboard
                    </p>
                </Link>
                <Link>
                    <SimpleTreeView
                        slots={{
                            expandIcon: ExpandMoreIcon,
                            collapseIcon: ImportExportIcon
                        }}
                    >
                        <TreeItem itemId='1' label="Products">
                            <Link to='/admin/products'>
                                <TreeItem itemId="2" label="All" slots={{ icon: PostAddIcon }} />
                            </Link>
                            <Link to='/admin/product'>
                                <TreeItem itemId="3" label="Create" slots={{ icon: AddIcon }} />
                            </Link>
                        </TreeItem>
                    </SimpleTreeView>
                </Link>
                <Link to='/admin/orders'>
                    <p>
                        <ListAltIcon />
                        Orders
                    </p>
                </Link>
                <Link to="/admin/users">
                    <p>
                        <PeopleIcon /> Users
                    </p>
                </Link>
                <Link to="/admin/reviews">
                    <p>
                        <RateReviewIcon /> Reviews
                    </p>
                </Link>
            </div>
        </Fragment>
    )
}

export default Sidebar