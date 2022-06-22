import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import debounce from 'debounce';
import { ThemeProvider } from 'styled-components';
import { Box, Flex, Text } from 'rebass/styled-components';

import ErrorMessage from '../ErrorMessage';
import FormLabel from '../FormLabel';
import ListItem from '../ListItem';
import theme, { colors } from '../../theme';
import { ProfilePicture } from '../../molecules/profilePicture';

const Search = ({
  className,
  disabled,
  form,
  label,
  multiple,
  name,
  orientation,
  onChange,
  onSearch,
  placeholder,
  selectedItemLabelFormatter,
  showAvatar,
  size,
  value,
  ...rest
}) => {
  const debouncedOnSearch = useRef(
    debounce((query, callback) => {
      onSearch(query)
        .then(result => callback(result))
        .catch(error => callback(error, null));
    }, 500),
  );

  const handleOnChange = newValue => {
    let returnValue = newValue;

    if (multiple) {
      returnValue = [];
      if (Array.isArray(value)) {
        returnValue = [...value];
      }
      returnValue = [...returnValue, newValue];
    }

    onChange({ target: { name, value: returnValue } });
  };

  const handleOnRemove = valueToRemove => () => {
    const returnValue = value.filter(v => v.value !== valueToRemove);
    onChange({ target: { name, value: returnValue } });
  };

  const getNoOptionsMessage = ({ inputValue }) => {
    if (!inputValue || inputValue.length === 0) {
      return 'Start typing to search';
    }

    return 'No results found';
  };

  const formatOptionLabel = ({ avatarUrl, label: optionLabel }) => (
    <Flex
      alignItems="flex-start"
      sx={{
        lineHeight: '1.2',
      }}
    >
      {showAvatar && (
        <Box sx={{ width: '16px', height: '16px' }} mr={2}>
          <ProfilePicture imageUrl={avatarUrl} name={optionLabel} />
        </Box>
      )}

      <Text sx={{ flex: 1, alignSelf: 'center' }} className="Search__content">
        {optionLabel}
      </Text>
    </Flex>
  );

  const generateSelectedItemLabel = s => {
    if (selectedItemLabelFormatter) {
      return selectedItemLabelFormatter(s);
    }

    return s.label;
  };

  const valueProps = multiple ? {} : { value };
  const error = form && form.touched[name] && form.errors[name];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          '.Search__placeholder': {
            color: 'textPlaceholder',
            marginLeft: 0,
            marginRight: 0,
          },
          '.Search_control': {
            borderRadius: '4px',
            borderColor: error ? 'danger' : 'neutral.300',
            boxShadow: error ? `0 0 4px ${colors.danger}60` : undefined,
            minHeight: size === 'lg' ? '48px' : '40px',
            '&:hover': {
              borderColor: 'neutral.300',
            },
            '&--is-focused': {
              '&, &:hover': {
                borderColor: 'info',
              },
            },
          },
          '.Search__input': {
            color: 'text',
            input: {
              fontWeight: 'body',
              border: 'none',
            },
          },
          '.Search__menu': {
            background: 'neutral.0',
            marginBottom: 2,
            marginTop: 2,
            borderRadius: '4px',
            boxShadow: theme.shadows.medium,
          },
          '.Search__option': {
            padding: '8px 12px',
            '&:hover': {
              '.Search__option-label-help': {
                opacity: 1,
              },
            },
            '&--is-focused': {
              backgroundColor: 'neutral.100',
            },
            '&--is-Searched': {
              backgroundColor: 'neutral.20',
              color: 'inherit',
              fontWeight: 'medium',
            },
          },
          '&__selected-items': {
            margin: '8px auto -8px auto',
          },

          /* States */
          '.Search__control--is-disabled': {
            borderColor: 'neutral.100',
            backgroundColor: 'neutral.20',
          },
          '.Search__value-container': {
            padding: size === 'lg' ? '0 12px' : '0 8px',
          },
        }}
        {...rest}
      >
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <AsyncSelect
          className={className}
          classNamePrefix="Search"
          name={name}
          inputId={name}
          placeholder={placeholder}
          loadOptions={debouncedOnSearch.current}
          onChange={handleOnChange}
          isDisabled={disabled}
          components={{
            DropdownIndicator: null,
            IndicatorSeparator: null,
          }}
          controlShouldRenderValue={!multiple}
          formatOptionLabel={formatOptionLabel}
          noOptionsMessage={getNoOptionsMessage}
          {...valueProps}
        />

        {error && <ErrorMessage>{form.errors[name]}</ErrorMessage>}

        {multiple && Array.isArray(value) && !!value.length && (
          <Box mx="auto" my={3}>
            {Array.isArray(value) &&
              value.map(s => (
                <ListItem
                  key={s.value}
                  content={generateSelectedItemLabel(s)}
                  avatarUrl={s.avatarUrl}
                  onRemove={handleOnRemove(s.value)}
                  orientation={orientation}
                  showAvatar={showAvatar}
                  size={size}
                />
              ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  form: PropTypes.object,
  label: PropTypes.node,
  multiple: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  placeholder: PropTypes.string,
  selectedItemLabelFormatter: PropTypes.func,
  showAvatar: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Search.defaultProps = {
  className: '',
  clearable: true,
  disabled: false,
  form: null,
  label: null,
  multiple: false,
  onChange: () => {},
  onSearch: () => {},
  orientation: 'vertical',
  placeholder: '',
  selectedItemLabelFormatter: null,
  showAvatar: false,
  size: 'md',
  value: null,
};

export default Search;
