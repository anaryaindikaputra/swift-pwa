/**
 * ---------------------------------------------------- *
 * @dependencies Component View Dependencies
 * @summary This code block is used for defining
 * component dependencies
 * ---------------------------------------------------- *
 */
// Components Dependencies
import { IconButton } from '@material-ui/core/index';
import { AddShoppingCart } from '@material-ui/icons/index';

/**
 * ---------------------------------------------------- *
 * @components Component View
 * @summary This function is used for defining
 * component view
 * ---------------------------------------------------- *
 */
const ButtonAddToCart = () => (
    <IconButton aria-label="add to shopping cart"><AddShoppingCart /></IconButton>
);

export default ButtonAddToCart;
