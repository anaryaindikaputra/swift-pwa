/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/**
 * ---------------------------------------------------- *
 * @dependencies Component View Dependencies
 * @summary This code block is used for defining
 * component dependencies
 * ---------------------------------------------------- *
 */
// Core Dependencies
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
// Components Dependencies
import { FormControlLabel, Link, Switch } from '@material-ui/core/index';
import {
    Button, PasswordField, TextField, Typography,
} from '@commons';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// Config Dependencies
import { features } from '@config';
// Helper Dependencies
import { breakPointsUp } from '@helper_theme';
// Plugin Dependencies
import OtpBlock from '@plugin_otp';
import OtpView from '@plugin_otp/view';
// Styling Dependencies
import useStyles from '@core_modules/login/pages/default/components/style';
// Utility Dependencies
import classNames from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * ---------------------------------------------------- *
 * @components Component View
 * @summary This function is used for defining
 * component view
 * ---------------------------------------------------- *
 */
const Login = (props) => {
    const {
        formik,
        otpConfig,
        isOtp,
        setIsOtp,
        t,
        setDisabled,
        disabled,
        loading,
        formikOtp,
        toastMessage,
        socialLoginMethodData,
        socialLoginMethodLoading,
        enableRecaptcha,
        sitekey,
        handleChangeCaptcha,
        recaptchaRef,
        query,
        formikPhoneEmail,
        phonePassword,
    } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');

    const signInOptions = [];

    if (features.firebase.config.apiKey !== '' && firebase && firebase.auth && socialLoginMethodData && socialLoginMethodData.length > 0) {
        for (let idx = 0; idx < socialLoginMethodData.length; idx += 1) {
            const code = socialLoginMethodData[idx];
            if (code.match(/google/i) && firebase.auth.GoogleAuthProvider && firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
            }

            if (code.match(/facebook/i) && firebase.auth.FacebookAuthProvider && firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.FacebookAuthProvider.PROVIDER_ID);
            }

            if (code.match(/twitter/i) && firebase.auth.TwitterAuthProvider && firebase.auth.TwitterAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.TwitterAuthProvider.PROVIDER_ID);
            }

            if (code.match(/github/i) && firebase.auth.GithubAuthProvider && firebase.auth.GithubAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);
            }

            if (code.match(/email/i) && firebase.auth.EmailAuthProvider && firebase.auth.EmailAuthProvider.PROVIDER_ID) {
                signInOptions.push(firebase.auth.EmailAuthProvider.PROVIDER_ID);
            }
        }
    }

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions,
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    };

    const [firebaseLoaded, setFirebaseLoaded] = useState(false);

    useEffect(() => {
        if (features.firebase.config.apiKey === '') {
            setFirebaseLoaded(false);
        } else {
            setFirebaseLoaded(true);
        }
    }, [firebaseLoaded]);

    const [useEmail, setUseEmail] = useState(true);
    const loginWithEmail = (status) => setUseEmail(status);

    return (
        <div className={styles.container}>
            {!desktop && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                <FormControlLabel
                    control={<Switch checked={isOtp} onChange={() => setIsOtp(!isOtp)} name="useOtp" color="primary" />}
                    className={classNames(styles.selectLogin, 'hidden-desktop')}
                    label={t('login:switchPhone')}
                />
            )}
            <div className={classNames('row between-sm between-md between-lg', styles.desktopContainer)}>
                <div className={classNames(styles.header, 'col-sm-12 col-md-12 col-lg-12 hidden-mobile')}>
                    <Typography type="bold" variant="h6" className={styles.subtitle}>
                        {t('login:cta')}
                    </Typography>
                    <Typography type="bold" variant="h1" className={styles.title}>
                        {t('login:customerLogin')}
                    </Typography>
                    <Typography type="bold" variant="h6" className={styles.subtitle}>
                        {`${t('login:notHaveAccount')} `}
                        <Link
                            href={
                                (query && query.redirect)
                                    ? `/customer/account/create?redirect=${query.redirect}`
                                    : '/customer/account/create'
                            }
                        >
                            {t('login:registerTitle')}
                        </Link>
                    </Typography>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-sm-12 hidden-mobile">
                            <div className={styles.headerSpan}>
                                <Typography variant="span" className="clear-margin-padding" letter="uppercase">
                                    {/* {t('login:registerCustomer')} */}
                                    {
                                        useEmail ? t('login:loginWithEmail') : t('login:loginWithPhone')
                                    }
                                </Typography>
                            </div>
                        </div>

                        {/* Login Using Email - Desktop */}
                        {desktop && useEmail && phonePassword === false && (
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row center-xs start-sm">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <TextField
                                            name="username"
                                            label="Email"
                                            placeholder="john.doe@gmail.com"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            error={!!formik.errors.username}
                                            errorMessage={formik.errors.username || null}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <PasswordField
                                            name="password"
                                            label="Password"
                                            placeholder="********"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={!!formik.errors.password}
                                            errorMessage={formik.errors.password || null}
                                            showVisible
                                        />
                                    </div>
                                    <div className="col-xs-12  col-sm-12">
                                        {enableRecaptcha ? (
                                            <>
                                                <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                            </>
                                        ) : null}
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Button
                                            className={styles.generalButton}
                                            fullWidth={!desktop}
                                            type="submit"
                                            disabled={desktop ? false : disabled}
                                            align={desktop ? 'left' : 'center'}
                                        >
                                            <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                {loading ? 'Loading' : t('login:pageTitle')}
                                            </Typography>
                                        </Button>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        {
                                            firebaseLoaded
                                            && firebase.app()
                                            && !socialLoginMethodLoading
                                            && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                        }
                                    </div>
                                </div>
                            </form>
                        )}
                        {desktop && useEmail && phonePassword !== false && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form onSubmit={formikPhoneEmail.handleSubmit}>
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <TextField
                                                name="username"
                                                // eslint-disable-next-line max-len
                                                label={otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login ? t('login:emailLabel') : t('login:phoneEmailLabel')}
                                                // eslint-disable-next-line max-len
                                                placeholder={otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login ? t('login:emailFields') : t('login:phoneEmailFields')}
                                                value={formikPhoneEmail.values.username}
                                                onChange={formikPhoneEmail.handleChange}
                                                error={!!formikPhoneEmail.errors.username}
                                                errorMessage={formikPhoneEmail.errors.username || null}
                                            />
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <PasswordField
                                                name="password"
                                                label="Password"
                                                placeholder="********"
                                                value={formikPhoneEmail.values.password}
                                                onChange={formikPhoneEmail.handleChange}
                                                error={!!formikPhoneEmail.errors.password}
                                                errorMessage={formikPhoneEmail.errors.password || null}
                                                showVisible
                                            />
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <>
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formikPhoneEmail.errors.captcha && (
                                                        <Typography color="red">{formikPhoneEmail.errors.captcha}</Typography>
                                                    )}
                                                </>
                                            ) : null}
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={desktop ? false : disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('login:pageTitle')}
                                                </Typography>
                                            </Button>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            {
                                                firebaseLoaded
                                                && firebase.app()
                                                && !socialLoginMethodLoading
                                                && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Login Using Phone Number - Desktop */}
                        {desktop && !useEmail && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form onSubmit={formikOtp.handleSubmit} className={styles.formOtp}>
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12">
                                            <OtpBlock
                                                setDisabled={setDisabled}
                                                type="login"
                                                OtpView={OtpView}
                                                phoneProps={{
                                                    name: 'username',
                                                    placeholder: '+6281234xxxx',
                                                    value: formikOtp.values.username,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!formikOtp.errors.username,
                                                    errorMessage: formikOtp.errors.username || null,
                                                }}
                                                codeProps={{
                                                    name: 'otp',
                                                    value: formikOtp.values.otp,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!(formikOtp.touched.otp && formikOtp.errors.otp),
                                                    errorMessage: (formikOtp.touched.otp && formikOtp.errors.otp) || null,
                                                }}
                                            />
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <>
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                                </>
                                            ) : null}
                                        </div>
                                        <div className="col-xs-12 col-sm-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('common:button:submit')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Login Using Email - Mobile */}
                        {!isOtp && !desktop && phonePassword === false && (
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row center-xs start-sm">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <TextField
                                            name="username"
                                            label="Email"
                                            placeholder="john.doe@gmail.com"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            error={!!formik.errors.username}
                                            errorMessage={formik.errors.username || null}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <PasswordField
                                            name="password"
                                            label="Password"
                                            placeholder="********"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={!!formik.errors.password}
                                            errorMessage={formik.errors.password || null}
                                            showVisible
                                        />
                                    </div>
                                    <div className="col-xs-12  col-sm-12">
                                        {enableRecaptcha ? (
                                            <>
                                                <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                            </>
                                        ) : null}
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Button
                                            className={styles.generalButton}
                                            fullWidth={!desktop}
                                            type="submit"
                                            disabled={desktop ? false : disabled}
                                            align={desktop ? 'left' : 'center'}
                                        >
                                            <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                {loading ? 'Loading' : t('login:pageTitle')}
                                            </Typography>
                                        </Button>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        {
                                            firebaseLoaded
                                            && firebase.app()
                                            && !socialLoginMethodLoading
                                            && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                        }
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <Button
                                            fullWidth={false}
                                            variant="text"
                                            href="/customer/account/forgotpassword"
                                            align={desktop ? 'left' : 'center'}
                                        >
                                            <Typography variant="span" type="regular" letter="capitalize" decoration="underline">
                                                {t('login:forgotPassword')}
                                            </Typography>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        )}
                        {!isOtp && !desktop && phonePassword !== false && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form onSubmit={formikPhoneEmail.handleSubmit}>
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <TextField
                                                name="username"
                                                // eslint-disable-next-line max-len
                                                label={otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login ? t('login:emailLabel') : t('login:phoneEmailLabel')}
                                                // eslint-disable-next-line max-len
                                                placeholder={otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login ? t('login:emailFields') : t('login:phoneEmailFields')}
                                                value={formikPhoneEmail.values.username}
                                                onChange={formikPhoneEmail.handleChange}
                                                error={!!formikPhoneEmail.errors.username}
                                                errorMessage={formikPhoneEmail.errors.username || null}
                                            />
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <PasswordField
                                                name="password"
                                                label="Password"
                                                placeholder="********"
                                                value={formikPhoneEmail.values.password}
                                                onChange={formikPhoneEmail.handleChange}
                                                error={!!formikPhoneEmail.errors.password}
                                                errorMessage={formikPhoneEmail.errors.password || null}
                                                showVisible
                                            />
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <>
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formikPhoneEmail.errors.captcha && (
                                                        <Typography color="red">{formikPhoneEmail.errors.captcha}</Typography>
                                                    )}
                                                </>
                                            ) : null}
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={desktop ? false : disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('login:pageTitle')}
                                                </Typography>
                                            </Button>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            {
                                                firebaseLoaded
                                                && firebase.app()
                                                && !socialLoginMethodLoading
                                                && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                            }
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <Button
                                                fullWidth={false}
                                                variant="text"
                                                href="/customer/account/forgotpassword"
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="regular" letter="capitalize" decoration="underline">
                                                    {t('login:forgotPassword')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Login Using Phone Number - Mobile */}
                        {isOtp && otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login && (
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <form onSubmit={formikOtp.handleSubmit} className={styles.formOtp}>
                                    <div className="row center-xs start-sm">
                                        <div className="col-xs-12 col-sm-12">
                                            <OtpBlock
                                                setDisabled={setDisabled}
                                                type="login"
                                                OtpView={OtpView}
                                                phoneProps={{
                                                    name: 'username',
                                                    placeholder: '+6281234xxxx',
                                                    value: formikOtp.values.username,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!formikOtp.errors.username,
                                                    errorMessage: formikOtp.errors.username || null,
                                                }}
                                                codeProps={{
                                                    name: 'otp',
                                                    value: formikOtp.values.otp,
                                                    onChange: formikOtp.handleChange,
                                                    error: !!(formikOtp.touched.otp && formikOtp.errors.otp),
                                                    errorMessage: (formikOtp.touched.otp && formikOtp.errors.otp) || null,
                                                }}
                                            />
                                        </div>
                                        <div className="col-xs-12  col-sm-12">
                                            {enableRecaptcha ? (
                                                <>
                                                    <ReCAPTCHA sitekey={sitekey} onChange={handleChangeCaptcha} ref={recaptchaRef} />
                                                    {formik.errors.captcha && <Typography color="red">{formik.errors.captcha}</Typography>}
                                                </>
                                            ) : null}
                                        </div>
                                        <div className="col-xs-12 col-sm-12">
                                            <Button
                                                className={styles.generalButton}
                                                fullWidth={!desktop}
                                                type="submit"
                                                disabled={disabled}
                                                align={desktop ? 'left' : 'center'}
                                            >
                                                <Typography variant="span" type="bold" letter="uppercase" color="white">
                                                    {loading ? 'Loading' : t('common:button:submit')}
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                {/* Right Row */}
                <div className={classNames(styles.optionMenu, 'col-xs-12 col-sm-5 col-md-5 col-lg-5 hidden-mobile')}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={styles.headerSpan}>
                                <Typography className="clear-margin-padding" variant="span" letter="uppercase">
                                    {
                                        useEmail ? t('login:loginWithPhone') : t('login:loginWithEmail')
                                    }
                                </Typography>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Typography variant="p">{t('login:loginOtpInformation')}</Typography>
                        </div>
                        <div className="col-sm-12">
                            <Button
                                className={styles.generalButton}
                                fullWidth={false}
                                disabled={desktop ? false : disabled}
                                align={desktop ? 'left' : 'center'}
                                onClick={() => loginWithEmail(!useEmail)}
                            >
                                <Typography color="white" variant="span" type="bold" letter="uppercase">
                                    {useEmail ? t('login:switchPhone') : t('login:loginWithEmail')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={styles.headerSpan}>
                                <Typography className="clear-margin-padding" variant="span" letter="uppercase">
                                    {t('login:forgotPassword')}
                                </Typography>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Typography variant="p">{t('login:forgotYourPassword')}</Typography>
                        </div>
                        <div className="col-sm-12">
                            <Button
                                className={styles.generalButton}
                                fullWidth={false}
                                disabled={desktop ? false : disabled}
                                align={desktop ? 'left' : 'center'}
                                href="/customer/account/forgotPassword"
                            >
                                <Typography color="white" variant="span" type="bold" letter="uppercase">
                                    {t('login:resetPassword')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
                {toastMessage}
            </div>
            <style jsx global>
                {`
                    @media screen and (max-width: 768px) {
                                            
                        .firebaseui-card-content {
                            width: 100%;
                            padding: 0px !important;
                        }
                        .firebaseui-card-footer {
                            padding: 0px !important;
                        }
                    }
                    
                    .firebaseui-container {
                        display: flex !important;
                        flex-direaction: column !important;
                        justify-content: flex-start !important;
                        max-width: 100% !important;
                    }

                    .firebaseui-card-content {
                        padding: 0px !important;
                    }
                `}
            </style>
        </div>
    );
};

export default Login;
