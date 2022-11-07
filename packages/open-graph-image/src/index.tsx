import { Example } from './components/Example'
import { generateImage } from './lib/img'

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const urlParams = new URL(request.url).searchParams
    const msg = urlParams.get('msg') || 'Hello'
    const from = urlParams.get('from') || undefined
    const to = urlParams.get('to') || undefined
    const img = await generateImage(<Example msg={msg} from={from} to={to} />);

    return new Response(img)
  },
}
