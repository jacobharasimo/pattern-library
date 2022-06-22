import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import { createGlobalStyle } from 'styled-components';
import marked from 'marked';
import 'semantic-ui-css/components/popup.min.css';

const Styles = createGlobalStyle`
  .ui.popup {
    && {
      border-radius: 4px;
      font-size: 13px;
      padding: 8px;
      font-weight: 400;
      color: #fff;
      background: #00002E;
      border: none;
      box-shadow:  0 1px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15);
      margin-left: -8px !important;

      &::before {
        background: #00002E;
        border: none;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      }

      > .header {
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
      }

      > .content {
        padding-top: 0;
      }

      > .header + .content {
        padding-top: 8px;
      }
    }
  }
`;

const Popover = ({ className, content, dark, header, trigger, ...rest }) => (
  <>
    <Styles />
    <Popup className={className} inverted={dark} trigger={trigger} {...rest}>
      {header && <Popup.Header>{header}</Popup.Header>}
      {content && (
        <Popup.Content dangerouslySetInnerHTML={{ __html: marked(content) }} />
      )}
    </Popup>
  </>
);

export default Popover;

Popover.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  dark: PropTypes.bool,
  header: PropTypes.string,
  trigger: PropTypes.node.isRequired,
};

Popover.defaultProps = {
  className: '',
  content: '',
  dark: false,
  header: '',
};
