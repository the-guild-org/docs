import { Example } from './components/Example'
import { generateImage } from './lib/img'
import { PRODUCTS } from '@theguild/components/products'

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const urlParams = new URL(request.url).searchParams
    const msg = urlParams.get('msg') || 'Hello'
    const from = urlParams.get('from') || undefined
    const to = urlParams.get('to') || undefined
    const Hive = PRODUCTS.HIVE
    const img = await generateImage(<Hive.logo/>);

    return new Response(img)
  },
}
