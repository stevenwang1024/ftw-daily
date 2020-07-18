import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators, requiredBoolean } from '../../util/validators';
import { Form, Button, FieldTextInput, FieldRadioButton, FieldBoolean,FieldSelect,FieldCheckboxGroup } from '../../components';
// import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';
import arrayMutators from 'final-form-arrays';
import css from './EditListingCommonAttributesForm.css';

const TITLE_MAX_LENGTH = 60;

function RadioButtonEducationApplication (props) {
  return <FieldRadioButton 
    id= {props.id}  
    label={props.label}  // should move to a const variable
    name="education_application_category"
    value={props.value} // "tutoring"
    showAsRequired={props.showAsRequired}
  />
}


const EditListingCommonAttributesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={arrayMutators}
    render={formRenderProps => {
      const {
        categories,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titleRequired',
      });
      const maxLengthMessage = intl.formatMessage(
        { id: 'EditListingDescriptionForm.maxLength' },
        {
          maxLength: TITLE_MAX_LENGTH,
        }
      );

      const descriptionMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.description',
      });
      const descriptionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionPlaceholder',
      });
      const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
      const descriptionRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.descriptionRequired',
      });

      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      
       // Radio button for application type, e.g. college, grad school, high school, before highschool 
       const radioRequired = true;
       const showAsRequired = pristine && radioRequired;
       const applicationCategoryData = [
         { id: "high_school", label:"High School", value: "high_school", showAsRequired:{showAsRequired}},
         { id: "college", label:"College", value: "college", showAsRequired: {showAsRequired}},
         { id: "grad_school", label:"Gradudate School", value: "grad_school", showAsRequired:{showAsRequired}},
         { id: "mba", label: "MBA Program", value: "mba", showAsRequired: {showAsRequired}},
         { id: "elementary_middle", label: "Elementary/Middle School", value: "elementary_middle", showAsRequired: {showAsRequired}},
         { id: "other", label: "Other", value: "other", showAsRequired: {showAsRequired}},
         // Add a text box for "other"
       ]
       const eduApplicationCategories = applicationCategoryData.map(item => (
         <RadioButtonEducationApplication id={item.id} label={item.label} value={item.value} showAsRequired={showAsRequired} />
       ));
       // Radio button for application type ENDs

       // Boolean to include provider profile
       const profileBoolRequired = requiredBoolean('This field is required');
       //fieldselect to choose language provider teaches
       const languageRequired = required('This field is required');

      // Travel options
      const travel_options = [{key:"me_to_customer", label:"I travel to customers"}, 
      {key:"customer_to_me", label:"Customers travel to me"}, 
      {key:"remote", label:"Remote"}];

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          />

          {/* TODO: change label and placeholder and descriptionRequiredMessage  */}
          <FieldTextInput
            id="target_client"
            name="target_client"
            className={css.description}
            type="textarea"
            label={"Describe the suitable client for this service"}
            placeholder={"What is the suitable age group? What level is your class? Any prelimitary knowledge required?"}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          
          <FieldTextInput
            id="description"
            name="description"
            className={css.description}
            type="textarea"
            label={descriptionMessage}
            placeholder={descriptionPlaceholderMessage}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          {/* TODO: change label and placeholder and descriptionRequiredMessage  */}
          <FieldTextInput
            id="edu_service_detail"
            name="edu_service_detail"
            className={css.description}
            type="textarea"
            label={"Describe the detailed process of service"}
            placeholder={"What is the service process, time lines and detailed arrangements"}
            validate={composeValidators(required(descriptionRequiredMessage))}
          />
          
          <h3 className={css.subTitle}>
              {/* <FormattedMessage id="PayoutDetailsForm.accountTypeTitle" /> */}
              Application Type
          </h3>
          {eduApplicationCategories}
          
         
          {/* TODO: add label to translation json files */}
          <FieldBoolean
            id={'EditListingCommonAttributesForm.includeProviderProfile'}
            name="include_provider_profile"
            label="Include your profile to help customers know you"
            placeholder="Select"
            validate={profileBoolRequired}
          />

          <FieldSelect id="language" name="language" label="Choose a language:" validate={languageRequired}>
            <option value="">Select the language you will teach</option>
            <option value="english">English</option>
            <option value="maderin">Manderin</option>
            <option value="spanish">Spanish</option>
            <option value="others">Other</option>
            {/* TODO:add a text box for other */}
          </FieldSelect>

          <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.travelOption" />
                </h3>
                <FieldCheckboxGroup className={css.features} id="travel_options" name="travelOptions" options={travel_options} />
          </div>

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingCommonAttributesFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingCommonAttributesFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingCommonAttributesFormComponent);
