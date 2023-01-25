import { ReactNode } from 'react';
import { initWasm, Resvg } from '@resvg/resvg-wasm';
import satori, { init } from 'satori';
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
    weight: 400,
  });

  const svg = await satori(node, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'NotoSansJP',
        data: notoSans,
        weight: 100,
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
};
