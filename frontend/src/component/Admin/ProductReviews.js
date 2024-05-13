import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './ProductReviews.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllReviews, deleteReview } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import Sidebar from './Sidebar';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const ProductReviews = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, reviews, loading } = useSelector(state => state.productReviews);

    const { error: deleteError, isDeleted } = useSelector(state => state.review);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    }

    const productReviewSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(getAllReviews(productId));
    }

    useEffect(() => {

        if(productId.length === 24){
            dispatch(getAllReviews(productId));
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors);
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }

    }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.2,
            cellClassName: (params) => {
                return params.api.getCellValue(params.id, "rating") >= 3
                    ? "greenColor" : "redColor";
            }
        },

        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={() => deleteReviewHandler(params.api.getCellValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        }
    ];

    const rows = [];

    reviews &&
        reviews.forEach(item => {
            rows.push({
                id: item._id,
                user: item.name,
                comment: item.comment,
                rating: item.rating
            });
        });

    return (
        <Fragment>
            <MetaData title={`All Reviews - Admin`} />

            <div className='dashboard'>
                <Sidebar />
                <div className='productReviewsContainer'>

                    <form
                        className='productReviewsForm'
                        onSubmit={productReviewSubmitHandler}
                    >
                        <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>
                        <div>
                            <StarIcon />
                            <input
                                type='text'
                                placeholder='Product ID'
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id='createProductBtn'
                            type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>

                    {
                        reviews && reviews.length > 0 ?
                            (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5
                                            }
                                        }
                                    }}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                    className='productListTable'
                                    autoHeight
                                />
                            ) : (
                                <h1 className='productReviewsFormHeading' >No Reviews Found</h1>
                            )
                    }

                </div>
            </div>

        </Fragment>
    )
}

export default ProductReviews