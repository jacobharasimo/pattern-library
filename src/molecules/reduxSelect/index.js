import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import { Flex, Box, Text } from 'rebass/styled-components';
import Select from 'react-select';
import baseTheme from '../../theme';
import { FormFieldError } from '../../atoms/formFieldError';

const renderLabelDefault = ({ label }) => (
  <Text data-testid="default-option-item">{label}</Text>
);

const ReduxSelect = props => {
  const { theme, isMulti, optionsMessage, noResultsMessage, error } = props;
  const getNoOptionsMessage = ({ inputValue }) => {
    if (!inputValue || inputValue.length === 0) {
      return optionsMessage;
    }
    return noResultsMessage;
  };

  const defaultProps = {
    styles: {
      placeholder: (provided, state) => ({
        color: state.theme.colors.textPlaceholder,
        marginLeft: 0,
        marginRight: 0,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        lineHeight: '2.15',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: state.theme.space[2],
        paddingRight: state.theme.space[2],
      }),
      input: (provided, state) => ({
        ...provided,
        color: state.theme.colors.text,
        fontWeight: state.theme.fontWeights.body,
      }),
      option: (provided, state) => ({
        ...provided,
        paddingTop: state.theme.space[2],
        paddingBottom: state.theme.space[2],
        paddingLeft: state.theme.space[3],
        paddingRight: state.theme.space[3],
        background: state.isFocused
          ? state.theme.colors.gray[3]
          : 'transparent',
      }),
      control: (provided, state) => ({
        backgroundColor: state.theme.colors.neutral[0],
        borderRadius: state.theme.borderRadius,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: state.isFocused
          ? state.theme.colors.blue[600]
          : state.theme.colors.gray[2],
      }),
      menu: (provided, state) => ({
        ...provided,
        background: state.theme.colors.neutral[0],
        boxShadow:
          '0 1px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15)',
        borderRadius: state.theme.borderRadius,
        marginBottom: state.theme.space[2],
        marginTop: state.theme.space[2],
      }),
      singleValue: provided => ({
        ...provided,
        display: 'flex',
        width: '100%',
        height: '100%',
      }),
    },
    theme: merge(baseTheme, theme),
    components: {
      DropdownIndicator: null,
      IndicatorSeparator: null,
      LoadingIndicator: null,
      ClearIndicator: null,
    },
    noOptionsMessage: getNoOptionsMessage,
  };

  const renderProps = merge(defaultProps, props);
  return (
    <Flex flexDirection="column">
      <Box
        data-testid="redux-select"
        width={[1]}
        {...renderProps}
        openMenuOnFocus
        controlShouldRenderValue={!isMulti}
        as={Select}
      />
      {error && <FormFieldError error={error} />}
    </Flex>
  );
};

ReduxSelect.propTypes = {
  theme: PropTypes.object,
  formatOptionLabel: PropTypes.func,
  defaultValue: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  value: PropTypes.oneOf([PropTypes.object, PropTypes.array, PropTypes.string])
    .isRequired,
  optionsMessage: PropTypes.string,
  noResultsMessage: PropTypes.string,
  options: PropTypes.array,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  error: PropTypes.string,
};

ReduxSelect.defaultProps = {
  theme: {},
  error: null,
  defaultValue: null,
  optionsMessage: 'Start typing to search',
  noResultsMessage: 'No results found',
  placeholder: 'Select...',
  clearable: true,
  disabled: false,
  isMulti: false,
  isLoading: false,
  options: [],
  formatOptionLabel: renderLabelDefault,
  onInputChange: () => {},
  onChange: () => {},
};

export default ReduxSelect;
