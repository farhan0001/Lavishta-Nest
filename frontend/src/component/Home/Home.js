import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js"
import "./Home.css";
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from "react-alert";

const Home = () => {

    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            return;
        }
        dispatch(getProduct());
    }, [dispatch, alert, error]);

    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    (<Fragment>

                        <MetaData title="Lavishta" />

                        <div className="banner">
                            <p>Welcome to Lavishta</p>
                            <h1>FIND AMAZING PRODUCTS HERE</h1>
                            <a href="#container">
                                <button>
                                    <div>Scroll</div> <CgMouse />
                                </button>
                            </a>
                        </div>
                        <h2 className="homeHeading">Featured Products</h2>
                        <div className="container" id="container">
                            {products && products.map((product, index) => <ProductCard key={index} product={product} />)}
                        </div>
                    </Fragment>)
            }
        </Fragment>
    )
}

export default Home