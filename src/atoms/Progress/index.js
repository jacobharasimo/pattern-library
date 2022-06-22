import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

const Progress = ({ showText, step, total, stepInProgress, ...rest }) => {
  const labelStep = Math.min(step, total);
  let width = 0;
  if (step > 0 && total > 0) {
    const currentStep = stepInProgress ? step - 1 : step;
    width = Math.round((currentStep * 100) / total);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box {...rest}>
        {showText && (
          <Box mb={2}>
            Step {labelStep} of {total}
          </Box>
        )}
        <Box
          bg="neutral.100"
          height="8px"
          sx={{
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <Box
            bg="primary"
            height="100%"
            sx={{
              borderRadius: '16px',
              transition: 'all 0.3s',
            }}
            width={`${width}%`}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

Progress.propTypes = {
  showText: PropTypes.bool,
  step: PropTypes.number,
  total: PropTypes.number.isRequired,
  stepInProgress: PropTypes.bool,
};

Progress.defaultProps = {
  showText: false,
  step: 0,
  stepInProgress: false,
};

export default Progress;
