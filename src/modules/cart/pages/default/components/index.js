/**
 * ---------------------------------------------------- *
 * @dependencies Component View Dependencies
 * @summary This code block is used for defining
 * component dependencies
 * ---------------------------------------------------- *
 */
// Core Dependencies
import Route from 'next/router';
import dynamic from 'next/dynamic';
// Helper Dependencies
import { formatPrice } from '@helper_currency';
// Plugin Dependencies
import Summary from '@plugin_summary';
// Styling Dependencies
import useStyles from '@core_modules/cart/pages/default/components/style';
// Utility Dependencies
import classNames from 'classnames';

const CrossSell = dynamic(() => import('@core_modules/cart/pages/default/components/crosssell'), { ssr: false });
const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

/**
 * ---------------------------------------------------- *
 * @components Component View
 * @summary This function is used for defining
 * component view
 * ---------------------------------------------------- *
 */
const Content = (props) => {
    const {
        ItemView, CrossSellView, CheckoutDrawerView, dataCart, t, handleFeed,
        toggleEditMode, editMode, deleteItem, toggleEditDrawer, crosssell, errorCart,
        EditDrawerView, editItem, openEditDrawer, updateItem, SummaryView, PromoModalItemView, handleAddPromoItemToCart,
        applyCoupon, removeCoupon, storeConfig,
        ...other
    } = props;
    const handleOnCheckoutClicked = () => {
        const minimumOrderEnabled = storeConfig.minimum_order_enable;
        const grandTotalValue = dataCart.prices.grand_total.value;
        const minimumOrderAmount = storeConfig.minimum_order_amount;

        if (minimumOrderEnabled && grandTotalValue < minimumOrderAmount) {
            const errorMessage = {
                variant: 'error',
                text: `Unable to place order: Minimum order amount is ${formatPrice(minimumOrderAmount)}`,
                open: true,
            };
            window.toastMessage({
                ...errorMessage,
            });
        } else {
            Route.push('/checkout');
        }
    };
    const styles = useStyles();
    return (
        <div className={classNames(styles.mobileBottomSpace, 'row')}>
            <div className="col-xs-12">
                <GimmickBanner data={dataCart.promoBanner || []} t={t} {...other} />
            </div>
            <div className={classNames(styles.header, 'col-xs-12')}>
                <h1 className={styles.title}>{t('cart:pageTitle')}</h1>
                <h6 className={styles.subtitle}>{`${dataCart.total_quantity} ${t('cart:counter:text')}`}</h6>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9" style={{ height: '100%' }}>
                <ItemView
                    data={dataCart}
                    t={t}
                    toggleEditMode={toggleEditMode}
                    editMode={editMode}
                    deleteItem={deleteItem}
                    handleFeed={handleFeed}
                    toggleEditDrawer={toggleEditDrawer}
                    storeConfig={storeConfig}
                />
                <CrossSell dataCart={dataCart} {...props} editMode={editMode} View={CrossSellView} />
                {editItem.id ? (
                    <EditDrawerView {...props} {...editItem} open={openEditDrawer} toggleOpen={toggleEditDrawer} updateItem={updateItem} />
                ) : null}
                <div className="hidden-desktop">
                    <Summary
                        disabled={errorCart && errorCart.length > 0}
                        isDesktop={false}
                        t={t}
                        dataCart={dataCart}
                        editMode={editMode}
                        storeConfig={storeConfig}
                        {...other}
                        handleActionSummary={handleOnCheckoutClicked}
                    />
                </div>
                {/* commented for now */}
                {/* {modules.promo.enabled ? (
                    <Promo
                        t={t}
                        dataCart={dataCart}
                        PromoModalItemView={PromoModalItemView}
                        handleAddPromoItemToCart={handleAddPromoItemToCart}
                        applyCoupon={applyCoupon}
                        removeCoupon={removeCoupon}
                    />
                ) : null} */}
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3 hidden-mobile">
                <Summary
                    disabled={errorCart && errorCart.length > 0}
                    isDesktop
                    t={t}
                    dataCart={dataCart}
                    editMode={editMode}
                    storeConfig={storeConfig}
                    {...other}
                    handleActionSummary={handleOnCheckoutClicked}
                    isCart
                />
            </div>
        </div>
    );
};

export default Content;
