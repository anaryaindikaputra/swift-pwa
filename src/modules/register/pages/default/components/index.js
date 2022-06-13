/**
 * ---------------------------------------------------- *
 * @dependencies Component View Dependencies
 * @summary This code block is used for defining
 * component dependencies
 * ---------------------------------------------------- *
 */
// Components Dependencies
import {
    Button, PasswordField, Select, TextField, Typography,
} from '@commons';
import {
    Checkbox, Container, FormControlLabel, Link,
} from '@material-ui/core/index';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// Helper Dependencies
import { breakPointsUp } from '@helper_theme';
// Plugin Dependencies
import OtpBlock from '@plugin_otp';
// Styling Dependencies
import useStyles from '@core_modules/register/pages/default/components/style';
// Utility Dependencies
import classNames from 'classnames';
import DateDayJs from '@date-io/dayjs';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * ---------------------------------------------------- *
 * @components Component View
 * @summary This function is used for defining
 * component view
 * ---------------------------------------------------- *
 */
const RegisterView = ({
    t,
    formik,
    enableOtp,
    setdisabled,
    handleChangePhone,
    handleWa,
    handleChangeDate,
    phoneIsWa,
    enableRecaptcha,
    sitekey,
    handleChangeCaptcha,
    disabled,
    recaptchaRef,
    gender,
    dob,
}) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');

    return (
        <>
            <Container className={styles.container}>
                <Container className={classNames(styles.header, 'hidden-mobile')} disableGutters>
                    <h6 className={styles.subtitle}>{t('register:cta')}</h6>
                    <h1 className={styles.title}>{t('register:pageTitle')}</h1>
                    <h6 className={styles.subtitle}>
                        {`${t('register:haveAccount')} `}
                        <Link href="/customer/account/login">{t('register:signIn')}</Link>
                    </h6>
                </Container>
                <form onSubmit={formik.handleSubmit}>
                    <Container className={styles.namesContainer} disableGutters>
                        <TextField
                            label={t('common:form:firstName')}
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstName && formik.errors.firstName)}
                            errorMessage={(formik.touched.firstName && formik.errors.firstName) || null}
                            placeholder="John"
                        />
                        <TextField
                            label={t('common:form:lastName')}
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastName && formik.errors.lastName)}
                            errorMessage={(formik.touched.lastName && formik.errors.lastName) || null}
                            placeholder="Doe"
                        />
                    </Container>
                    <TextField
                        className={styles.input}
                        label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={(formik.touched.email && formik.errors.email) || null}
                        placeholder="johndoe@mail.com"
                    />
                    {gender && (
                        <Select
                            className="genderField"
                            options={[{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }]}
                            label={t('common:form:gender')}
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            helperText={t('common:form:select')}
                            error={!!(formik.touched.gender && formik.errors.gender)}
                            errorMessage={(formik.touched.gender && formik.errors.gender) || null}
                        />
                    )}
                    {dob && (
                        <DatePicker
                            fullWidth
                            label={t('common:form:dob')}
                            name="dob"
                            value={formik.values.dob}
                            onChange={handleChangeDate}
                            error={!!(formik.touched.dob && formik.errors.dob)}
                            helperText={(formik.touched.dob && formik.errors.dob) || null}
                        />
                    )}
                    <PasswordField
                        className={styles.input}
                        label="Password"
                        showVisible
                        showPasswordMeter
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.password && formik.errors.password)}
                        errorMessage={(formik.touched.password && formik.errors.password) || null}
                    />
                    <TextField
                        className={styles.input}
                        label={t('common:form:confirm')}
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        errorMessage={(formik.touched.confirmPassword && formik.errors.confirmPassword) || null}
                    />
                    {enableOtp ? (
                        <>
                            <OtpBlock
                                type="register"
                                setDisabled={setdisabled}
                                phoneProps={{
                                    name: 'phoneNumber',
                                    value: formik.values.phoneNumber,
                                    onChange: handleChangePhone,
                                    error: !!(formik.errors.phoneNumber && formik.touched.phoneNumber),
                                    errorMessage: (formik.touched.phoneNumber && formik.errors.phoneNumber) || null,
                                }}
                                codeProps={{
                                    name: 'otp',
                                    value: formik.values.otp,
                                    onChange: formik.handleChange,
                                    error: !!(formik.touched.otp && formik.errors.otp),
                                    errorMessage: (formik.touched.otp && formik.errors.otp) || null,
                                    footer: (
                                        <FormControlLabel
                                            onChange={handleWa}
                                            className={styles.checkWa}
                                            control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                                            label={<Typography variant="p">{t('register:isWhatsapp')}</Typography>}
                                        />
                                    ),
                                }}
                            />
                            {!phoneIsWa && (
                                <TextField
                                    className={styles.input}
                                    label={`${t('common:form:phoneNumber')} Whatsapp`}
                                    name="whatsappNumber"
                                    value={formik.values.whatsappNumber}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.whatsappNumber && formik.errors.whatsappNumber)}
                                    errorMessage={(formik.touched.whatsappNumber && formik.errors.whatsappNumber) || null}
                                />
                            )}
                        </>
                    ) : null}
                    <div className={styles.footer}>
                        <FormControlLabel
                            value={formik.values.subscribe}
                            onChange={formik.handleChange}
                            name="subscribe"
                            control={<Checkbox name="subscribe" color="primary" size="small" />}
                            label={(
                                <Typography variant="p" letter="capitalize" className="row center">
                                    {t('register:subscribe')}
                                </Typography>
                            )}
                            style={{ marginBottom: enableRecaptcha ? 25 : 0 }}
                        />

                        {
                            enableRecaptcha ? (
                                <>
                                    <ReCAPTCHA
                                        sitekey={sitekey}
                                        onChange={handleChangeCaptcha}
                                        ref={recaptchaRef}
                                    />
                                    {formik.errors.captcha && (
                                        <Typography color="red">{formik.errors.captcha}</Typography>
                                    )}
                                </>
                            ) : null
                        }
                        <Button
                            disabled={disabled}
                            fullWidth={!desktop}
                            className={styles.btnSigin}
                            type="submit"
                            align={desktop ? 'left' : 'center'}
                        >
                            <Typography variant="span" type="bold" letter="uppercase" color="white">
                                {t('register:button')}
                            </Typography>
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    );
};

/**
 * ---------------------------------------------------- *
 * @components Component View Props
 * @summary This code block is used for defining
 * component view props
 * ---------------------------------------------------- *
 */
const RegisterViewProvider = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <RegisterView {...props} />
    </MuiPickersUtilsProvider>
);

export default RegisterViewProvider;
