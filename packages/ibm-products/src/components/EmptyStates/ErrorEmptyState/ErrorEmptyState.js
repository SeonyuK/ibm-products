/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import { Button, Link } from '@carbon/react';
import cx from 'classnames';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';

import { EmptyStateContent } from '../EmptyStateContent';
import { ErrorIllustration } from '../assets/ErrorIllustration';
import { defaults } from '../EmptyState';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--empty-state`;
const componentName = 'ErrorEmptyState';

/**
 * The `EmptyState` component follows the Carbon guidelines for empty states with some added specifications around illustration usage. For additional usage guidelines and documentation please refer to the links above.
 */
export let ErrorEmptyState = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      action,
      className,
      illustrationPosition = defaults.position,
      illustrationTheme,
      link,
      size = defaults.size,
      subtitle,
      title,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass,
          className,
          `${blockClass}-position--${illustrationPosition}`,
          `${blockClass}-type--error`
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <ErrorIllustration theme={illustrationTheme} size={size} />
        <EmptyStateContent
          action={action}
          link={link}
          size={size}
          subtitle={subtitle}
          title={title}
        />
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
ErrorEmptyState = pkg.checkComponentEnabled(ErrorEmptyState, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
ErrorEmptyState.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
ErrorEmptyState.propTypes = {
  /**
   * Empty state action button
   */
  action: PropTypes.shape({
    ...Button.propTypes,
    kind: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onClick: Button.propTypes.onClick,
    text: PropTypes.string,
  }),

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Designates the position of the illustration relative to the content
   */
  illustrationPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Empty state illustration theme variations.
   * To ensure you use the correct themed illustrations, you can conditionally specify light or dark
   * based on your app's current theme value. Example:
   * `illustrationTheme={appTheme === ('carbon--g100' || 'carbon--g90') ? 'dark' : 'light'}`
   */
  illustrationTheme: PropTypes.oneOf(['light', 'dark']),

  /**
   * Empty state link object
   */
  link: PropTypes.shape({
    ...Link.propTypes,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    href: PropTypes.string,
  }),

  /**
   * Empty state size
   */
  size: PropTypes.oneOf(['lg', 'sm']),

  /**
   * Empty state subtitle
   */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Empty state title
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
