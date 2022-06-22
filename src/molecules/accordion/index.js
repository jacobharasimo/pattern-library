import React, { useEffect, useState } from 'react';
import { Flex, Box, Button } from 'rebass/styled-components';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'react-feather';

export const Accordion = ({ isOpen, children, title, ...props }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);
  const [accordionId, setAccordionId] = useState(1);

  useEffect(() => {
    let nextId =
      document.querySelectorAll('[data-testid="accordion"]').length || 1;
    if (document.getElementById(`accordion${nextId}id`)) {
      nextId += 1;
    }
    setAccordionId(nextId);
  }, []);

  useEffect(() => {
    setIsAccordionOpen(isOpen);
  }, [isOpen]);

  return (
    <Flex
      data-testid="accordion"
      aria-expanded={isAccordionOpen}
      flexDirection="column"
      tx="accordion"
      {...props}
    >
      <Button
        tx="accordion"
        variant="button"
        onClick={() => {
          setIsAccordionOpen(!isAccordionOpen);
        }}
        id={`accordion${accordionId}id`}
        aria-controls={`sect${accordionId}`}
        data-testid="title"
      >
        {title}
        <Box
          height="16px"
          as={isAccordionOpen ? ChevronUp : ChevronDown}
          strokeWidth="2"
          ml="auto"
        />
      </Button>
      <Box
        tx="accordion"
        variant="content"
        aria-hidden={!isAccordionOpen}
        role="region"
        id={`sect${accordionId}`}
        data-testid="collapse-section"
        arai-labelledby={`sect${accordionId}`}
        sx={{
          maxHeight: isAccordionOpen ? '999999px' : '0',
          py: isAccordionOpen ? 3 : 0,
          transform: isAccordionOpen ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          '&[aria-hidden="false"]': {
            transition: 'transform 0.26s ease',
          },
        }}
      >
        {children}
      </Box>
    </Flex>
  );
};

Accordion.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isOpen: PropTypes.bool,
};

Accordion.defaultProps = {
  isOpen: false,
};
