//
// Copyright IBM Corp. 2020, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { TagSetOverflow } from './TagSetOverflow';
import { TagSetModal } from './TagSetModal';
import { Tag } from '@carbon/react';
import { useResizeObserver } from '../../global/js/hooks/useResizeObserver';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { isRequiredIf } from '../../global/js/utils/props-helper';
import { pkg } from '../../settings';

const componentName = 'TagSet';
const blockClass = `${pkg.prefix}--tag-set`;

const allTagsModalSearchThreshold = 10;

// Default values for props
const defaults = {
  align: 'start',
  overflowAlign: 'bottom',
  overflowType: 'default',
};

export let TagSet = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      align = defaults.align,
      allTagsModalTarget,
      className,
      maxVisible,
      multiline,
      overflowAlign = defaults.overflowAlign,
      overflowClassName,
      overflowType = defaults.overflowType,
      allTagsModalTitle,
      allTagsModalSearchLabel,
      allTagsModalSearchPlaceholderText,
      showAllTagsLabel,
      tags,

      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const [displayCount, setDisplayCount] = useState(3);
    const [displayedTags, setDisplayedTags] = useState([]);
    const [hiddenSizingTags, setHiddenSizingTags] = useState([]);
    const [showAllModalOpen, setShowAllModalOpen] = useState(false);
    const localTagSetRef = useRef(null);
    const tagSetRef = ref || localTagSetRef;
    const sizingContainerRef = useRef();
    const displayedArea = useRef(null);
    const [sizingTags, setSizingTags] = useState([]);
    const overflowTag = useRef(null);

    const handleShowAllClick = () => {
      setShowAllModalOpen(true);
    };

    useEffect(() => {
      const newSizingTags = [];
      // create sizing tags
      setHiddenSizingTags(
        tags && tags.length > 0
          ? tags.map(({ label, id, ...other }, index) => {
              return (
                <div
                  key={index}
                  className={`${blockClass}__sizing-tag`}
                  ref={(el) => (newSizingTags[index] = el)}
                >
                  <Tag
                    {...other} // ensure id is not duplicated
                    data-original-id={id}
                  >
                    {label}
                  </Tag>
                </div>
              );
            })
          : []
      );
      setSizingTags(newSizingTags);
    }, [tags]);

    useEffect(() => {
      // create visible and overflow tags
      let newDisplayedTags =
        tags && tags.length > 0
          ? tags.map(({ label, ...other }, index) => (
              <Tag {...other} key={`displayed-tag-${index}`}>
                {label}
              </Tag>
            ))
          : [];

      // separate out tags for the overflow
      const newOverflowTags = newDisplayedTags.splice(
        displayCount,
        newDisplayedTags.length - displayCount
      );

      // add wrapper around displayed tags
      newDisplayedTags = newDisplayedTags.map((tag, index) => (
        <div key={index} className={`${blockClass}__displayed-tag`}>
          {tag}
        </div>
      ));

      newDisplayedTags.push(
        <TagSetOverflow
          allTagsModalSearchThreshold={allTagsModalSearchThreshold}
          className={overflowClassName}
          onShowAllClick={handleShowAllClick}
          overflowTags={newOverflowTags}
          overflowAlign={overflowAlign}
          overflowType={overflowType}
          showAllTagsLabel={showAllTagsLabel}
          key="displayed-tag-overflow"
          ref={overflowTag}
        />
      );

      setDisplayedTags(newDisplayedTags);
    }, [
      displayCount,
      overflowAlign,
      overflowClassName,
      overflowType,
      showAllTagsLabel,
      tags,
    ]);

    const checkFullyVisibleTags = useCallback(() => {
      if (multiline) {
        return setDisplayCount(maxVisible);
      }

      // how many will fit?
      let willFit = 0;

      if (sizingTags.length > 0) {
        let spaceAvailable = tagSetRef.current.offsetWidth;

        for (let i in sizingTags) {
          const tagWidth = sizingTags[i]?.offsetWidth || 0;

          if (spaceAvailable >= tagWidth) {
            spaceAvailable -= tagWidth;
            willFit += 1;
          } else {
            break;
          }
        }

        if (willFit < sizingTags.length) {
          while (
            willFit > 0 &&
            spaceAvailable < overflowTag.current.offsetWidth
          ) {
            // Highly unlikely any useful tag is smaller
            willFit -= 1; // remove one tag
            spaceAvailable += sizingTags[willFit].offsetWidth;
          }
        }
      }

      if (willFit < 1) {
        setDisplayCount(0);
      } else {
        setDisplayCount(maxVisible ? Math.min(willFit, maxVisible) : willFit);
      }
    }, [maxVisible, multiline, sizingTags, tagSetRef]);

    useEffect(() => {
      checkFullyVisibleTags();
    }, [checkFullyVisibleTags, maxVisible, multiline, sizingTags]);

    /* don't know how to test resize */
    /* istanbul ignore next */
    const handleResize = () => {
      /* istanbul ignore next */ // not sure how to test resize
      checkFullyVisibleTags();
    };

    /* don't know how to test resize */
    /* istanbul ignore next */
    const handleSizerTagsResize = () => {
      /* istanbul ignore next */ // not sure how to test resize
      checkFullyVisibleTags();
    };

    const handleModalClose = () => {
      setShowAllModalOpen(false);
    };

    useResizeObserver(sizingContainerRef, handleSizerTagsResize);

    useResizeObserver(tagSetRef, handleResize);

    return (
      <div
        {...rest}
        className={cx([blockClass, className])}
        ref={tagSetRef}
        {...getDevtoolsProps(componentName)}
      >
        <div
          className={cx([
            `${blockClass}__space`,
            `${blockClass}__space--align-${align}`,
          ])}
        >
          <div
            className={`${blockClass}__tag-container ${blockClass}__tag-container--hidden`}
            aria-hidden={true}
            ref={sizingContainerRef}
          >
            {hiddenSizingTags}
          </div>

          <div
            className={cx([
              `${blockClass}__tag-container`,
              multiline && `${blockClass}__tag-container--multiline`,
            ])}
            ref={displayedArea}
          >
            {displayedTags}
          </div>
        </div>
        <TagSetModal
          allTags={tags}
          open={showAllModalOpen}
          title={allTagsModalTitle}
          onClose={handleModalClose}
          searchLabel={allTagsModalSearchLabel}
          searchPlaceholder={allTagsModalSearchPlaceholderText}
          portalTarget={allTagsModalTarget}
        />
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
TagSet = pkg.checkComponentEnabled(TagSet, componentName);

/**
 * The strings shown in the showAllModal are only shown if we have more than allTagsModalSearchLThreshold
 * @returns null if no problems
 */
export const string_required_if_more_than_10_tags = isRequiredIf(
  PropTypes.string,
  ({ tags }) => tags && tags.length > allTagsModalSearchThreshold
);

// copied from carbon-components-react/src/components/Tag/Tag.js for DocGen
const TYPES = {
  red: 'Red',
  magenta: 'Magenta',
  purple: 'Purple',
  blue: 'Blue',
  cyan: 'Cyan',
  teal: 'Teal',
  green: 'Green',
  gray: 'Gray',
  'cool-gray': 'Cool-Gray',
  'warm-gray': 'Warm-Gray',
  'high-contrast': 'High-Contrast',
  outline: 'Outline',
};
const tagTypes = Object.keys(TYPES);

TagSet.types = tagTypes;

TagSet.propTypes = {
  /**
   * align the Tags displayed by the TagSet. Default start.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * label text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchLabel: string_required_if_more_than_10_tags,
  /**
   * placeholder text for the show all search. **Note: Required if more than 10 tags**
   */
  allTagsModalSearchPlaceholderText: string_required_if_more_than_10_tags,
  /**
   * portal target for the all tags modal
   */
  allTagsModalTarget: PropTypes.node,
  /**
   * title for the show all modal. **Note: Required if more than 10 tags**
   */
  allTagsModalTitle: string_required_if_more_than_10_tags,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * maximum visible tags
   */
  maxVisible: PropTypes.number,
  /**
   * display tags in multiple lines
   */
  multiline: PropTypes.bool,
  /**
   * overflowAlign from the standard tooltip. Default center.
   */
  overflowAlign: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'left-bottom',
    'left-top',
    'right',
    'right-bottom',
    'right-top',
  ]),
  /**
   * overflowClassName for the tooltip popup
   */
  overflowClassName: PropTypes.string,
  /**
   * Type of rendering displayed inside of the tag overflow component
   */
  overflowType: PropTypes.oneOf(['default', 'tag']),
  /**
   * label for the overflow show all tags link.
   *
   * **Note:** Required if more than 10 tags
   */
  showAllTagsLabel: string_required_if_more_than_10_tags,
  /**
   * The tags to be shown in the TagSet. Each tag is specified as an object
   * with properties: **label**\* (required) to supply the tag content, and
   * other properties will be passed to the Carbon Tag component, such as
   * **type**, **disabled**, **ref**, **className** , and any other Tag props.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-tag--default
   */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      ...Tag.propTypes,
      label: PropTypes.string.isRequired,
      // we duplicate this prop to improve the DocGen
      type: PropTypes.oneOf(tagTypes),
    })
  ),
};

TagSet.displayName = componentName;

export default TagSet;
