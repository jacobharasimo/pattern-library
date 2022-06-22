import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Button } from 'rebass/styled-components';
import { Edit2 } from 'react-feather';
import { ThemeProvider } from 'styled-components';
import Message from '../../atoms/Message';
import { usePrevious } from '../../hooks/usePrevious';
import { Panel } from '../panel';
import { AsyncButton } from '../../atoms/asyncButton';
import Loader from '../../atoms/Loader';
import theme from '../../theme';

const ButtonSchema = PropTypes.shape({
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
});

const AsyncButtonSchema = PropTypes.shape({
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
});

export const EditPanel = forwardRef(
  (
    {
      onEditClick,
      isLoading,
      children,
      title,
      footer,
      closeEditAfterSave,
      canEdit,
      cancelButton,
      saveButton,
      errorMessage,
      initDisplayMode,
    },
    ref,
  ) => {
    const [isEditMode, setIsEditMode] = useState(initDisplayMode === 'edit');
    // set default button values
    const cancelButtonProps = { variant: 'tertiary', children: 'Cancel' };
    Object.assign(cancelButtonProps, cancelButton);
    const saveButtonProps = {
      variant: 'primary',
      children: 'Save',
      loading: false,
    };
    Object.assign(saveButtonProps, saveButton);

    const previousLoadingState = usePrevious(saveButton.loading);

    useEffect(() => {
      setIsEditMode(initDisplayMode === 'edit');
    }, [initDisplayMode]);

    useEffect(() => {
      if (previousLoadingState && !saveButton.loading) {
        if (closeEditAfterSave && !errorMessage) {
          setIsEditMode(false);
        }
      }
    }, [
      errorMessage,
      saveButton.loading,
      previousLoadingState,
      closeEditAfterSave,
    ]);

    useImperativeHandle(ref, () => ({
      setIsEditMode,
      isEditMode,
      renderFooter,
      headerButtonFunction,
    }));

    const renderChildren = scope => {
      if (isLoading) {
        return <Loader data-testid="loader" />;
      }
      if (typeof children === 'function') {
        return children(scope);
      }
      return children;
    };

    const headerButtonFunction = () => {
      if (isEditMode || !canEdit || isLoading) {
        return null;
      }
      return {
        children: (
          <>
            <Box
              width="16px"
              height="16px"
              as={Edit2}
              strokeWidth="1.5"
              mr={2}
            />
            Edit
          </>
        ),
        onClick: () => {
          setIsEditMode(true);
          if (onEditClick) {
            onEditClick();
          }
        },
      };
    };

    const renderFooter = () => {
      if (isLoading) {
        return null;
      }
      if (isEditMode) {
        return (
          <Flex
            data-testid="footer-actions"
            width={[1]}
            flexDirection={['column']}
          >
            {errorMessage && errorMessage.length && (
              <Box mb={3} width={[1]} as={Message} type="error">
                {errorMessage}
              </Box>
            )}
            <Flex justifyContent={['flex-end']}>
              <Button
                data-testid="cancel-button"
                type="button"
                mr={2}
                {...cancelButtonProps}
                onClick={() => {
                  setIsEditMode(false);
                  if (cancelButton && cancelButton.onClick) {
                    cancelButton.onClick();
                  }
                }}
              />
              <AsyncButton type="button" ml={2} {...saveButtonProps} />
            </Flex>
          </Flex>
        );
      }
      if (footer) {
        return footer;
      }
      return null;
    };

    return (
      <ThemeProvider theme={theme}>
        <Panel
          title={title}
          headerButton={headerButtonFunction()}
          footer={renderFooter()}
        >
          {renderChildren({ isEditing: isEditMode })}
        </Panel>
      </ThemeProvider>
    );
  },
);

EditPanel.propTypes = {
  onEditClick: PropTypes.func,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  closeEditAfterSave: PropTypes.bool,
  canEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
  saveButton: AsyncButtonSchema.isRequired,
  cancelButton: ButtonSchema.isRequired,
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  initDisplayMode: PropTypes.oneOf(['edit', 'read']),
};

EditPanel.defaultProps = {
  onEditClick: null,
  isLoading: false,
  title: null,
  closeEditAfterSave: true,
  errorMessage: '',
  canEdit: false,
  footer: null,
  initDisplayMode: 'read',
};
