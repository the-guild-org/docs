const regex = '[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*';

function emailRegex({ exact }: { exact: boolean }) {
  return exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');
}

export function isEmail(value: string) {
  return emailRegex({ exact: true }).test(value);
}
