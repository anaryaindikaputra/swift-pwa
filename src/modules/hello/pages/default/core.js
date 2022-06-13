/**
 * ---------------------------------------------------- *
 * @dependencies Component View Dependencies
 * @summary This code block is used for defining
 * component dependencies
 * ---------------------------------------------------- *
 */
// Core Dependencies
import React from 'react';
// Component Dependencies
import ButtonAddToCart from '@common_buttonaddtocart';
import Layout from '@layout';
import {
    Card, CardActions, CardContent, CardMedia, Container, Grid,
} from '@material-ui/core/index';
// Utility Dependencies
import { getAllProducts } from '@core_modules/hello/services/graphql';

const CoreDefault = (props) => {
    const { data, loading, error } = getAllProducts();

    const config = {
        title: 'My Module Page',
        header: 'relative',
        headerTitle: 'My Module Page',
        bottomNav: false,
    };

    if (loading) return <>Loading ...</>;

    if (error) return `Error: ${error.message}`;

    return (
        <Layout pageConfig={config} {...props}>
            <Container>
                <h1>Products</h1>
                <hr />
                <Grid
                    className="product-grid"
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {
                        data.products.items.map((product, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        height="250"
                                        image={product.small_image.url}
                                    />
                                    <CardContent>
                                        <h4>{product.name}</h4>
                                        <h3>
                                            {`Rp${product.price_range.minimum_price.final_price.value}`}
                                        </h3>
                                    </CardContent>
                                    <CardActions className="product-card-action">
                                        {/* <Button variant="text">Add to Cart</Button> */}
                                        <ButtonAddToCart />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Layout>
    );
};

export default CoreDefault;
