import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import Editor from '@draft-js-plugins/editor';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createToolbarPlugin, {
  Separator,
} from '@draft-js-plugins/static-toolbar';
import createListPlugin from 'draft-js-list-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createInlineToolbarPlugin, {
  Separator as InlineToolbarSeparator,
} from '@draft-js-plugins/inline-toolbar';
import {
  ItalicButton,
  BoldButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
} from '@draft-js-plugins/buttons';
import theme from '../../theme';
import linkStrategy, { LinkDecorator } from './components/LinkDecorator';
import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';

const customDecorators = new CompositeDecorator([
  {
    strategy: linkStrategy,
    component: LinkDecorator,
  },
]);

const TextEditor = ({ value, options, onChange }) => {
  const [editorState, setEditorState] = useState(() => {
    if (!value.length) {
      return EditorState.createEmpty(customDecorators);
    }

    return EditorState.createWithContent(
      convertFromRaw(markdownToDraft(value)),
      customDecorators,
    );
  });

  const editor = useRef(null);

  const [plugins, LinkButton, Toolbar, InlineToolbar] = useMemo(() => {
    const linkPlugin = createLinkPlugin();
    const toolbarPlugin = createToolbarPlugin({
      theme: { buttonStyles, toolbarStyles },
    });
    const listPlugin = createListPlugin({
      allowNestedLists: true,
      maxDepth: 4,
    });
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const markdownShortcutsPlugin = createMarkdownShortcutsPlugin();

    return [
      [
        listPlugin,
        toolbarPlugin,
        inlineToolbarPlugin,
        linkPlugin,
        markdownShortcutsPlugin,
      ],
      linkPlugin.LinkButton,
      toolbarPlugin.Toolbar,
      inlineToolbarPlugin.InlineToolbar,
    ];
  }, []);

  const focusEditor = () => editor.current?.focus();

  const handleChange = state => {
    setEditorState(state);
    const blocks = convertToRaw(editorState.getCurrentContent());
    onChange(draftToMarkdown(blocks));
  };

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleChange(newState);

      return 'handled';
    }

    return 'not-handled';
  };

  useEffect(() => {
    focusEditor();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          borderRadius: '4px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'neutral.300',
          '& .DraftEditor-root': {
            padding: 3,
            color: 'text',
            fontWeight: 'body',
            fontSize: 2,
            lineHeight: '24px',
            // containerHeight - toolbar height - padding
            minHeight: '160px',
            '*:first-child': {
              mt: '0!important',
            },
            h1: {
              fontWeight: 'semibold',
              fontSize: 4,
              marginBottom: 4,
              marginTop: 4,
              color: 'textDark',
            },
            h2: {
              fontWeight: 'semibold',
              fontSize: 3,
              marginBottom: 3,
              marginTop: 3,
              color: 'textDark',
            },
          },
          '& .public-DraftEditor-content div > div': {
            marginBottom: 3,
          },
          '& .DraftEditor-editorContainer': {
            '.public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul': {
              margin: '16px 0',
              padding: 0,
            },
            '.public-DraftStyleDefault-unorderedListItem': {
              listStyleType: 'square',
              position: 'relative',
            },
            '.public-DraftStyleDefault-orderedListItem': {
              listStyleType: 'none',
              position: 'relative',
            },
            '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0':
              {
                listStyleType: 'disc',
              },
            '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1':
              {
                listStyleType: 'circle',
              },
            '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset': {
              counterReset: 'ol0',
            },
            '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset': {
              counterReset: 'ol1',
            },
            '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset': {
              counterReset: 'ol2',
            },
            '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset': {
              counterReset: 'ol3',
            },
            '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset': {
              counterReset: 'ol4',
            },
            '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR':
              {
                marginLeft: '1.5em',
              },
            '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR':
              {
                marginLeft: '3em',
              },
            '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR':
              {
                marginLeft: '4.5em',
              },
            '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR':
              {
                marginLeft: '6em',
              },
            '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR':
              {
                marginLeft: '7.5em',
              },
            '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before':
              {
                left: '-36px',
                position: 'absolute',
                textAlign: 'right',
                width: '30px',
              },
            '.public-DraftStyleDefault-orderedListItem:before': {
              content: 'counter(ol0) ". "',
              counterIncrement: 'ol0',
            },

            '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before':
              {
                content: 'counter(ol1, lower-alpha) ". "',
                counterIncrement: 'ol1',
              },
            '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before':
              {
                content: 'counter(ol2, lower-roman) ". "',
                counterIncrement: 'ol2',
              },
            '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before':
              {
                content: 'counter(ol3) ". "',
                counterIncrement: 'ol3',
              },
            '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before':
              {
                content: 'counter(ol4, lower-alpha) ". "',
                counterIncrement: 'ol4',
              },
          },
        }}
        onClick={focusEditor}
        data-testid="text-editor"
      >
        <Toolbar>
          {externalProps => (
            <>
              {options.indexOf('bold') !== -1 && (
                <BoldButton {...externalProps} />
              )}
              {options.indexOf('italic') !== -1 && (
                <ItalicButton {...externalProps} />
              )}
              <Separator {...externalProps} />
              {options.indexOf('h1') !== -1 && (
                <HeadlineOneButton {...externalProps} />
              )}
              {options.indexOf('h2') !== -1 && (
                <HeadlineTwoButton {...externalProps} />
              )}
              {options.indexOf('h3') !== -1 && (
                <HeadlineThreeButton {...externalProps} />
              )}
              <Separator {...externalProps} />
              {options.indexOf('list') !== -1 && (
                <UnorderedListButton {...externalProps} />
              )}
              {options.indexOf('list') !== -1 && (
                <OrderedListButton {...externalProps} />
              )}
              {options.indexOf('link') !== -1 && (
                <>
                  <Separator {...externalProps} />
                  <LinkButton {...externalProps} />
                </>
              )}
            </>
          )}
        </Toolbar>
        <Editor
          ref={element => {
            editor.current = element;
          }}
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          plugins={plugins}
        />
        <InlineToolbar>
          {externalProps => (
            <>
              {options.indexOf('bold') !== -1 && (
                <BoldButton {...externalProps} />
              )}
              {options.indexOf('italic') !== -1 && (
                <ItalicButton {...externalProps} />
              )}
              <InlineToolbarSeparator {...externalProps} />
              {options.indexOf('h1') !== -1 && (
                <HeadlineOneButton {...externalProps} />
              )}
              {options.indexOf('h2') !== -1 && (
                <HeadlineTwoButton {...externalProps} />
              )}
              {options.indexOf('h3') !== -1 && (
                <HeadlineThreeButton {...externalProps} />
              )}
              <InlineToolbarSeparator {...externalProps} />
              {options.indexOf('list') !== -1 && (
                <UnorderedListButton {...externalProps} />
              )}
              {options.indexOf('list') !== -1 && (
                <OrderedListButton {...externalProps} />
              )}
              {options.indexOf('link') !== -1 && (
                <>
                  <InlineToolbarSeparator {...externalProps} />
                  <LinkButton {...externalProps} />
                </>
              )}
            </>
          )}
        </InlineToolbar>
      </Box>
    </ThemeProvider>
  );
};

TextEditor.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOf(['bold', 'italic', 'h1', 'h2', 'h3', 'list', 'link']),
  ),
  value: PropTypes.string,
};

TextEditor.defaultProps = {
  onChange: () => {},
  options: ['bold', 'italic', 'h1', 'h2', 'list'],
  value: '',
};

export default TextEditor;
