/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Edit, TrashCan } from '@carbon/react/icons';
import { action } from '@storybook/addon-actions';
import {
  getStoryTitle,
  prepareStory,
} from '../../../../global/js/utils/story-helper';
import { Datagrid, useDatagrid, useExpandedRow } from '../../index';
import styles from '../../_storybook-styles.scss';
import { DatagridActions } from '../../utils/DatagridActions';
import { DatagridPagination } from '../../utils/DatagridPagination';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { pkg } from '../../../../settings';
import { DocsPage } from './ExpandableRow.docs-page';
import { usePrefix } from '../../../../global/js/hooks';

export default {
  title: `${getStoryTitle(Datagrid.displayName)}/Extensions/ExpandableRow`,
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: { page: DocsPage },
    layout: 'fullscreen',
    argTypes: {
      featureFlags: {
        table: {
          disable: true,
        },
      },
    },
  },
};

const defaultHeader = [
  {
    Header: 'Row Index',
    accessor: (row, i) => i,
    sticky: 'left',
    id: 'rowIndex', // id is required when accessor is a function.
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Age',
    accessor: 'age',
    width: 50,
  },
  {
    Header: 'Visits',
    accessor: 'visits',
    width: 60,
  },
  {
    Header: 'Someone 1',
    accessor: 'someone1',
  },
  {
    Header: 'Someone 2',
    accessor: 'someone2',
  },
  {
    Header: 'Someone 3',
    accessor: 'someone3',
  },
  {
    Header: 'Someone 4',
    accessor: 'someone4',
  },
  {
    Header: 'Someone 5',
    accessor: 'someone5',
  },
  {
    Header: 'Someone 6',
    accessor: 'someone6',
  },
  {
    Header: 'Someone 7',
    accessor: 'someone7',
  },
  {
    Header: 'Someone 8',
    accessor: 'someone8',
  },
  {
    Header: 'Someone 9',
    accessor: 'someone9',
  },
  {
    Header: 'Someone 10',
    accessor: 'someone10',
  },
];

const sharedDatagridProps = {
  emptyStateTitle: 'Empty state title',
  emptyStateDescription: 'Description text explaining why table is empty',
  emptyStateSize: 'lg',
  gridTitle: 'Data table title',
  gridDescription: 'Additional information if needed',
  useDenseHeader: false,
  rowSize: 'lg',
  rowSizes: [
    {
      value: 'xl',
      labelText: 'Extra large',
    },
    {
      value: 'lg',
      labelText: 'Large',
    },
    {
      value: 'md',
      labelText: 'Medium',
    },
    {
      value: 'xs',
      labelText: 'Small',
    },
  ],
  onRowSizeChange: (value) => {
    console.log('row size changed to: ', value);
  },
  rowActions: [
    {
      id: 'edit',
      itemText: 'Edit',
      icon: Edit,
      onClick: action('Clicked row action: edit'),
    },

    {
      id: 'delete',
      itemText: 'Delete',
      icon: TrashCan,
      isDelete: true,
      onClick: action('Clicked row action: delete'),
    },
  ],
  expandedContentHeight: 96,
  expanderButtonTitleExpanded: 'Collapse row',
  expanderButtonTitleCollapsed: 'Expand row',
};

const ExpansionRenderer = ({ row }) => {
  const prefix = usePrefix();
  return (
    <div className={`${prefix}__test-class-with-prefix-hook`}>
      Content for row index: {row.id}
    </div>
  );
};

const ExpandedRows = ({ ...args }) => {
  const columns = React.useMemo(() => [...defaultHeader], []);
  const [data] = useState(makeData(10));
  const rows = React.useMemo(() => data, [data]);

  const datagridState = useDatagrid(
    {
      columns,
      data: rows,
      initialState: {
        pageSize: 10,
        pageSizes: [5, 10, 25, 50],
      },
      DatagridActions,
      DatagridPagination,
      ExpandedRowContentComponent: ExpansionRenderer,
      tags: ['autodocs'],
      ...args.defaultGridProps,
    },
    useExpandedRow
  );

  // Warnings are ordinarily silenced in storybook, add this to test.
  pkg._silenceWarnings(false);
  // Enable feature flag for `useExpandedRow` hook
  pkg.feature['Datagrid.useExpandedRow'] = true;
  pkg._silenceWarnings(true);

  return <Datagrid datagridState={datagridState} />;
};

const BasicTemplateWrapper = ({ ...args }) => {
  return <ExpandedRows defaultGridProps={{ ...args }} />;
};

const expandableRowControlProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  expandedContentHeight: sharedDatagridProps.expandedContentHeight,
  expanderButtonTitleExpanded: sharedDatagridProps.expanderButtonTitleExpanded,
  expanderButtonTitleCollapsed:
    sharedDatagridProps.expanderButtonTitleCollapsed,
};
const expandableRowStoryName = 'With expandable row';
export const ExpandableRowStory = prepareStory(BasicTemplateWrapper, {
  storyName: expandableRowStoryName,
  argTypes: {
    gridTitle: ARG_TYPES.gridTitle,
    gridDescription: ARG_TYPES.gridDescription,
    expandedContentHeight: ARG_TYPES.expandedContentHeight,
    expanderButtonTitleExpanded: ARG_TYPES.expanderButtonTitleExpanded,
    expanderButtonTitleCollapsed: ARG_TYPES.expanderButtonTitleCollapsed,
  },
  args: {
    ...expandableRowControlProps,
    featureFlags: ['Datagrid.useExpandedRow'],
  },
});
