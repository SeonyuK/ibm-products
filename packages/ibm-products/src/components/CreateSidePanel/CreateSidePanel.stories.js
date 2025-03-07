/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import {
  Button,
  Grid,
  Column,
  TextInput,
  NumberInput,
  Dropdown,
  FormGroup,
  Header,
  HeaderContainer,
  HeaderName,
  usePrefix,
} from '@carbon/react';

import { pkg } from '../../settings';
import {
  getStoryTitle,
  prepareStory,
} from '../../global/js/utils/story-helper';

import { CreateSidePanel } from './CreateSidePanel';

import styles from './_storybook-styles.scss';
import DocsPage from './CreateSidePanel.docs-page';
import { sidePanelDecorator } from '../../global/decorators/sidePanelDecorator';

const blockClass = `${pkg.prefix}--create-side-panel`;

const prefix = 'create-side-panel-stories__';

const defaultStoryProps = {
  title: 'Create partitions',
  subtitle: "Specify the details of the partitions you're creating",
  formTitle: 'Core configuration',
  formDescription:
    'We recommend you fill out and evaluate these details at a minimum before deploying your topic.',
  primaryButtonText: 'Create',
  secondaryButtonText: 'Cancel',
};

const items = ['Day(s)', 'Month(s)', 'Year(s)'];

const renderUIShellHeader = () => (
  <HeaderContainer
    render={() => (
      <Header aria-label="IBM Cloud Pak">
        <HeaderName href="/" prefix="IBM">
          Cloud Pak
        </HeaderName>
      </Header>
    )}
  />
);

export default {
  title: getStoryTitle(CreateSidePanel.displayName),
  component: CreateSidePanel,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
  decorators: [sidePanelDecorator(renderUIShellHeader, prefix)],
};

const DefaultTemplate = ({ ...args }) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(false);
  return (
    <>
      {renderUIShellHeader()}
      <Grid id="ibm-products-page-content">
        <Column lg={{ span: 2, start: 8 }}>
          <Button onClick={() => setOpen(!open)}>
            {open ? 'Close side panel' : 'Open side panel'}
          </Button>
        </Column>
      </Grid>
      <CreateSidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
      >
        <TextInput
          id="create-side-panel-topic-name-a"
          labelText="Topic name"
          className={`${prefix}form-item`}
          placeholder="Enter topic name"
        />
        <NumberInput
          id="1"
          className={`${prefix}form-item`}
          label="Partitions"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="2"
          className={`${prefix}form-item`}
          label="Replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <div
          style={{
            display: 'grid',
            alignItems: 'flex-end',
            gridGap: '0.75rem',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <NumberInput
            id="4"
            className={`${prefix}form-item`}
            label="Retention time"
            min={0}
            max={50}
            value={30}
            iconDescription="Choose a number"
          />
          <Dropdown
            id="create-side-panel-dropdown-options-a"
            aria-label="Dropdown"
            items={items}
            initialSelectedItem="Day(s)"
            label="Options"
            className={`${prefix}form-item`}
          />
        </div>
        <NumberInput
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
      </CreateSidePanel>
    </>
  );
};

const TemplateWithFormValidation = ({ ...args }) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [invalid, setInvalid] = useState(false);
  return (
    <>
      {renderUIShellHeader()}
      <Grid id="ibm-products-page-content">
        <Column lg={{ span: 2, start: 8 }}>
          <Button onClick={() => setOpen(!open)}>
            {open ? 'Close side panel' : 'Open side panel'}
          </Button>
        </Column>
      </Grid>
      <CreateSidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
        disableSubmit={!textInput.length}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
      >
        <TextInput
          id="create-side-panel-topic-name-b"
          labelText="Topic name"
          className={`${prefix}form-item`}
          placeholder="Enter topic name"
          onChange={(e) => {
            setTextInput(e.target.value);
            setInvalid(false);
          }}
          onBlur={() => {
            textInput.length === 0 && setInvalid(true);
          }}
          invalid={invalid}
          invalidText="This is a required field"
        />
        <NumberInput
          id="1"
          className={`${prefix}form-item`}
          label="Partitions"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="2"
          className={`${prefix}form-item`}
          label="Replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <NumberInput
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
        <div className={`${prefix}example-container`}>
          <NumberInput
            id="4"
            className={`${prefix}form-item`}
            label="Retention time"
            min={0}
            max={50}
            value={30}
            iconDescription="Choose a number"
          />
          <Dropdown
            id="create-side-panel-dropdown-options-b"
            aria-label="Dropdown"
            initialSelectedItem="Day(s)"
            items={items}
            label="Options"
            className={`${prefix}form-item`}
          />
        </div>
        <NumberInput
          id="3"
          className={`${prefix}form-item`}
          label="Minimum in-sync replicas"
          min={0}
          max={50}
          value={1}
          iconDescription="Choose a number"
        />
      </CreateSidePanel>
    </>
  );
};

