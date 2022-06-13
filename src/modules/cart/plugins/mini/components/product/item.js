/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * ---------------------------------------------------- *
 * @dependencies Plugin Item View Dependencies
 * @summary This code block is used for defining
 * dependencies
 * ---------------------------------------------------- *
 */
// Core Depenencies
import { useTranslation } from '@i18n';
// Components Dependencies
import { Thumbor } from '@commons';
import { IconButton } from '@material-ui/core/index';
import { Delete } from '@material-ui/icons/index';
import Link from 'next/link';
// Helper Dependencies
import { formatPrice } from '@helper_currency';
// Styling Dependencies
import useStyles from '@plugin_minicart/components/style';

/**
 * ---------------------------------------------------- *
 * @components Plugin Item View
 * @summary This function is used for defining
 * view component
 * ---------------------------------------------------- *
 */
const Item = (props) => {
    const styles = useStyles();
    const {
        quantity, prices, product, deleteCart, updateCart, id, configurable_options, bundle_options, customizable_options,
        SimpleMiniCustomizable, ConfigurableMiniCustomizable,
        aw_giftcard_option,
    } = props;
    const { t } = useTranslation(['common']);
    const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;

    return (
        <li>
            <div className={styles.product}>
                <a className={styles.productItemPhoto}>
                    <Thumbor className="product-image-photo" src={product.small_image.url} alt={product.small_image.label} width={75} height={92} />
                    {prices?.row_total_including_tax?.value === 0 ? <span>{t('common:title:free')}</span> : null}
                </a>
                <div className={styles.productDetailsWrapper}>
                    <div className={styles.productHeader}>
                        <div className="product-item-name">
                            <strong>
                                <Link href="/[...slug]" as={`/${product.url_key}`}>
                                    <a>{product.name}</a>
                                </Link>
                            </strong>
                        </div>
                        <IconButton aria-label="delete" size="small" onClick={() => deleteCart(id)}>
                            <Delete />
                        </IconButton>
                    </div>
                    {configurable_options && configurable_options.length ? (
                        <div className={styles.productOptions}>
                            {configurable_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.option_label}</strong>
                                    {`: ${val.value_label}`}
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {bundle_options && bundle_options.length ? (
                        <div className={styles.productOptions}>
                            {bundle_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.label}</strong>
                                    {': '}
                                    <div className="option-wrapper__item">
                                        {val.values.map((item, idt) => (
                                            <div key={idt}>
                                                {`${item.quantity} x ${item.label}`}
                                                <strong>{`+ $ ${item.price}`}</strong>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {cartCustomOptions && cartCustomOptions.length ? (
                        <div className={styles.productOptions}>
                            {cartCustomOptions.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <div className="row option-wrapper__item">
                                        <strong>{`${val.label}: `}</strong>
                                        {val.values.map((item, idt) => (
                                            <p key={idt} className="option-item">
                                                {item.label && item.label !== '' ? item.label : item.value}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {aw_giftcard_option && aw_giftcard_option.length ? (
                        <div className={styles.productOptions}>
                            {aw_giftcard_option.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <div className="row option-wrapper__item">
                                        <strong>{`${val.label}: `}</strong>
                                        {val.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    <div className={styles.productItemPricing}>
                        <div className="details-qty qty">
                            <label className="label" htmlFor="cart-item">Qty</label>
                            <div className="config-qty">
                                <span className="item-minus qty-update" onClick={() => (quantity > 1 ? updateCart(id, quantity - 1) : '')} />
                                <span className="item-count">{quantity}</span>
                                <span className="item-plus qty-update" onClick={() => updateCart(id, quantity + 1)} />
                            </div>
                        </div>
                        <div className="item-price">
                            {formatPrice(prices?.row_total_including_tax?.value || 0, prices?.row_total_including_tax?.currency || 'IDR')}
                        </div>
                    </div>
                    {product.stock_status === 'OUT_OF_STOCK' && (
                        <div className="oos-info">
                            <span className="oos-info-content">{t('common:cart:oos')}</span>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};

export default Item;
