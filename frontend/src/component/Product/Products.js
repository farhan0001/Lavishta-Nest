import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "../Home/ProductCard.js";
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData.js';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
]

const Products = () => {

    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resultPerPage } = useSelector(state => state.products);
    const alert = useAlert();
    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 250000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
            return;
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, alert, error, keyword, currentPage, price, category, ratings])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title="Products" />
                    <h2 className='productsHeading'>Products</h2>
                    <div className='products'>
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={250000}
                        />

                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((cat) => (
                                <li
                                    className='category-link'
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider 
                                value={ratings}
                                onChange={(event, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby='continuous-slider'
                                min={0}
                                max={5}
                                valueLabelDisplay='auto'
                            />
                        </fieldset>

                    </div>

                    {
                        resultPerPage < productsCount && (
                            <div className='paginationBox'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    activeClass='pageItemActive'
                                    activeLinkClass='pageLinkActive'
                                />

                            </div>
                        )
                    }
                </Fragment>
            }
        </Fragment>
    )
}

export default Products