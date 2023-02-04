import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { CssBaseline } from '@material-ui/core'
import {
    ThemeProvider,
    createTheme,
    StyledEngineProvider,
    alpha,
    withStyles
} from '@material-ui/core/styles'
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
const shape = {
    borderRadius: 8,
    borderRadiusSm: 12,
    borderRadiusMd: 16
};
function createGradient(color1, color2) {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
}
const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8)
};
const PRIMARY = {
    lighter: '#C8FACD',
    light: '#5BE584',
    main: '#00AB55',
    dark: '#007B55',
    darker: '#005249',
    contrastText: '#fff'
};
const SECONDARY = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff'
};
const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff'
};
const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800]
};
const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800]
};
const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff'
};
const GRADIENTS = {
    primary: createGradient(PRIMARY.light, PRIMARY.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    error: createGradient(ERROR.light, ERROR.main)
};
export const palette = {
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: GREY,
    gradients: GRADIENTS,
    divider: GREY[500_24],
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48
    }
};
function pxToRem(value) {
    return `${value / 16}rem`;
}
function responsiveFontSizes({ sm, md, lg }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm)
        },
        '@media (min-width:960px)': {
            fontSize: pxToRem(md)
        },
        '@media (min-width:1280px)': {
            fontSize: pxToRem(lg)
        }
    };
}
const FONT_PRIMARY = 'Public Sans, sans-serif';
const typography = {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
        fontWeight: 700,
        lineHeight: 80 / 64,
        fontSize: pxToRem(40),
        ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
    },
    h2: {
        fontWeight: 700,
        lineHeight: 64 / 48,
        fontSize: pxToRem(32),
        ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
    },
    h3: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(24),
        ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
    },
    h4: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(20),
        ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
    },
    h5: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
    },
    h6: {
        fontWeight: 700,
        lineHeight: 28 / 18,
        fontSize: pxToRem(17),
        ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
    },
    subtitle1: {
        fontWeight: 600,
        lineHeight: 1.5,
        fontSize: pxToRem(16)
    },
    subtitle2: {
        fontWeight: 600,
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    body1: {
        lineHeight: 1.5,
        fontSize: pxToRem(16)
    },
    body2: {
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    caption: {
        lineHeight: 1.5,
        fontSize: pxToRem(12)
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        letterSpacing: 1.1,
        textTransform: 'uppercase'
    },
    button: {
        fontWeight: 700,
        lineHeight: 24 / 14,
        fontSize: pxToRem(14),
        textTransform: 'capitalize'
    }
};
const GlobalStyles = withStyles((theme) => ({
    '@global': {
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
        },
        html: {
            width: '100%',
            height: '100%',
            '-ms-text-size-adjust': '100%',
            '-webkit-overflow-scrolling': 'touch'
        },
        body: {
            width: '100%',
            height: '100%'
        },
        '#root': {
            width: '100%',
            height: '100%'
        },
        input: {
            '&[type=number]': {
                MozAppearance: 'textfield',
                '&::-webkit-outer-spin-button': { margin: 0, WebkitAppearance: 'none' },
                '&::-webkit-inner-spin-button': { margin: 0, WebkitAppearance: 'none' }
            }
        },
        textarea: {
            '&::-webkit-input-placeholder': { color: theme.palette.text.disabled },
            '&::-moz-placeholder': { opacity: 1, color: theme.palette.text.disabled },
            '&:-ms-input-placeholder': { color: theme.palette.text.disabled },
            '&::placeholder': { color: theme.palette.text.disabled }
        },
        a: { color: theme.palette.primary.main },
        img: { display: 'block', maxWidth: '100%' }
    }
}))(() => null);

ThemeConfig.propTypes = {
    children: PropTypes.node
};

export default function ThemeConfig({ children }) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape,
            typography,
            shadows,
            customShadows
        }),
        []
    );
    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}