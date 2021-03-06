import {
  deletePermissionFromRole,
  updatePermissionsForRole,
} from '@ceruleandatahub/middleware-redux';
import {DataTable} from '@ceruleandatahub/react-components';
import {filter, flow, map} from 'lodash';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import env from '../../../../../../config';
import SearchBar from '../../../../SearchBar/SearchBar.jsx';
import permissionViewColumns from './permissionViewColumns';

const {AUTH0_AUDIENCE} = env();

const PermissionsView = ({
  activeRoleID,
  permissionsForRole,
  allPermissions,
}) => {
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState('');

  const [permissionList, setPermissionList] = useState(permissionsForRole);

  const permissionExists = permission => permissionNames.includes(permission);

  const handleRolePermissionChange = async (permission, id, body) => {
    const properties = {
      id,
      data: body,
    };

    if (permissionExists(permission)) {
      try {
        const filteredPermissions = filterPermissions(
          permissionList,
          permission,
        );

        setPermissionList(filteredPermissions);

        dispatch(deletePermissionFromRole(properties));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        setPermissionList([...permissionList, {permission_name: permission}]);

        dispatch(updatePermissionsForRole(properties));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const permissionData = filteredSearchResults(allPermissions, filterValue);

  const permissionNames = permissionList.map(
    ({permission_name}) => permission_name,
  );

  return (
    <>
      <SearchBar
        onChange={event => setFilterValue(event.target.value)}
        value={filterValue}
        showSearchButton={false}
        margin={16}
      />

      <DataTable
        data={permissionData}
        columns={permissionViewColumns(
          AUTH0_AUDIENCE,
          permissionExists,
          handleRolePermissionChange,
          activeRoleID,
        )}
      />
    </>
  );
};

const filterPermissions = (permissionsForRole, permissionToBeModified) =>
  filter(
    permissionsForRole,
    permission => permission.permission_name !== permissionToBeModified,
  );

const searchFilterFor = filterValue => item =>
  filter(item, permission => permission.includes(filterValue));

const filteredSearchResults = (searchValue, filter) =>
  flow([map, searchFilterFor(filter)])(searchValue);

PermissionsView.propTypes = {
  activeRoleID: PropTypes.string.isRequired,
  permissionsForRole: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      permission_name: PropTypes.string,
      resource_server_identifier: PropTypes.string,
      resource_server_name: PropTypes.string,
    }),
  ),
  allPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchForEntity: PropTypes.func,
};

export default PermissionsView;
