/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { getPathForComponent } from '../../../../packages/core/story-structure.js';

import App from './App.jsx';

import styles from './_storybook-styles.scss';

export default {
  title: getPathForComponent('o', 'Examples'),
  parameters: {
    styles,
  },
};

export const c4pGalleryCodeSandbox = () => <App site="codesandbox" />;
c4pGalleryCodeSandbox.storyName = 'on CodeSandbox';
c4pGalleryCodeSandbox.parameters = { options: { showPanel: false } };

export const c4pGalleryStackblitz = () => <App site="stackblitz" />;
c4pGalleryStackblitz.storyName = 'on Stackblitz';
c4pGalleryStackblitz.parameters = { options: { showPanel: false } };
