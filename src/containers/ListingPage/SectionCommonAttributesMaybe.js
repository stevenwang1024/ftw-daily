import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const SectionCommonAttributesMaybe = props => {
  const { options, publicData } = props;
  if (!publicData) {
    return null;
  }

  const eduApplicationCategorySelected = publicData && publicData.education_application_category ? publicData.education_application_category : [];
  const eduTargetClientSelected = publicData && publicData.target_client ? publicData.target_client : [];
  const eduServiceDetailSelected = publicData && publicData.edu_service_detail ? publicData.edu_service_detail : [];
  const eduTravelOptionSelected = publicData && publicData.travelOptions ? publicData.travelOptions : [];
  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        {/* TODO:add translation file .education type title */}
        {/* <FormattedMessage id="ListingPage.featuresTitle" /> */}
        Application type
      </h2>
      {/* <PropertyGroup
        id="ListingPage.amenities"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      /> */}
      <p className={css.description}>
        {richText(eduApplicationCategorySelected, {
          longWordMinLength: 0,
          longWordClass: css.longWord,
        })}
      </p>
      <h2 className={css.featuresTitle}>
        Suitable Customers
      </h2>
      <p className={css.description}>
        {richText(eduTargetClientSelected, {
          longWordMinLength: 0,
          longWordClass: css.longWord,
        })}
      </p>
      <h2 className={css.featuresTitle}>
        Service details
      </h2>
      <p className={css.description}>
        {richText(eduServiceDetailSelected, {
          longWordMinLength: 0,
          longWordClass: css.longWord,
        })}
      </p>
    </div>
  );
};

export default SectionCommonAttributesMaybe;
