/* eslint-disable max-lines */
import baseTheme from '@rebass/preset';
import merge from 'lodash.merge';

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const colors = {
  purple: {
    100: '#EFECFD',
    300: '#745AF6',
    400: '#6D33FF',
    500: '#4900FF',
  },
  neutral: {
    0: '#FFFFFF',
    20: '#F7FAFC',
    50: '#F1F5F9',
    100: '#DEE4ED',
    300: '#A3B1C2',
    400: '#8797AB',
    500: '#6B778F',
    700: '#3F495A',
    900: '#090925',
  },
  blue: {
    600: '#0B71D0',
  },
  green: {
    600: '#24A84E',
  },
  orange: {
    600: '#DE7B02',
  },
  red: {
    500: '#EC1329',
    600: '#D90218',
  },
  white: '#ffffff',
};

// backwards compatability support. to remove over time.
colors.brandPrimary = colors.purple[500];
colors.gray1 = colors.neutral[700];
colors.gray2 = colors.neutral[600];
colors.gray3 = colors.neutral[400];
colors.gray4 = colors.neutral[100];
colors.gray5 = colors.neutral[50];
colors.gray6 = colors.neutral[20];
colors.purple[1] = colors.purple[100];
colors.purple[3] = colors.purple[300];
colors.purple[5] = colors.purple[500];

