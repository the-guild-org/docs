import { createGlobalStyle } from 'styled-components'
import { GlobalStyles as BaseStyles } from 'twin.macro'

export const HeaderGlobalStyles = createGlobalStyle`
	.tg-modal-open {
    max-height: 100vh;
    overflow: hidden !important;
  }
`

export const GlobalStyles = () => (
  <>
    <BaseStyles />
  </>
)
