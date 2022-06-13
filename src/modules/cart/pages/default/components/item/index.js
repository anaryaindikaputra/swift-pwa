/* eslint-disable no-underscore-dangle */
/**
 * ---------------------------------------------------- *
 * @dependencies Component View Dependencies
 * @summary This code block is used for defining
 * component dependencies
 * ---------------------------------------------------- *
 */
// Core Dependencies
import { useState } from 'react';
// Component Dependencies
import { Button, Typography } from '@commons';
import Item from '@core_modules/cart/pages/default/components/item/item';
import TableList from '@core_modules/cart/pages/default/components/item/TableListItem';
// Styling Dependencies
import useStyles from '@core_modules/cart/pages/default/components/style';
// Utility Dependencies
import classNames from 'classnames';

/**
 * ---------------------------------------------------- *
 * @components Component Item Product View
 * @summary This function is used for defining
 * component item product view
 * ---------------------------------------------------- *
 */
const ItemProduct = (props) => {
    const {
        t, editMode, toggleEditDrawer, product, quantity, configurable_options = [], deleteItem, prices,
        handleFeed, bundle_options, links, customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable,
    } = props;
    const [confirmDel, setConfirmDel] = useState(false);
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: props.id,
            product: props.product,
            quantity: props.quantity,
            prices: props.prices,
        });
    };

    const handleAddWishlist = () => {
        handleFeed(props);
    };
    return (
        <Item
            t={t}
            confirmDel={confirmDel}
            handleDelete={handleDelete}
            handleAddWishlist={handleAddWishlist}
            setConfirmDel={setConfirmDel}
            product={product}
            configurable_options={configurable_options}
            bundle_options={bundle_options}
            links={links}
            quantity={quantity}
            prices={prices}
            editMode={editMode}
            toggleEditDrawer={toggleEditDrawer}
            customizable_options={SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options}
        />
    );
};

/**
 * ---------------------------------------------------- *
 * @components Component Item View
 * @summary This function is used for defining
 * component item view
 * ---------------------------------------------------- *
 */
const ItemView = (props) => {
    const styles = useStyles();
    const {
        data, t, toggleEditMode, editMode, deleteItem, handleFeed, toggleEditDrawer, ...other
    } = props;
    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={classNames(styles.toolbarCounter, 'hidden-desktop')}>
                    <Typography variant="p" type="regular">
                        <span>{data.total_quantity}</span>
                        {' '}
                        {t('cart:counter:text')}
                    </Typography>
                </div>
                <div className={classNames(styles.toolbarActions, 'hidden-desktop')}>
                    <Button variant="outlined" className={styles.toolbarButton} onClick={toggleEditMode}>
                        {editMode ? <>{t('common:button:save')}</> : <>{t('common:button:edit')}</>}
                    </Button>
                </div>
            </div>
            <div className={classNames(styles.items, 'hidden-desktop')}>
                {data.items.map((item, idx) => (
                    <ItemProduct
                        {...item}
                        key={idx}
                        t={t}
                        editMode={editMode}
                        toggleEditDrawer={() => toggleEditDrawer({
                            id: item.id,
                            quantity: item.quantity,
                            product_name: item.product.name,
                        })}
                        deleteItem={deleteItem}
                        handleFeed={handleFeed}
                        {...other}
                    />
                ))}
            </div>
            <div className="hidden-mobile">
                <TableList
                    data={data.items}
                    t={t}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                    {...other}
                />
            </div>
        </div>
    );
};

export default ItemView;