const customTheme = {
  fontSizes: [12, 14, 16, 18, 20, 24, 28],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontWeights: {
    light: 200,
    default: 300,
    body: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heading: 800,
  },
  buttonLoader: {
    default: {
      top: '50%',
      left: '50%',
      position: 'absolute',
      borderRadius: 'circle',
      borderStyle: 'solid',
      borderWidth: '2px',
      m: 'auto',
      width: '1.5em',
      height: '1.5em',
      ml: '-0.75em',
      mt: '-0.75em',
      borderColor: 'rgba(255,255,255,0.2)',
      borderTopColor: 'neutral.0',
    },
    primary: {
      variant: 'buttonLoader.default',
    },
    secondary: {
      variant: 'buttonLoader.default',
      borderColor: 'neutral.100',
      borderTopColor: 'neutral.700',
    },
    text: {
      variant: 'buttonLoader.default',
      borderColor: 'neutral.900',
      borderTopColor: 'neutral.0',
    },
    accent: {
      variant: 'buttonLoader.default',
      borderColor: 'rgba(98, 66, 255, 0.15)',
      borderTopColor: 'purple.400',
    },
    danger: {
      variant: 'buttonLoader.default',
      borderColor: 'rgba(247, 64, 82, 0.15)',
      borderTopColor: 'danger',
    },
    link: {
      variant: 'buttonLoader.default',
      borderColor: 'rgba(98, 66, 255, 0.15)',
      borderTopColor: 'purple.400',
    },
    tertiary: {
      variant: 'buttonLoader.text',
    },
    underlineLink: {
      variant: 'buttonLoader.text',
    },
    sideBarNav: {
      variant: 'buttonLoader.text',
    },
    styleless: {
      variant: 'buttonLoader.text',
    },
    outline: {
      variant: 'buttonLoader.secondary',
    },
    round: {
      variant: 'buttonLoader.text',
    },
    anchor: {
      variant: 'buttonLoader.text',
    },
    panelEdit: {
      variant: 'buttonLoader.text',
    },
  },
  borders: ['none', '1px solid'],
  colors: {
    /* Pallet */
    purple: colors.purple,
    neutral: colors.neutral,
    blue: colors.blue[600],
    green: colors.green,
    orange: colors.orange[600],
    red: colors.red,
    /* Aliases */
    primary: colors.brandPrimary,
    accent: colors.brandPrimary,
    loaderPrimary: colors.brandPrimary,
    loaderSecondary: colors.neutral[100],
    /* Typography */
    text: colors.neutral[700],
    textSubtle: colors.neutral[400],
    textDark: colors.neutral[900],
    textPlaceholder: colors.neutral[300],

    /* Deprecated don't use */
    gray: [colors.gray1, colors.gray2, colors.gray3, colors.gray4, colors.gray5, colors.gray6],
    success: colors.green[600],
    info: colors.blue[600],
    warning: colors.orange[600],
    danger: colors.red[500],
    border: colors.neutral[100],
    bodyBackground: colors.neutral[20],
    link: colors.neutral[700],
    linkVisited: colors.neutral[700],
    linkedin: '#0077B5',
    github: '#6E5494',
    dribbble: '#c142a0',
    twitter: '#1DA1F2',
  },
  text: {
    srOnly: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    },
    default: {
      fontFamily: 'body',
      fontWeight: 'body',
      fontStyle: 'normal',
      fontSize: 2,
      lineHeight: '24px',
      color: 'text',
    },
    error: {
      variant: 'text.default',
      color: 'red',
      '&:first-letter': {
        textTransform: 'capitalize',
      },
    },
    subHeading: {
      color: 'text',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 'medium',
      fontSize: 1,
      lineHeight: '20px',
    },
    lightHeading: {
      variant: 'text.default',
      fontWeight: 'normal',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: 'inherit',
    },
    sentenceCase: {
      variant: 'text.default',
      '&::first-letter': {
        textTransform: 'uppercase',
      },
    },
  },
  buttonSizes: {
    small: {
      px: 3,
      py: 2,
      fontSize: 1,
      lineHeight: '16px',
    },
    medium: {
      px: '24px',
      py: 2,
      fontSize: 2,
      lineHeight: '24px',
    },
    large: {
      px: 4,
      py: 3,
      fontSize: 2,
      lineHeight: '16px',
    },
  },
  buttons: {
    default: {
      position: 'relative',
      cursor: 'pointer',
      fontFamily: 'body',
      transition: 'all ease 0.3s',
      borderRadius: 'default',
      fontSize: 2,
      fontWeight: 'medium',
      display: 'flex',
      alignItems: 'center',
      ':active': {
        transform: 'scale(.94)',
        boxShadow: 'inset 0px 1.875px 1.875px rgba(0, 0, 0, 0.12)',
      },
    },
    primary: {
      variant: 'buttons.default',
      bg: 'primary',
      color: 'neutral.0',
      ':hover': {
        bg: 'purple.500',
      },
      ':active': {
        transform: 'scale(.94)',
        boxShadow: 'inset 0px 1.875px 1.875px rgba(0, 0, 0, 0.12)',
      },
      ':disabled': {
        '&:not(.ladda-button)': {
          bg: 'neutral.100',
        },
      },
      '&.ladda-button': {
        '[role="progressbar"] > div > div': {
          borderColor: hex2rgba(colors.neutral[0], 0.2),
          borderTopColor: 'neutral.0',
        },
      },
    },
    secondary: {
      variant: 'buttons.default',
      position: 'relative',
      borderStyle: 'solid',
      borderColor: 'neutral.300',
      borderWidth: '1px',
      bg: 'neutral.0',
      color: 'text',
      ':disabled': {
        color: 'neutral.300',
      },
      ':hover': {
        bg: 'neutral.20',
      },
      '[role="progressbar"] > div > div': {
        borderColor: hex2rgba(colors.neutral[700], 0.2),
        borderTopColor: 'neutral.900',
      },
    },
    text: {
      variant: 'buttons.secondary',
      boxShadow: 'none',
      bg: 'transparent',
      '&.ladda-button': {
        ':disabled': {
          bg: 'transparent',
        },
      },
    },
    tertiary: {
      variant: 'buttons.text',
      border: 'none',
    },
    accent: {
      variant: 'buttons.default',
      display: 'flex',
      alignItems: 'center',
      color: 'primary',
      bg: 'purple.100',
      boxShadow: 'none',
      ':disabled': {
        '&:not(.ladda-button)': {
          bg: 'neutral.20',
        },
        color: 'purple.300',
      },
      ':hover': {
        bg: 'purple.100',
      },
      '&.ladda-button': {
        '[role="progressbar"] > div > div': {
          borderColor: hex2rgba(colors.purple[400], 0.15),
          borderTopColor: colors.purple[400],
        },
      },
    },
    danger: {
      variant: 'buttons.secondary',
      bg: 'transparent',
      color: 'danger',
      boxShadow: 'none',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'danger',
      ':hover': {
        bg: 'danger',
        color: 'neutral.0',
      },
      ':disabled': {
        opacity: 0.5,
      },
      '::after': {
        borderColor: hex2rgba(colors.red[500], 0.2),
        borderTopColor: 'danger',
      },
      '[role="progressbar"] > div > div': {
        borderColor: hex2rgba(colors.red[500], 0.2),
        borderTopColor: 'danger',
      },
    },
    link: {
      variant: 'buttons.secondary',
      border: 'none',
      color: 'purple.300',
      boxShadow: 'none',
      textDecoration: 'none',
      '&.ladda-button': {
        ':disabled': {
          bg: 'transparent',
        },
      },
    },
    underlineLink: {
      variant: 'buttons.secondary',
      border: 'none',
      py: 0,
      px: 1,
      mx: 1,
      color: 'link',
      textDecoration: 'underline',
      boxShadow: 'none',
      '&.ladda-button': {
        ':disabled': {
          bg: 'transparent',
        },
      },
      ':hover': {
        bg: 'transparent',
      },
    },
    sideBarNav: {
      variant: 'buttons.link',
      lineHeight: 1.45,
      fontWeight: 'normal',
      fontSize: 3,
      color: 'textSubtle',
      '&.active': {
        fontWeight: 'semibold',
        color: 'textDark',
      },
    },
    styleless: {
      position: 'relative',
      borderRadius: 0,
      border: 'none',
      p: 0,
      bg: 'transparent',
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    round: {
      variant: 'buttons.text',
      borderRadius: 'circle',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    outline: {
      variant: 'buttons.secondary',
    },
    anchor: {
      variant: 'buttons.outline',
      boxShadow: 'none',
      textDecoration: 'underline',
      color: 'text',
    },
    panelEdit: {
      variant: 'buttons.default',
      bg: 'transparent',
      color: 'textSubtle',
      borderWidth: '2px',
      borderColor: 'neutral.100',
      borderStyle: 'solid',
      borderRadius: '999999px',
      lineHeight: '16px',
      px: [1],
      py: ['12px'],
      ':hover': {
        borderColor: 'neutral.300',
        color: 'text',
      },
    },
  },
  variants: {
    header: {
      bottomBorder: {
        borderBottomColor: 'neutral.100',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
      },
      borderTop: {
        borderTopColor: 'neutral.100',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
      },
    },
    srOnly: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    },
    badge: {
      fontSize: 1,
      borderRadius: 'circle',
      minWidth: '1.846em',
      height: '1.846em',
      ml: 2,
      p: 1,
      fontWeight: 'bold',
      bg: 'neutral.50',
      color: 'neutral.700',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'inline-flex',
    },
    loadingSpinner: {
      height: '1em',
      width: '1em',
      borderStyle: 'solid',
      borderRadius: 'circle',
      borderColor: 'neutral.100',
      borderWidth: '2px',
      borderTopColor: 'text',
      animation: '1s linear 0s infinite normal none running rotate',
    },
    hr: {
      my: 2,
      border: 0,
      borderBottom: 1,
      borderBottomColor: 'neutral.100',
    },
  },
  toggle: {
    reverse: {
      mr: 0,
      ml: 2,
    },
  },
  checkbox: {
    color: 'neutral.300',
    borderRadius: 0,
    'input[type=checkbox]:focus ~&': {
      outline: '-webkit-focus-ring-color auto 1px',
      boxShadow: 'none',
    },
    'input[type=checkbox]:disabled ~ &': {
      cursor: 'default',
    },
    'input[type=checkbox] ~ &': {
      mr: 2,
      cursor: 'pointer',
      stroke: 'neutral.300',
    },
    'input[type=checkbox]:not(:checked) ~ &': {
      color: 'neutral.0',
    },
    'input[type=checkbox]:checked:not(:disabled) ~ &': {
      stroke: 'primary',
    },
    'input[type=checkbox]:disabled:not(:checked) ~ &': {
      color: 'neutral.20',
      stroke: 'neutral.100',
    },
    'input[type=checkbox]:disabled:checked ~ &': {
      color: 'neutral.20',
      stroke: 'neutral.300',
    },
  },
  tag: {
    default: {
      variant: 'buttons.default',
      border: 'none',
      fontWeight: 'body',
      display: 'flex',
      mr: 2,
      px: 2,
      py: 1,
      borderRadius: 'circle',
      bg: 'neutral.100',
      color: 'text',
      textAlign: 'center',
      alignItems: 'center',
      ':disabled': {
        cursor: 'default',
      },
      '[data-item=close-icon]': {
        transition: 'all 0.1s ease 0s',
        opacity: 0.5,
      },
      ':hover': {
        '[data-item=close-icon]': {
          opacity: 1,
        },
      },
    },
    accent: {
      variant: 'tag.default',
      color: 'primary',
      bg: 'purple.100',
    },
  },
  card: {
    editPanel: {
      p: 4,
      boxShadow: 'small',
      borderRadius: 'default',
      bg: 'neutral.0',
      mx: 'auto',
    },
    default: {
      borderRadius: 'default',
      boxShadow: 'medium',
      padding: [4],
      bg: 'neutral.0',
      mx: 'auto',
    },
    innerWell: {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: 'purple.300',
      borderRadius: 'default',
      p: [3],
    },
    boardSubscription: {
      boxShadow: '0 1px 0 0 #e2e8f0',
    },
  },
  social: {
    listItem: {
      minHeight: '24px',
      '&:not(:last-child)': {
        marginRight: 3,
      },
    },
    link: {
      color: '-webkit-link',
      display: 'flex',
      alignItems: 'center',
      fontSize: 1,
      fontWeight: 'medium',
      textDecoration: 'none',
      borderRadius: 'default',
    },
    icon: {
      mr: [1],
      width: '16px',
      height: '16px',
    },
  },
  fieldset: {
    p: 0,
    border: 'none',
  },
  forms: {
    input: {
      borderColor: 'neutral.300',
      fontSize: 2,
      lineHeight: '22px',
      px: 3,
      py: 2,
      transition: 'all .3s',
      bg: 'neutral.0',
      ':disabled': { backgroundColor: 'neutral.50', color: 'textSubtle', borderColor: 'neutral.100', opacity: 1 },
      '::placeholder': { color: 'textPlaceholder' },
    },
    inputLarge: {
      variant: 'forms.input',
      fontSize: 3,
      lineHeight: '1.7',
    },
    inputSmall: {
      variant: 'forms.input',
      fontSize: 1,
      px: 2,
      py: 1,
    },
    textarea: {
      variant: 'forms.input',
      resize: 'vertical',
    },
    textareaLarge: {
      variant: 'forms.textarea',
      fontSize: 3,
    },
    textareaSmall: {
      variant: 'forms.textarea',
      fontSize: 1,
      lineHeight: '16px',
      px: 2,
      py: 1,
    },
    label: {
      display: 'inline-block',
      fontWeight: 'medium',
      mb: 2,
    },
  },
  select: {
    borderColor: 'neutral.300',
  },
  legend: {
    mb: 2,
  },
  shadows: {
    xs: ' 0px 1px 0px rgba(0, 0, 0, 0.06)',
    small: '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 1px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15)',
    large: '0 1px 8px rgba(0, 0, 0, 0.1), 0 16px 48px rgba(0, 0, 0, 0.1),0 24px 60px rgba(0, 0, 0, 0.1)',
  },
  modals: {
    default: {
      wrapper: {
        zIndex: 1000,
      },
      overlay: {
        zIndex: 1000,
        position: 'fixed',
        top: 0,
        bottom: 0,
        bg: 'rgba(247,250,252,.8)',
        width: '100%',
        height: '100%',
        transition: 'background-color .5s linear',
      },
      modal: {
        borderRadius: 'default',
        position: 'relative',
        width: 'calc(100% - 32px)',
        maxWidth: '600px',
        zIndex: 1024,
        bg: 'neutral.0',
        p: 0,
        boxShadow: '0 1px 8px rgb(0 0 0 / 10%), 0 8px 24px rgb(0 0 0 / 15%)',
      },
      header: {
        py: 3,
        mx: 3,
        color: 'textDark',
        flexGrow: 1,
        borderBottom: 1,
        borderColor: 'neutral.100',
      },
      closeButton: {
        top: 0,
        right: 0,
        variant: 'buttons.link',
        color: 'neutral.400',
        p: 2,
        my: -2,
        mr: -2,
        ':hover': { color: 'text', bg: 'transparent' },
      },
      title: {
        variant: 'text.default',
        fontWeight: 'semibold',
        fontSize: [3],
        color: 'textDark',
        flex: 1,
      },
      body: {
        variant: 'text.default',
        py: 3,
        mx: 3,
      },
      footer: {
        borderTop: 1,
        borderColor: 'neutral.100',
        mx: 3,
        py: 3,
      },
    },
    large: {
      wrapper: {
        variant: 'modals.default.wrapper',
      },
      overlay: {
        variant: 'modals.default.overlay',
      },
      modal: {
        variant: 'modals.default.modal',
        maxWidth: '900px',
      },
      header: {
        variant: 'modals.default.header',
      },
      closeButton: {
        variant: 'modals.default.closeButton',
      },
      title: {
        variant: 'modals.default.title',
      },
      body: {
        variant: 'modals.default.body',
      },
      footer: {
        variant: 'modals.default.footer',
      },
    },
  },
  profilePicture: {
    default: {
      wrapper: {
        position: 'relative',
        fontWeight: 500,
        color: 'text',
        height: '100%',
        width: '100%',
      },
      image: {
        borderRadius: 'circle',
        overflow: 'hidden',
        objectFit: 'contain',
        width: '100%',
        height: '100%',
      },
      text: {
        borderRadius: 'circle',
        overflow: 'hidden',
        bg: 'neutral.100',
        width: '100%',
        height: '100%',
      },
      verified: {
        color: 'neutral.0',
        boxShadow: '0 1px 2px rgb(0 0 0 / 5%), 0 1px 8px rgb(0 0 0 / 10%)',
        borderRadius: 'circle',
        bg: 'primary',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
      },
    },
    square: {
      wrapper: {
        variant: 'profilePicture.default.wrapper',
        borderRadius: 'default',
      },
      image: {
        variant: 'profilePicture.default.image',
        borderRadius: 'default',
        overflow: 'hidden',
      },
      text: {
        variant: 'profilePicture.default.text',
        borderRadius: 'default',
        overflow: 'hidden',
      },
    },
  },
  fonts: {
    body: '"Silka",sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif',
  },
  popover: {
    trigger: {
      variant: 'buttons.styleless',
    },
    container: {
      boxShadow: '0 1px 8px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.15)',
      fontWeight: 'body',
      borderRadius: 'default',
      p: 2,
      fontSize: 1,
      maxWidth: '250px',
      bg: colors.neutral[900],
      color: 'neutral.0',
    },
    arrow: {
      height: '1em',
      position: 'absolute',
      width: '1em',
      pointerEvents: 'none',
      '::before': {
        borderColor: `transparent transparent ${colors.neutral[900]} transparent !important`,
        borderStyle: 'solid',
        content: '',
        display: 'block',
        height: 0,
        margin: 'auto',
        width: 0,
      },
      '::after': {
        borderColor: `transparent transparent ${colors.neutral[900]} transparent !important`,
        borderStyle: 'solid',
        content: '',
        display: 'block',
        height: 0,
        margin: 'auto',
        position: 'absolute',
        width: 0,
      },
    },
  },
  dropdown: {
    default: {
      container: {
        bg: 'white',
        p: 0,
        zIndex: 999999,
      },
    },
    shadow: {
      container: {
        variant: 'dropdown.default.container',
        boxShadow: 'medium',
      },
    },
  },
  loader: {
    default: {
      height: '1em',
      width: '1em',
      borderStyle: 'solid',
      borderRadius: 'circle',
      borderColor: 'neutral.100',
      borderWidth: '2px',
      borderTopColor: 'text',
      animation: '1s linear 0s infinite normal none running rotate',
    },
  },
  dataTable: {
    content: {
      width: '100%',
      overflowY: 'overlay!important',
    },
    table: {
      border: 1,
      borderColor: 'neutral.100',
      flexDirection: 'column',
      overflow: 'auto',
      height: '100%',
      bg: 'white',
      borderRadius: 'default',
      px: 4,
      py: 3,
    },
    loader: {
      variant: 'buttonLoader.default',
      borderColor: 'neutral.100',
      borderTopColor: 'purple.400',
    },
    tr: { py: 2, position: 'relative', alignItems: 'flex-start', overflow: 'visible' },
    thead: {
      flexDirection: 'column',
      color: 'textSubtle',
      fontWeight: 'body',
      fontSize: 0,
      textTransform: 'uppercase',
      borderBottom: 1,
      borderColor: 'neutral.100',
      overflow: 'none',
      tr: {
        width: '100%',
        variant: 'dataTable.tr',
        py: 0,
        color: 'neutral.500',
        letterSpacing: '1px',
        alignItems: 'flex-start',
      },
    },
    tbody: {
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignContent: 'stretch',
      alignItems: 'flex-start',
      flexDirection: 'column',
      height: '100%',
    },
    th: {
      px: 2,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      textAlign: 'left',
      alignItems: 'center',
      py: 2,
      ':first-child': {
        pl: 0,
      },
      ':hover': {
        '.sortControls': {
          visibility: 'unset',
        },
      },
    },
    td: {
      px: 2,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto',
      textAlign: 'left',
      minHeight: '44px',
      ':first-child': {
        pl: 0,
      },
    },
  },
  virtualizedList: {
    default: {
      wrapper: {},
      listItem: {},
    },
  },
  accordion: {
    button: {
      bg: 'neutral.50',
      borderRadius: 'unset',
      textAlign: 'unset',
      color: 'text',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      px: 3,
      fontSize: 2,
    },
    content: {
      px: 3,
      border: 1,
      borderColor: 'neutral.50',
      borderTop: 'unset',
    },
  },
  cookieConsent: {
    drawer: {
      borderRadius: 'default',
      fontSize: 2,
      width: ['100%', '400px'],
      p: 3,
      lineHeight: '22px',
      boxShadow: 'medium',
      bottom: [0, '32px'],
      left: [0, '32px'],
      zIndex: '1000',
      position: 'fixed',
      background: 'white',
    },
  },
  statusIndicator: {
    status: {
      height: 8,
      width: 8,
      borderRadius: 'circle',
      mr: 2,
    },
    text: {
      m: 0,
      marginTop: '0!important',
    },
  },
};

const theme = merge(baseTheme, customTheme);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.debug('Theme settings\n');
  // eslint-disable-next-line no-console
  console.debug(theme);
}

export default theme;
