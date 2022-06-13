import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, CreateMargin, Centering, FlexRow,
} from '@theme_mixins';
import { PRIMARY, GRAY_THIRD } from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
        ...CreatePadding(10, 30, 30, 30),
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            minHeight: 'calc(100vh - 70px)',
        },
    },
    formOtp: {
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            ...CreatePadding(0, 30, 30, 30),
        },
    },
    desktopContainer: {
        ...FlexRow,
        rowGap: '3rem',
        marginBottom: 40,
    },
    btnLogin: {
        ...CreateMargin(16, 0, 10, 0),
    },
    footer: {
        zIndex: 0,
        width: '100%',
        ...CreatePadding(30, 30, 30, 30),
        ...Centering,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
    },
    selectLogin: {
        width: '100%',
        ...CreateMargin(0, 0, 15, -15),
    },
    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    headerSpan: {
        marginBottom: 20,
        borderBottom: `1px solid ${PRIMARY}`,
        paddingBottom: 10,
    },
    spanDivider: {
        height: 120,
    },
    spanLabel: {
        marginBottom: 20,
    },
    generalButton: {
        marginTop: 20,
        width: '100%',
    },

    header: {
        ...FlexColumn,
        rowGap: '.75rem',
    },
    title: {
        fontFamily: 'Poppins',
        margin: 0,
        fontSize: '3rem',
    },
    subtitle: {
        fontFamily: 'Poppins',
        color: GRAY_THIRD,
        margin: 0,
        fontSize: '1rem',
    },
    optionMenu: {
        ...FlexColumn,
        rowGap: '2rem',
    },
}));
