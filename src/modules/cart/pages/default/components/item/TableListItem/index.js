/**
 * ---------------------------------------------------- *
 * @dependencies Component View Dependencies
 * @summary This code block is used for defining
 * component dependencies
 * ---------------------------------------------------- *
 */
// Core Dependencies
import React from 'react';
import Link from 'next/link';
// Component Dependencies
import {
    Image, Typography,
} from '@commons';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import {
    IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core/index';
import {
    CreateOutlined, FavoriteBorderOutlined, DeleteOutlineOutlined,
} from '@material-ui/icons/index';
import {
    Alert,
} from '@material-ui/lab/index';
// Helper Dependencies
import { formatPrice } from '@helper_currency';
// Styling Dependencies
import useStyles from '@core_modules/cart/pages/default/components/item/TableListItem/style';

/**
 * ---------------------------------------------------- *
 * @components Component View
 * @summary This function is used for defining
 * component view
 * ---------------------------------------------------- *
 */
const TableListProduct = ({
    data, t, deleteItem, handleFeed, toggleEditDrawer, storeConfig = {},
}) => {
    const styles = useStyles();
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelet] = React.useState(null);
    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelet(item);
    };
    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
            id: selectDelete.id,
            product: selectDelete.product,
            quantity: selectDelete.quantity,
            prices: selectDelete.prices,
        });
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelet(null);
    };

    const handleAddWishlist = (item) => {
        handleFeed(item);
    };

    const openEdit = (item) => {
        toggleEditDrawer({
            id: item.id,
            quantity: item.quantity,
            product_name: item.product.name,
        });
    };

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <>
            <ConfirmationDelete
                t={t}
                open={confirmDel}
                handleDelete={handleDelete}
                handleCancel={cancelDelete}
            />
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" colSpan={2}>
                                <Typography variant="span" type="bold">
                                    Item
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:title:price')}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:title:shortQty')}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:subtotal')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? (
                            <>
                                {
                                    data.map((val, index) => {
                                        const { customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable } = val;
                                        const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                        return (
                                            <React.Fragment key={index}>
                                                <TableRow className={styles.tableRowResponsive} key={index}>
                                                    <TableCell
                                                        align="center"
                                                        rowSpan={2}
                                                    >
                                                        <div className={styles.productImgContainer}>
                                                            <Link
                                                                href="/[...slug]"
                                                                as={`/${val.product.url_key}`}
                                                            >
                                                                <a>
                                                                    <Image
                                                                        src={val.product.small_image.url}
                                                                        className={styles.productImg}
                                                                        alt={val.product.name}
                                                                        width={defaultWidth}
                                                                        height={defaultHeight}
                                                                        quality={80}
                                                                    />
                                                                </a>
                                                            </Link>
                                                            {
                                                                val.prices.price.value === 0 ? (
                                                                    <span>Free</span>
                                                                ) : null
                                                            }
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        className={styles.noBorder}
                                                    >
                                                        <div className="row">
                                                            <div className="col-xs-12">
                                                                <Link
                                                                    href="/[...slug]"
                                                                    as={`/${val.product.url_key}`}
                                                                >
                                                                    <a>
                                                                        <Typography variant="h3" letter="capitalize" type="bold">
                                                                            {val.product.name}
                                                                        </Typography>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                            <div className="col-xs-12 column">
                                                                {val.configurable_options ? val.configurable_options.map((item, idx) => (
                                                                    <Typography variant="span" letter="capitalize" key={idx}>
                                                                        <strong>{item.option_label}</strong>
                                                                        {' '}
                                                                        :
                                                                        {' '}
                                                                        {item.value_label}
                                                                    </Typography>
                                                                )) : null}
                                                            </div>
                                                            {
                                                                val.links && val.links.length > 0 && (
                                                                    <div className="col-xs-12 row option-link">
                                                                        <Typography variant="span" letter="capitalize" type="bold">
                                                                            Downloads :
                                                                            {' '}
                                                                        </Typography>
                                                                        <div className="column">
                                                                            {val.links.map((item, idx) => (
                                                                                <Typography variant="span" letter="capitalize" key={idx}>
                                                                                    {item.title}
                                                                                </Typography>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        {val.bundle_options && val.bundle_options.length ? (
                                                            <div className="product-options">
                                                                {val.bundle_options.map((value, idx) => (
                                                                    <div className="option-wrapper" key={idx}>
                                                                        <strong>{value.label}</strong>
                                                                        {' '}
                                                                        :
                                                                        <div className="option-wrapper__item">
                                                                            {value.values.map((item, idt) => (
                                                                                <div key={idt}>
                                                                                    {item.quantity}
                                                                                    {' '}
                                                                                    x
                                                                                    {item.label}
                                                                                    {' '}
                                                                                    <strong>
                                                                                        + $
                                                                                        {item.price}
                                                                                    </strong>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                        {val.bundle_options && val.bundle_options.length ? (
                                                            <div className="product-options">
                                                                {val.bundle_options.map((bundle, idb) => (
                                                                    <div className="option-wrapper" key={idb}>
                                                                        <strong>{bundle.label}</strong>
                                                                        {' '}
                                                                        :
                                                                        <div className="option-wrapper__item">
                                                                            {bundle.values.map((item, idt) => (
                                                                                <div key={idt}>
                                                                                    {item.quantity}
                                                                                    {' '}
                                                                                    x
                                                                                    {item.label}
                                                                                    {' '}
                                                                                    <strong>
                                                                                        + $
                                                                                        {item.price}
                                                                                    </strong>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                        {cartCustomOptions && cartCustomOptions.length ? (
                                                            <div className="product-options">
                                                                {cartCustomOptions.map((op, idx) => (
                                                                    <div className="option-wrapper" key={idx}>
                                                                        <div className="row option-wrapper__item">
                                                                            <strong>
                                                                                {op.label}
                                                                                {' '}
                                                                                :
                                                                            </strong>
                                                                            {op.values.map((item, idt) => (
                                                                                <p key={idt} className="option-item">
                                                                                    {(item.label && item.label !== '') ? item.label : item.value}
                                                                                </p>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        className={styles.noBorder}
                                                    >
                                                        <Typography variant="span" align="right" letter="capitalize">
                                                            {formatPrice(
                                                                val.prices.price.value,
                                                                val.prices.price.currency || 'IDR',
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        className={styles.noBorder}
                                                    >
                                                        <Typography variant="span" align="right" letter="capitalize">
                                                            {val.quantity}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        className={styles.noBorder}
                                                    >
                                                        <Typography variant="span" align="right" letter="capitalize" type="bold">
                                                            {formatPrice(
                                                                val.prices.row_total_including_tax.value,
                                                                val.prices.row_total_including_tax.currency,
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    {/* <TableCell
                                                    align="center"
                                                >
                                                    <div className="row center-xs" style={{ maxWidth: 100 }}>
                                                        <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                            <IconButton
                                                                className={styles.iconBtn}
                                                                onClick={() => openEdit(val)}
                                                            >
                                                                <CreateOutlined className={styles.icon} />
                                                            </IconButton>
                                                        </div>
                                                        <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                            <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                                <FavoriteBorderOutlined className={styles.icon} />
                                                            </IconButton>
                                                        </div>
                                                        <div className="col-xs-12" style={{ maxWidth: 100 }}>
                                                            <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                                <DeleteOutlineOutlined className={styles.icon} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </TableCell> */}
                                                </TableRow>
                                                <TableRow>
                                                    {(val && val.product.stock_status === 'OUT_OF_STOCK') ? (
                                                        <>
                                                            <TableCell colSpan={3}>
                                                                <Alert severity="error" style={{ width: '11vw' }}>
                                                                    {t('cart:oos')}
                                                                </Alert>
                                                            </TableCell>
                                                        </>
                                                    ) : (<TableCell colSpan={3} />)}
                                                    <TableCell
                                                        align="right"
                                                    >
                                                        <div>
                                                            <IconButton
                                                                className={styles.iconBtn}
                                                                onClick={() => openEdit(val)}
                                                            >
                                                                <CreateOutlined fontSize="small" className={styles.icon} />
                                                            </IconButton>
                                                            <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                                <FavoriteBorderOutlined fontSize="small" className={styles.icon} />
                                                            </IconButton>
                                                            <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                                <DeleteOutlineOutlined fontSize="small" className={styles.icon} />
                                                            </IconButton>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Alert severity="warning">{t('order:notFound')}</Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableListProduct;
