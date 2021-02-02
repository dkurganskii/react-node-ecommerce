import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./ApiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Home Page"
            description="Node React E-commerce App"
            className="container-fluid"
        >
            <Search />
            <h2 >New Arrivals</h2>
            <div className="row m-5">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-sm-12 col-md-8 col-lg-4 d-flex align-items-stretch">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 >Best Sellers</h2>
            <div className="row m-5">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
