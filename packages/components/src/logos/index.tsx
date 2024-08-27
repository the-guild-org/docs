import { HTMLAttributes } from 'react';
import { cn } from '../cn';

export { ReactComponent as AngularLogo } from './angular.svg';
export { ReactComponent as CodeGeneratorLogo } from './code-generator.svg';
export { ReactComponent as ConductorLogo } from './conductor.svg';
export { ReactComponent as ConfigLogo } from './config.svg';
export { ReactComponent as FetsLogo } from './fets.svg';
export { ReactComponent as GuildLogo } from './guild.svg';
export { ReactComponent as HeltinLogo } from './heltin.svg';
export { ReactComponent as KitQLLogo } from './kitql.svg';
export { ReactComponent as MeshLogo } from './mesh.svg';
export { ReactComponent as ModulesLogo } from './modules.svg';
export { ReactComponent as NextraLogo } from './nextra.svg';
export { ReactComponent as SSELogo } from './sse.svg';
export { ReactComponent as StitchingLogo } from './stitching.svg';
export { ReactComponent as TheGuild } from './the-guild.svg';
export { ReactComponent as ToolsLogo } from './tools.svg';
export { ReactComponent as WhatsAppLogo } from './whatsapp.svg';
export { ReactComponent as WSLogo } from './ws.svg';
export { ReactComponent as YogaLogo } from './yoga.svg';
export { ReactComponent as HiveCombinationMark } from './hive-combination-mark.svg';

export interface LettermarkLogoProps extends HTMLAttributes<HTMLElement> {}
const createLettermarkLogo = (text: string) => (props: LettermarkLogoProps) => {
  return (
    <span
      role="img"
      {...props}
      className={cn(
        'inline-flex items-center justify-center text-sm font-medium uppercase leading-5',
        props.className,
      )}
    >
      {text}
    </span>
  );
};

export const InspectorLettermark = createLettermarkLogo('I');
export const SofaLettermark = createLettermarkLogo('So');
export const GraphQLESlintLettermark = createLettermarkLogo('Esl');
export const EnvelopLettermark = createLettermarkLogo('E');
export const ScalarsLettermark = createLettermarkLogo('S');
