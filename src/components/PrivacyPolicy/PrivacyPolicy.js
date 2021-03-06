import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './PrivacyPolicy.css';

const PrivacyPolicy = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: Jul 18, 2020</p>

      <p>
      Protecting your private information is our priority. This Statement of Privacy applies to dzmarketplace.com and DZ Marketplace LLC and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to DZ Marketplace LLC include dzmarketplace.com and DZM. By using the DZM website, you consent to the data practices described in this statement. 
      </p>

      <h2>Collection of your Personal Information</h2>
      <p>
      In order to better provide you with products and services offered on our Site, DZM may collect personally identifiable information, such as your: 
      
      -	First and Last Name 
      -	E-mail Address 
      -	Phone Number 
      -	WeChat 
      
      We do not collect any personal information about you unless you voluntarily provide it to us. However, you may be required to provide certain personal information to us when you elect to use certain products or services available on the Site. These may include: (a) registering for an account on our Site; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c) signing up for special offers from selected third parties; (d) sending us an email message; (e) submitting your credit card or other payment information when ordering and purchasing products and services on our Site. To wit, we will use your information for, but not limited to, communicating with you in relation to services and/or products you have requested from us. We also may gather additional personal or non-personal information in the future. 
 
      </p>

      <h2>Use of your Personal Information </h2>
      <p>
      DZM collects and uses your personal information to operate its website(s) and deliver the services you have requested. 
      DZM may also use your personally identifiable information to inform you of other products or services available from DZM and its affiliates.   
      </p>

      <h2>Sharing Information with Third Parties </h2>
      <p>
      DZM does not sell, rent or lease its customer lists to third parties. 
      DZM may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (e-mail, name, address, telephone number) is transferred to the third party. DZM may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to DZM, and they are required to maintain the confidentiality of your information. 
      DZM may disclose your personal information, without notice, if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on DZM or the site; (b) protect and defend the rights or property of DZM; and/or (c) act under exigent circumstances to protect the personal safety of users of DZM, or the public. 
      </p>
      <h2>Automatically Collected Information </h2>
      <p>
      Information about your computer hardware and software may be automatically collected by DZM. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the DZM website. 
      </p>
      <h2>Security of your Personal Information</h2>
      <p>
      DZM secures your personal information from unauthorized access, use, or disclosure. DZM uses the following methods for this purpose: 
  
      -	SSL Protocol 
   
      When personal information (such as a credit card number) is transmitted to other websites, it is protected through the use of encryption, such as the Secure Sockets Layer (SSL) protocol. 
   
      We strive to take appropriate security measures to protect against unauthorized access to or alteration of your personal information. Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to be 100% secure. As a result, while we strive to protect your personal information, you acknowledge that: (a) there are security and privacy limitations inherent to the Internet which are beyond our control; and (b) security, integrity, and privacy of any and all information and data exchanged between you and us through this Site cannot be guaranteed. 
      </p>
      <h2>Children Under Thirteen </h2>
      <p>
      DZM does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website. 
      </p>
      <h2>Opt-Out and Unsubscribe from Third Party Communications </h2>
      <p>
      We respect your privacy and give you an opportunity to opt-out of receiving announcements of certain information. Users may opt-out of receiving any or all communications from third-party partners of DZM by contacting us here: 
      - Web page: www.dzmarketplace.com
      - Email: info@dzmarketplace.com 
      </p>
      <h2>E-mail Communications </h2>
      <p>
      From time to time, DZM may contact you via email for the purpose of providing announcements, promotional offers, alerts, confirmations, surveys, and/or other general communication. 
  
      If you would like to stop receiving marketing or promotional communications via email from DZM, you may opt out of such communications by clicking on the unsubscribe button. 
      </p>
      <h2>External Data Storage Sites</h2>
      <p>We may store your data on servers provided by third party hosting vendors with whom we have contracted. </p>
      <h2>Changes to this Statement </h2>
      <p>DZM reserves the right to change this Privacy Policy from time to time. We will notify you about significant changes in the way we treat personal information by sending a notice to the primary email address specified in your account, by placing a prominent notice on our site, and/or by updating any privacy information on this page. Your continued use of the Site and/or Services available through this Site after such modifications will constitute your: (a) acknowledgment of the modified Privacy Policy; and (b) agreement to abide and be bound by that Policy. </p>
      <h2>Contact Information </h2>
      <p>DZM welcomes your questions or comments regarding this Statement of Privacy. If you believe that DZM has not adhered to this Statement, please contact DZM at: dora@dzmarketplace.com</p>
    </div>
  );
};

PrivacyPolicy.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

PrivacyPolicy.propTypes = {
  rootClassName: string,
  className: string,
};

export default PrivacyPolicy;
