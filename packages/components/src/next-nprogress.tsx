/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { css, Global } from '@emotion/react';
import RouterImport from 'next/router.js';
import NProgress from 'nprogress';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { getDefault } from './utils.js';

function useLatestRef<T>(value: T) {
  const ref = useRef<T | null>(null);
  ref.current = value;
  return ref as React.MutableRefObject<T>;
}

const Router = getDefault(RouterImport);

let startTimer: ReturnType<typeof setTimeout> | null = null;
let stopTimer: ReturnType<typeof setTimeout> | null = null;

export const NextNProgress = memo(function NextNProgress({
  color = '#000000',
  startPosition = 0.3,
  startDelayMs = 50,
  stopDelayMs = 0,
  height = 5,
  options,
}: {
  color?: string;
  startPosition?: number;
  startDelayMs?: number;
  stopDelayMs?: number;
  height?: number;
  options?: NProgress.NProgressOptions;
}) {
  const fns = useMemo(() => {
    function clearTimers() {
      clearTimeout(stopTimer!);
      clearTimeout(startTimer!);
      stopTimer = null;
      startTimer = null;
    }

    function routeChangeStart() {
      clearTimers();
      startTimer = setTimeout(() => {
        clearTimers();
        NProgress.set(startPosition);
        NProgress.start();
      }, startDelayMs);
    }

    function routeChangeEnd() {
      clearTimers();
      stopTimer = setTimeout(() => {
        if (NProgress.isStarted()) {
          NProgress.done(true);
        }
      }, stopDelayMs);
    }

    return {
      routeChangeStart,
      routeChangeEnd,
    };
  }, [startPosition, stopDelayMs, startDelayMs]);

  const optionsRef = useLatestRef(options);

  useEffect(() => {
    const { routeChangeEnd, routeChangeStart } = fns;
    if (optionsRef.current) NProgress.configure(optionsRef.current);

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, [fns, optionsRef]);

  return (
    <Global
      styles={css`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
        #nprogress .spinner {
          display: none;
          position: fixed;
          z-index: 400;
          top: 15px;
          right: 15px;
        }
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;
          -webkit-animation: nprogresss-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    />
  );
});
