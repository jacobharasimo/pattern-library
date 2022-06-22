import React from 'react';
import moment from 'moment';
import { Flex, Box, Button } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import { getOcpStatus } from './getOcpStatus';
import { StatusIndicator } from '../../atoms/statusIndicator';
import Popover from '../../atoms/Popover';

export const JobSource = ({ canUpdateJobSources, source, onEditClick }) => {
  const { url, scraperStatus, scrapedAt, activeJobsCount } = source;

  const ocpStatus = getOcpStatus(scraperStatus);

  return (
    <ThemeProvider theme={theme}>
      <Flex flexDirection={['column']} color="text">
        <Box width={1} pb={2}>
          <Flex flexDirection={['row']}>
            <Box width={[1 / 3]}>URL</Box>
            <Box width={[2 / 3]}>
              {url}
              {canUpdateJobSources && (
                <Button variant="underlineLink" onClick={onEditClick}>
                  Edit
                </Button>
              )}
            </Box>
          </Flex>
        </Box>
        <Box width={1} py={2}>
          <Flex flexDirection={['row']}>
            <Box width={[1 / 3]}>Status</Box>
            <Box width={[2 / 3]}>
              <StatusIndicator
                status={ocpStatus.status}
                statusColor={ocpStatus.statusColor}
              />
            </Box>
          </Flex>
        </Box>
        <Box width={1} py={2}>
          <Flex flexDirection={['row']}>
            <Box width={[1 / 3]}>Last updated</Box>
            <Box width={[2 / 3]}>
              {scrapedAt ? (
                <Popover
                  content={
                    scrapedAt
                      ? moment(scrapedAt).format('D MMM, YYYY [at] hh:mm a')
                      : 'Not available'
                  }
                  trigger={<span>{moment().from(scrapedAt, true)} ago</span>}
                />
              ) : (
                'Never'
              )}
            </Box>
          </Flex>
        </Box>
        <Box width={1} pt={2}>
          <Flex flexDirection={['row']}>
            <Box width={[1 / 3]}>Jobs</Box>
            <Box width={[2 / 3]}>{activeJobsCount || 0} jobs</Box>
          </Flex>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};
JobSource.propTypes = {
  canUpdateJobSources: PropTypes.bool,
  source: PropTypes.shape({
    scraperStatus: PropTypes.string,
    scrapedAt: PropTypes.string,
    activeJobsCount: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onEditClick: PropTypes.func,
};

JobSource.defaultProps = {
  canUpdateJobSources: false,
  onEditClick: () => {},
};