const TemplateWithMultipleForms = ({ ...args }) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [invalid, setInvalid] = useState(false);
  return (
    <>
      {renderUIShellHeader()}
      <Grid id="ibm-products-page-content">
        <Column lg={{ span: 2, start: 8 }}>
          <Button onClick={() => setOpen(!open)}>
            {open ? 'Close side panel' : 'Open side panel'}
          </Button>
        </Column>
      </Grid>
      <CreateSidePanel
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
        disableSubmit={!textInput.length}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
      >
        <FormGroup
          className={`${blockClass}__form ${prefix}example-form-group`}
          legendText="Personal information"
        >
          <TextInput
            id="create-side-panel-first-name"
            labelText="First name"
            className={`${prefix}form-item`}
            placeholder="Enter topic name"
            onChange={(e) => {
              setTextInput(e.target.value);
              setInvalid(false);
            }}
            onBlur={() => {
              textInput.length === 0 && setInvalid(true);
            }}
            invalid={invalid}
            invalidText="This is a required field"
          />
          <Dropdown
            id="create-side-panel-dropdown-bu"
            titleText="Business unit"
            aria-label="Dropdown"
            initialSelectedItem="IBM Cloud platform"
            items={['IBM Cloud platform', 'AI Ops', 'Watson']}
            label="Business unit"
            className={`${prefix}form-item`}
          />
        </FormGroup>
        <FormGroup
          className={`${blockClass}__form ${prefix}example-form-group`}
          legendText="Topic information"
        >
          <TextInput
            id="create-side-panel-topic-name-c"
            labelText="Topic name"
            className={`${prefix}form-item`}
            placeholder="Enter topic name"
          />
          <NumberInput
            id="1"
            className={`${prefix}form-item`}
            label="Partitions"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
          <NumberInput
            id="2"
            className={`${prefix}form-item`}
            label="Replicas"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
          <NumberInput
            id="3"
            className={`${prefix}form-item`}
            label="Minimum in-sync replicas"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
          <div className={`${prefix}example-container`}>
            <NumberInput
              id="4"
              className={`${prefix}form-item`}
              label="Retention time"
              min={0}
              max={50}
              value={30}
              iconDescription="Choose a number"
            />
            <Dropdown
              id="create-side-panel-dropdown-options-c"
              aria-label="Dropdown"
              initialSelectedItem="Day(s)"
              items={items}
              label="Options"
              className={`${prefix}form-item`}
            />
          </div>
          <NumberInput
            id="3"
            className={`${prefix}form-item`}
            label="Minimum in-sync replicas"
            min={0}
            max={50}
            value={1}
            iconDescription="Choose a number"
          />
        </FormGroup>
      </CreateSidePanel>
    </>
  );
};

export const Default = prepareStory(DefaultTemplate, {
  args: {
    selectorPageContent: '#ibm-products-page-content',
    ...defaultStoryProps,
  },
});

export const WithFormValidation = prepareStory(TemplateWithFormValidation, {
  args: {
    selectorPageContent: '#ibm-products-page-content',
    ...defaultStoryProps,
  },
});

export const WithMultipleForms = prepareStory(TemplateWithMultipleForms, {
  args: {
    selectorPageContent: '#ibm-products-page-content',
    ...defaultStoryProps,
  },
});
