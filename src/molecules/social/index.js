import React from 'react';
import { Dribbble, ExternalLink, FileText, GitHub, Linkedin, Mail, Twitter } from 'react-feather';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Flex, Text, Box, Link } from 'rebass/styled-components';
import theme from '../../theme';
import { AngellistIcon } from '../../assets/icons/Angellist.icon';

const Social = ({
  size,
  angellist,
  email,
  website,
  linkedin,
  twitter,
  github,
  dribbble,
  resume,
  className,
  onClick,
}) => {
  const isSmall = size === 'sm';
  const absoluteUrl = url => {
    if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
      return `https://${url}`;
    }
    return url;
  };

  const handleClick = (e, platform) => {
    e.stopPropagation();

    if (!onClick) {
      return;
    }

    onClick(platform);
  };

  return (
    <ThemeProvider theme={theme}>
      <Flex as="ul" m={0} p={0} className={className} sx={{ listStyle: 'none', lineHeight: 0 }}>
        {angellist && (
          <Box as="li" tx="social" variant="listItem" data-testid="anglelist">
            <Link
              tx="social"
              variant="link"
              color="text"
              href={`mailto:${angellist}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'angellist')}
            >
              <Box
                as={AngellistIcon}
                tx="social"
                variant="icon"
                name="angellist"
                strokeWidth="1.5"
                aria-hidden="true"
              />
              <Text variant={isSmall ? 'srOnly' : ''}>AngelList</Text>
            </Link>
          </Box>
        )}
        {email && (
          <Box as="li" tx="social" variant="listItem" data-testid="email">
            <Link
              tx="social"
              variant="link"
              sx={{ position: 'relative', top: '1px' }}
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'email')}
            >
              <Box as={Mail} tx="social" variant="icon" strokeWidth="1.5" aria-hidden="true" />
              <Text variant={isSmall ? 'srOnly' : ''}>{email}</Text>
            </Link>
          </Box>
        )}
        {linkedin && (
          <Box as="li" tx="social" variant="listItem" data-testid="linkedin">
            <Link
              tx="social"
              variant="link"
              color="linkedin"
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'linkedin')}
            >
              <Box as={Linkedin} tx="social" variant="icon" strokeWidth="1.5" aria-hidden="true" />
              <Text variant={isSmall ? 'srOnly' : ''}>LinkedIn</Text>
            </Link>
          </Box>
        )}
        {twitter && (
          <Box as="li" tx="social" variant="listItem" data-testid="twitter">
            <Link
              tx="social"
              variant="link"
              color="twitter"
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'twitter')}
            >
              <Box as={Twitter} tx="social" variant="icon" strokeWidth="1.5" aria-hidden="true" />
              <Text variant={isSmall ? 'srOnly' : ''}>Twitter</Text>
            </Link>
          </Box>
        )}
        {github && (
          <Box as="li" tx="social" variant="listItem" data-testid="github">
            <Link
              tx="social"
              variant="link"
              color="github"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'github')}
            >
              <Box as={GitHub} tx="social" variant="icon" strokeWidth="1.5" aria-hidden="true" />
              <Text variant={isSmall ? 'srOnly' : ''}>GitHub</Text>
            </Link>
          </Box>
        )}
        {dribbble && (
          <Box as="li" tx="social" variant="listItem" data-testid="dribbble">
            <Link
              tx="social"
              variant="link"
              color="dribbble"
              href={dribbble}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'dribbble')}
            >
              <Box as={Dribbble} tx="social" variant="icon" strokeWidth="1.5" aria-hidden="true" />
              <Text variant={isSmall ? 'srOnly' : ''}>Dribbble</Text>
            </Link>
          </Box>
        )}
        {resume && (
          <Box as="li" tx="social" variant="listItem" data-testid="resume">
            <Link
              tx="social"
              variant="link"
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'resume')}
            >
              <Box as={FileText} tx="social" variant="icon" strokeWidth="1.5" aria-hidden="true" />
              <Text variant={isSmall ? 'srOnly' : ''}>Resume</Text>
            </Link>
          </Box>
        )}
        {website && (
          <Box as="li" tx="social" variant="listItem" data-testid="website">
            <Link
              tx="social"
              variant="link"
              href={absoluteUrl(website)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleClick(e, 'website')}
            >
              <Box as={ExternalLink} tx="social" variant="icon" strokeWidth="1.5" aria-hidden="true" />
              <Text variant={isSmall ? 'srOnly' : ''}>{website}</Text>
            </Link>
          </Box>
        )}
      </Flex>
    </ThemeProvider>
  );
};

Social.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  github: PropTypes.string,
  linkedin: PropTypes.string,
  onClick: PropTypes.func,
  resume: PropTypes.string,
  twitter: PropTypes.string,
  website: PropTypes.string,
  angellist: PropTypes.string,
  dribbble: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md']),
};

Social.defaultProps = {
  size: 'md',
  className: '',
  email: null,
  github: null,
  linkedin: null,
  onClick: null,
  dribbble: null,
  angellist: null,
  resume: null,
  twitter: null,
  website: null,
};

export default Social;
