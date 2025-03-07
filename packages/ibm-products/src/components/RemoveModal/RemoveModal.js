//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState, useRef, forwardRef, useEffect } from 'react';
import cx from 'classnames';
import {
  Button,
  ComposedModal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  TextInput,
} from '@carbon/react';
import PropTypes from 'prop-types';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import uuidv4 from '../../global/js/utils/uuidv4';
import { pkg } from '../../settings';
import { usePreviousValue } from '../../global/js/hooks';
import { usePortalTarget } from '../../global/js/hooks/usePortalTarget';

const componentName = 'RemoveModal';

/**
The `RemoveModal` covers what is known as high impact and medium impact deleting.
Enabling `textConfirmation` enables what would be considered the high impact state of the modal.
For additional information on differentiating between delete / remove and low / medium / high impact please refer to the usage guidelines.
 */
export let RemoveModal = forwardRef(
  (
    {
      body,
      className,
      iconDescription,
      inputInvalidText,
      inputLabelText,
      inputPlaceholderText,
      label,
      onClose,
      onRequestSubmit,
      open,
      portalTarget: portalTargetIn,
      preventCloseOnClickOutside,
      primaryButtonDisabled,
      primaryButtonText,
      resourceName,
      secondaryButtonText,
      textConfirmation,
      title,
      ...rest
    },
    ref
  ) => {
    const previousState = usePreviousValue({ open });
    const [userInput, setUserInput] = useState('');
    const idRef = useRef(uuidv4());
    const renderPortalUse = usePortalTarget(portalTargetIn);
    const onChangeHandler = (e) => {
      setUserInput(e.target.value);
    };
    const checkPrimaryButtonDisabled = () => {
      // user control should be used primarily
      if (primaryButtonDisabled) {
        return true;
      } else if (textConfirmation && userInput !== resourceName) {
        return true;
      }
      return false;
    };
    const primaryButtonStatus = checkPrimaryButtonDisabled();
    const blockClass = `${pkg.prefix}--remove-modal`;

    // Clear the user input this way so that if the onRequestSubmit handler fails for some reason
    // the value of the input will still remain: we only want to empty the input value
    // when open actually changes to false.
    useEffect(() => {
      if (!open && previousState?.open) {
        setUserInput('');
      }
    }, [open, previousState?.open]);

    return renderPortalUse(
      <ComposedModal
        {...rest}
        className={cx(blockClass, className)}
        size="sm"
        aria-label={title}
        {...{
          open,
          ref,
          preventCloseOnClickOutside,
          onClose,
          ...getDevtoolsProps(componentName),
        }}
      >
        <ModalHeader
          title={title}
          label={label}
          iconDescription={iconDescription}
        />
        <ModalBody>
          <p className={`${blockClass}__body`}>{body}</p>
          {textConfirmation && (
            <TextInput
              id={`${idRef.current}-confirmation-input`}
              className={`${blockClass}__input`}
              invalidText={inputInvalidText}
              labelText={inputLabelText}
              placeholder={inputPlaceholderText}
              onChange={onChangeHandler}
              value={userInput}
              data-modal-primary-focus
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            kind="secondary"
            onClick={onClose}
            data-modal-primary-focus={!textConfirmation}
          >
            {secondaryButtonText}
          </Button>
          <Button
            type="submit"
            kind="danger"
            onClick={onRequestSubmit}
            disabled={primaryButtonStatus}
          >
            {primaryButtonText}
          </Button>
        </ModalFooter>
      </ComposedModal>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
RemoveModal = pkg.checkComponentEnabled(RemoveModal, componentName);

RemoveModal.propTypes = {
  /**
   * The content to be displayed in the body of the modal
   */
  body: PropTypes.string.isRequired,
  /**
   * Optional classname
   */
  className: PropTypes.string,
  /**
   * Provide a description for "close" icon that can be read by screen readers
   */
  iconDescription: PropTypes.string.isRequired,
  /**
   * Message showed when user input fails validation
   */
  inputInvalidText: PropTypes.string,
  /**
   * Label for text box
   */
  inputLabelText: PropTypes.node,
  /**
   * Placeholder for text box
   */
  inputPlaceholderText: PropTypes.string,
  /**
   * Specify the modal label texts
   */
  label: PropTypes.string,
  /**
   * Callback function that runs when user closes the modal
   */
  onClose: PropTypes.func,
  /**
   * Callback function that runs when user submits the modal
   */
  onRequestSubmit: PropTypes.func,
  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool.isRequired,
  /**
   * The DOM node the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget: PropTypes.node,
  /**
   * Prevent closing on click outside of modal
   */
  preventCloseOnClickOutside: PropTypes.bool,
  /**
   * Specify whether the primary button should be disabled. This value will override textConfirmation
   */
  primaryButtonDisabled: PropTypes.bool,
  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string,
  /**
   * The name of the resource being acted upon
   */
  resourceName: PropTypes.string.isRequired,
  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string,
  /**
   * Specify whether or not to show the text confirmation input
   */
  textConfirmation: PropTypes.bool,
  /**
   * The text displayed at the top of the modal
   */
  title: PropTypes.string.isRequired,
};

RemoveModal.displayName = componentName;
