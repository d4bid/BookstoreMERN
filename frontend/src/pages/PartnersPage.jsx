import React from 'react';
import PartnerList from '../pages/Admin/Partners/PartnerList';  // Update the path to the PartnerList component

const PartnersPage = () => {
  return (
    <PartnerList isAdmin={false} hideAddButton={true} backDestination="/home" />
  );
};

export default PartnersPage;
