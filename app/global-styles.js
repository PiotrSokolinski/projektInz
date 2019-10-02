import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .fade-in {
    &-enter {
      opacity: 0;
    }
    &-enter-active {
      opacity: 1;
      transition: all .25s cubic-bezier(0.250, 0.460, 0.450, 0.940);
      transition-duration: 350ms;
    }
    &-leave {
      opacity: 1;
    }
    &-leave-active {
      opacity: 0;
      transition: all .25s cubic-bezier(0.250, 0.460, 0.450, 0.940);
      transition-duration: 350ms;
    }
    &-leave,
    &-leave-active {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
    }
  }
`
