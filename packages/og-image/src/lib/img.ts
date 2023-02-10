import { ReactNode } from 'react';
import satori from 'satori';
import { loadGoogleFont } from './fonts';

export const generateImage = async (node: ReactNode): Promise<string> => {
  const notoSans = await loadGoogleFont({
    family: 'Noto Sans JP',
    weight: 400,
  });
  return await satori(node, {
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
};
