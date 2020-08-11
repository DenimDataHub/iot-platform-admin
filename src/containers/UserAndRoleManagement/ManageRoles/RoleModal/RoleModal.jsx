import React from 'react';
import Modal from 'styled-react-modal';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader/ModalHeader.jsx';
import styled from 'styled-components';
import ModalTabs from './ModalTabs/ModalTabs.jsx';

const StyledModal = Modal.styled`
    display: flex;
    background-color: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 0 18px -3px rgba(27, 27, 27, 0.8);
    width: 75%;
    border: 1px solid red;
`;

const TabContent = styled.div`
  margin: 10px;
`;

const roleModalTabsData = ['Permissions', 'Settings'];

const RoleModal = ({isOpen, roleModalOpenTab, setRoleModalOpenTab, name}) => (
  <StyledModal
    isOpen={isOpen}
    onBackgroundClick={() => setRoleModalOpenTab('')}
  >
    <ModalHeader closeModal={() => setRoleModalOpenTab('')} name={name} />

    <ModalTabs
      roleModalOpenTab={roleModalOpenTab}
      setRoleModalOpenTab={setRoleModalOpenTab}
      tabs={roleModalTabsData}
    />

    <TabContent>
      {roleModalOpenTab === 'Permissions' ? (
        <div>Permissions</div>
      ) : (
        <div>Settings</div>
      )}
    </TabContent>
  </StyledModal>
);

RoleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  roleModalOpenTab: PropTypes.string.isRequired,
  setRoleModalOpenTab: PropTypes.func.isRequired,
};

export default RoleModal;
