import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
export const theme = {
    chrome: {
        background: '#efefefe',
        color: '#121212'
    },
    blaze: {
        background: '#121212',
        color: '#efefef'
    },
    monokai:{

    },
    drakula:{
        
    }
}

const GlobalStyles = createGlobalStyle`
${reset}
*, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    box-sizing: border-box;
  }
  
    body,html{ 
        background:${props=>props.theme.background};
        color:${props=>props.theme.color};
        margin: 0;
        padding: 0;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased; 
        position: relative;
        min-height: 100vh;
        font-family:sans-serif;
    }
    ul{
        margin:0;
        padding:0;
        list-style:none;
    }
    li{
        display:inline-block;
    }
    #root{
        height: 100vh;
        overflow: hidden;
        position: relative;  
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
        -webkit-font-smoothing: auto;
    }
    
    a{
        color:inherit;
        text-decoration:none;
    }  
    /* Small (sm) */
    @media (min-width: 640px) { /* ... */ }

    /* Medium (md) */
    @media (min-width: 768px) { /* ... */ }

    /* Large (lg) */
    @media (min-width: 1024px) { /* ... */ }

    /* Extra Large (xl) */
    @media (min-width: 1280px) { /* ... */ }
`
export const ThemeWrapper = ({ user, children }) => (
    <ThemeProvider theme={user.theme === 'blaze' ? theme.blaze : theme.chrome}>
        <GlobalStyles/> 
            {children} 
    </ThemeProvider>
);