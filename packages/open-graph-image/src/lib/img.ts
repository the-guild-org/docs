import { ReactNode } from 'react';
import { initWasm, Resvg } from '@resvg/resvg-wasm';
// @ts-expect-error -- todo: add declaration
import satori, { init } from 'satori/wasm';
import initYoga from 'yoga-wasm-web';
import { loadGoogleFont } from './fonts';
import resvgWasm from '../vender/resvg.wasm';
import yogaWasm from '../vender/yoga.wasm';

const genModuleInit = () => {
  let isInit = false;
  return async () => {
    if (isInit) {
      return;
    }

    // @ts-expect-error todo: fix Type 'YogaWasm' has no call signatures
    init(await initYoga(yogaWasm));
    await initWasm(resvgWasm);
    isInit = true;
  };
};
const moduleInit = genModuleInit();

export const generateImage = async (node: ReactNode): Promise<Uint8Array> => {
  await moduleInit();
  const notoSans = await loadGoogleFont({
    family: 'Noto Sans JP',
    weight: 100,
  });

  const svg = await satori(node, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'NotoSansJP',
        data: notoSans,
        weight: 100,
        style: 'thin',
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
};
