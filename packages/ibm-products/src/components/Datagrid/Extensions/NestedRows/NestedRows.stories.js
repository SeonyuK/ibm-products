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
import { Datagrid, useDatagrid, useNestedRows } from '../../index';
import styles from '../../_storybook-styles.scss';
// import mdx from '../../Datagrid.mdx';
import { DatagridActions } from '../../utils/DatagridActions';
import { makeData } from '../../utils/makeData';
import { ARG_TYPES } from '../../utils/getArgTypes';
import { pkg } from '../../../../settings';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';

export default {
  title: `${getStoryTitle(Datagrid.displayName)}/Extensions/NestedRows`,
  component: Datagrid,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: () => (
        <StoryDocsPage
          blocks={[
            {
              title: 'Nested rows',
              description: `Nested rows allow disclosing content in data tables progressively by displaying primary data first (parent row) and enabling users to navigate secondary information levels (child rows).
- Include the \`useNestedRows\` hook
- Make sure that any row you want to have nested rows in your data has a \`subRows\` property with an array of objects for each nested row. The row expander will be included by default as long as the \`useNestedRows\` hook is provided and it is detected that a row has \`subRows\` within it.
          `,
              source: {
                code: `
const datagridState = useDatagrid(
  {
    columns,
    data,
    expanderButtonTitleExpanded: 'Collapse row',
    expanderButtonTitleCollapsed: 'Expand row',
  },
  useNestedRows
);

return <Datagrid datagridState={datagridState} />;
            `,
              },
            },
          ]}
        />
      ),
    },
    layout: 'fullscreen',
  },
  argTypes: {
    featureFlags: {
      table: {
        disable: true,
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
};

const NestedRows = ({ ...args }) => {
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10, 5, 2, 2));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      DatagridActions,
      ...args.defaultGridProps,
    },
    useNestedRows
  );

  // Warnings are ordinarily silenced in storybook, add this to test
  pkg._silenceWarnings(false);
  // Enable feature flag for `useNestedRows` hook
  pkg.feature['Datagrid.useNestedRows'] = true;
  pkg._silenceWarnings(true);

  return <Datagrid datagridState={{ ...datagridState }} />;
};

const BasicTemplateWrapper = ({ ...args }) => {
  return <NestedRows defaultGridProps={{ ...args }} />;
};

const nestedRowsControlProps = {
  gridTitle: sharedDatagridProps.gridTitle,
  gridDescription: sharedDatagridProps.gridDescription,
  useDenseHeader: sharedDatagridProps.useDenseHeader,
  rowSize: sharedDatagridProps.rowSize,
  rowSizes: sharedDatagridProps.rowSizes,
  onRowSizeChange: sharedDatagridProps.onRowSizeChange,
};
const nestedRowsStoryName = 'With nested rows';
export const NestedRowsUsageStory = prepareStory(BasicTemplateWrapper, {
  storyName: nestedRowsStoryName,
  argTypes: {
    gridTitle: ARG_TYPES.gridTitle,
    gridDescription: ARG_TYPES.gridDescription,
    useDenseHeader: ARG_TYPES.useDenseHeader,
    rowSize: ARG_TYPES.rowSize,
    rowSizes: ARG_TYPES.rowSizes,
    onRowSizeChange: ARG_TYPES.onRowSizeChange,
    expanderButtonTitleExpanded: 'Collapse row',
    expanderButtonTitleCollapsed: 'Expand row',
  },
  args: {
    ...nestedRowsControlProps,
    featureFlags: ['Datagrid.useNestedRows'],
  },
});
