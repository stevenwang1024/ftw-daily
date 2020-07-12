import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import {
  isSignupEmailTakenError,
  isTooManyEmailVerificationRequestsError,
} from '../../util/errors';
import {
  Page,
  NamedLink,
  NamedRedirect,
  LinkTabNavHorizontal,
  IconEmailSent,
  InlineTextButton,
  IconClose,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  Modal,
  TermsOfService,
} from '../../components';
import { SignupForm } from '../../forms';
import { TopbarContainer } from '..';
import { authenticationInProgress, signup } from '../../ducks/Auth.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { manageDisableScrolling } from '../../ducks/UI.duck';

import css from './SupplierAuthenticationPage.css';

export class SupplierAuthenticationPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tosModalOpen: false };
  }
  render() {
    const {
      authInProgress,
      currentUser,
      intl,
      isAuthenticated,
      location,
      scrollingDisabled,
      signupError,
      submitSignup,
      tab,
      sendVerificationEmailInProgress,
      sendVerificationEmailError,
      onResendVerificationEmail,
      onManageDisableScrolling,
    } = this.props;
    const from = location.state && location.state.from ? location.state.from : null;

    const user = ensureCurrentUser(currentUser);
    const currentUserLoaded = !!user.id;

    // We only want to show the email verification dialog in the signup
    // tab if the user isn't being redirected somewhere else
    // (i.e. `from` is present). We must also check the `emailVerified`
    // flag only when the current user is fully loaded.
    const showEmailVerification = currentUserLoaded && !user.attributes.emailVerified;

    // Already authenticated, redirect away from auth page
    if (isAuthenticated && from) {
      return <Redirect to={from} />;
    } else if (isAuthenticated && currentUserLoaded && !showEmailVerification) {
      return <NamedRedirect name="LandingPage" />;
    }


    const signupErrorMessage = (
      <div className={css.error}>
        {isSignupEmailTakenError(signupError) ? (
          <FormattedMessage id="SupplierAuthenticationPage.signupFailedEmailAlreadyTaken" />
        ) : (
          <FormattedMessage id="SupplierAuthenticationPage.signupFailed" />
        )}
      </div>
    );

    // eslint-disable-next-line no-confusing-arrow
    const errorMessage = (error, message) => (error ? message : null);
    const SignupError = errorMessage(signupError, signupErrorMessage);

    const fromState = { state: from ? { from } : null };

    const tabs = [
      {
        text: (
          <h1 className={css.tab}>
            <FormattedMessage id="AuthenticationPage.signupLinkText" />
          </h1>
        ),
        linkProps: {
          name: 'SupplierSignupPage',
          to: fromState,
        },
      },
    ];

    const handleSubmitSignup = values => {
      const { fname, lname, ...rest } = values;
      const user_type = "supplier";
      const params = { firstName: fname.trim(), lastName: lname.trim(), userType: user_type, ...rest };
      submitSignup(params);
    };

    const formContent = (
      <div className={css.content}>
        <LinkTabNavHorizontal className={css.tabs} tabs={tabs} />
        {SignupError}
        <SignupForm
            className={css.form}
            onSubmit={handleSubmitSignup}
            inProgress={authInProgress}
            onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
        />
      </div>
    );

    const name = user.attributes.profile.firstName;
    const email = <span className={css.email}>{user.attributes.email}</span>;

    const resendEmailLink = (
      <InlineTextButton rootClassName={css.modalHelperLink} onClick={onResendVerificationEmail}>
        <FormattedMessage id="SupplierAuthenticationPage.resendEmailLinkText" />
      </InlineTextButton>
    );
    const fixEmailLink = (
      <NamedLink className={css.modalHelperLink} name="ContactDetailsPage">
        <FormattedMessage id="SupplierAuthenticationPage.fixEmailLinkText" />
      </NamedLink>
    );

    const resendErrorTranslationId = isTooManyEmailVerificationRequestsError(
      sendVerificationEmailError
    )
      ? 'SupplierAuthenticationPage.resendFailedTooManyRequests'
      : 'SupplierAuthenticationPage.resendFailed';
    const resendErrorMessage = sendVerificationEmailError ? (
      <p className={css.error}>
        <FormattedMessage id={resendErrorTranslationId} />
      </p>
    ) : null;

    const emailVerificationContent = (
      <div className={css.content}>
        <NamedLink className={css.verifyClose} name="ProfileSettingsPage">
          <span className={css.closeText}>
            <FormattedMessage id="SupplierAuthenticationPage.verifyEmailClose" />
          </span>
          <IconClose rootClassName={css.closeIcon} />
        </NamedLink>
        <IconEmailSent className={css.modalIcon} />
        <h1 className={css.modalTitle}>
          <FormattedMessage id="SupplierAuthenticationPage.verifyEmailTitle" values={{ name }} />
        </h1>
        <p className={css.modalMessage}>
          <FormattedMessage id="SupplierAuthenticationPage.verifyEmailText" values={{ email }} />
        </p>
        {resendErrorMessage}

        <div className={css.bottomWrapper}>
          <p className={css.modalHelperText}>
            {sendVerificationEmailInProgress ? (
              <FormattedMessage id="SupplierAuthenticationPage.sendingEmail" />
            ) : (
              <FormattedMessage id="SupplierAuthenticationPage.resendEmail" values={{ resendEmailLink }} />
            )}
          </p>
          <p className={css.modalHelperText}>
            <FormattedMessage id="SupplierAuthenticationPage.fixEmail" values={{ fixEmailLink }} />
          </p>
        </div>
      </div>
    );

    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage({ id: 'SupplierAuthenticationPage.schemaTitleSignup' }, { siteTitle });

    const topbarClasses = classNames({
      [css.hideOnMobile]: showEmailVerification,
    });

    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          name: schemaTitle,
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer className={topbarClasses} />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain className={css.layoutWrapperMain}>
            <div className={css.root}>
              {showEmailVerification ? emailVerificationContent : formContent}
            </div>
            <Modal
              id="SupplierAuthenticationPage.tos"
              isOpen={this.state.tosModalOpen}
              onClose={() => this.setState({ tosModalOpen: false })}
              usePortal
              onManageDisableScrolling={onManageDisableScrolling}
            >
              <div className={css.termsWrapper}>
                <h2 className={css.termsHeading}>
                  <FormattedMessage id="SupplierAuthenticationPage.termsHeading" />
                </h2>
                <TermsOfService />
              </div>
            </Modal>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

SupplierAuthenticationPageComponent.defaultProps = {
  currentUser: null,
  signupError: null,
  tab: 'signup',
  sendVerificationEmailError: null,
};

const { bool, func, object, oneOf, shape } = PropTypes;

SupplierAuthenticationPageComponent.propTypes = {
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  isAuthenticated: bool.isRequired,
  scrollingDisabled: bool.isRequired,
  signupError: propTypes.error,
  submitSignup: func.isRequired,
  tab: oneOf(['signup']),

  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: propTypes.error,
  onResendVerificationEmail: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withRouter
  location: shape({ state: object }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated, signupError } = state.Auth;
  const { currentUser, sendVerificationEmailInProgress, sendVerificationEmailError } = state.user;
  return {
    authInProgress: authenticationInProgress(state),
    currentUser,
    isAuthenticated,
    scrollingDisabled: isScrollingDisabled(state),
    signupError,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  submitSignup: params => dispatch(signup(params)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const SupplierAuthenticationPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(SupplierAuthenticationPageComponent);

export default SupplierAuthenticationPage;
