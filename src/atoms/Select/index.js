/* eslint-disable react/no-multi-comp */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, HelpCircle, X } from 'react-feather';
import ReactSelect, { components } from 'react-select';
import { ThemeProvider } from 'styled-components';
import { Box, Flex } from 'rebass/styled-components';

import ErrorMessage from '../ErrorMessage';
import FormLabel from '../FormLabel';
import ListItem from '../ListItem';
import Popover from '../Popover';
import theme from '../../theme';

const MAX_MENU_HEIGHT = 600;

const ClearIndicator = props => (
  <components.DropdownIndicator {...props}>
    <Box
      as={X}
      width="16px"
      height="16px"
      strokeWidth="1.5"
      aria-hidden="true"
    />
  </components.DropdownIndicator>
);

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <Box as={ChevronDown} strokeWidth="1.5" aria-hidden="true" />
  </components.DropdownIndicator>
);

const Select = ({
  anchorToBody,
  className,
  clearable,
  customFormatOptionLabel,
  disabled,
  label,
  multiple,
  name,
  onChange,
  options,
  orientation,
  placeholder,
  searchable,
  size,
  value,
  form,
  ...rest
}) => {
  const menuPortalTarget = anchorToBody ? document.querySelector('body') : null;
  const error = form && form.touched[name] && form.errors[name];

  const selectIndicatorPadding = useMemo(() => {
    if (size === 'sm') return 0;
    if (size === 'lg') return '12px';
    return 2;
  }, [size]);

  const selectValueContainerPadding = useMemo(() => {
    if (size === 'sm') return 1;
    if (size === 'lg') return '12px';
    return 1;
  }, [size]);

  const handleOnChange = params => {
    let returnValue = params;

    if (multiple) {
      returnValue = [];
      if (Array.isArray(value)) {
        returnValue = [...value];
      }

      if (!returnValue.find(e => e.value === params.value)) {
        returnValue = [...returnValue, params];
      }
    }

    onChange({ target: { name, value: returnValue } });
  };

  const handleOnRemove = id => () => {
    const returnValue = value.filter(v => v.value !== id);
    onChange({ target: { name, value: returnValue } });
  };

  const formatOptionLabel = params => {
    if (customFormatOptionLabel) {
      return customFormatOptionLabel(params);
    }

    const { label: optionLabel, icon, tooltipText } = params;

    return (
      <Flex
        alignItems="flex-start"
        sx={{
          lineHeight: '1.4',

          '.Select__option-label-icon': {
            marginRight: 2,
          },
          '.Select__option-label-content': {
            flex: 1,
            alignSelf: 'center',
          },
          '.Select__option-label-help': {
            padding: 1,
            marginRight: -1,
            opacity: 0,
            transition: 'opacity ease 0.3s',
          },
          '&:hover': {
            '.Select__option-label-help': {
              opacity: 1,
              '@media (hover: none)': {
                '&': {
                  opacity: 0,
                },
              },
            },
          },
        }}
      >
        {icon && <div className="Select__option-label-icon">{icon}</div>}

        <div className="Select__option-label-content">{optionLabel}</div>

        {tooltipText && (
          <div className="Select__option-label-help">
            <Popover
              trigger={
                <Box
                  as={HelpCircle}
                  strokeWidth="1.5"
                  aria-hidden="true"
                  display="block"
                  width="3"
                  height="3"
                  color="neutral.400"
                />
              }
              content={tooltipText}
            />
          </div>
        )}
      </Flex>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          '.Select__control': {
            borderRadius: '4px',
            borderColor: 'neutral.300',
            minHeight: '32px',
            '&:hover': {
              borderColor: 'neutral.300',
            },
            '&--is-focused': {
              '&, &:hover': {
                borderColor: 'info',
              },
            },
            '.Select__option-label-content': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          },
          '.Select__indicator': {
            margin: '-1px',
            padding: selectIndicatorPadding,
            color: 'neutral.300',
            '&:hover': {
              color: 'neutral[400]',
            },
          },
          '.Select__option': {
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: '12px',
            paddingRight: '12px',
            transition: 'background ease 0.3s',
            '&--is-focused': {
              backgroundColor: 'neutral.50',
            },
            '&--is-selected': {
              backgroundColor: 'neutral.0',
              color: 'textDark',
              fontWeight: 'body',
            },
          },
          '.Select__placeholder': {
            color: 'textPlaceholder',
            marginLeft: 0,
            marginRight: 0,
          },
          '.Select__input': {
            color: 'text',
            input: {
              fontWeight: 'body',
            },
          },
          '.Select__value-container': {
            overflow: 'visible',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: selectValueContainerPadding,
            paddingRight: selectValueContainerPadding,
          },
          '.Select__single-value': {
            color: 'text',
            marginLeft: 0,
            marginRight: 0,
            '.Select__option-label-help': {
              display: 'none',
            },
          },
          '.Select__menu': {
            background: 'neutral.0',
            marginBottom: 2,
            marginTop: 2,
            borderRadius: '4px',
            boxShadow: theme.shadows.medium,
          },
          '.Select__group-heading': {
            fontSize: 0,
            textTransform: 'uppercase',
            color: 'textSubtle',
          },

          /* States */
          '.Select--is-disabled': {
            '.Select__control': {
              borderColor: 'neutral.100',
              backgroundColor: 'neutral.20',
            },
            '.Select__single-value': {
              color: 'neutral[400]',
            },
          },
        }}
        {...rest}
      >
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

        <ReactSelect
          className={className}
          classNamePrefix="Select"
          placeholder={placeholder}
          name={name}
          inputId={name}
          value={value}
          options={options}
          onChange={handleOnChange}
          isDisabled={disabled}
          components={{
            ClearIndicator,
            DropdownIndicator,
            IndicatorSeparator: null,
          }}
          controlShouldRenderValue={!multiple}
          formatOptionLabel={formatOptionLabel}
          isClearable={!multiple && clearable}
          isSearchable={searchable}
          isFocused
          maxMenuHeight={MAX_MENU_HEIGHT}
          menuPortalTarget={menuPortalTarget}
          {...rest}
        />

        {error && <ErrorMessage>{form.errors[name]}</ErrorMessage>}

        {multiple && Array.isArray(value) && !!value.length && (
          <Box mx="auto" mt={2} mb={-2}>
            {value.map(v => (
              <ListItem
                key={v.value}
                content={v.label}
                onRemove={handleOnRemove(v.value)}
                orientation={orientation}
                size={size}
              />
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

Select.propTypes = {
  anchorToBody: PropTypes.bool,
  className: PropTypes.string,
  clearable: PropTypes.bool,
  customFormatOptionLabel: PropTypes.func,
  disabled: PropTypes.bool,
  form: PropTypes.object,
  label: PropTypes.node,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      label: PropTypes.node,
      tooltipText: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  onChange: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Select.defaultProps = {
  anchorToBody: false,
  className: '',
  clearable: false,
  customFormatOptionLabel: null,
  disabled: false,
  form: null,
  label: null,
  multiple: false,
  onChange: () => {},
  options: [],
  orientation: 'vertical',
  placeholder: '',
  searchable: false,
  size: 'md',
  value: null,
};

export default Select;
