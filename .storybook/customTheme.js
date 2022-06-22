import { create } from '@storybook/theming';
import { version } from "../package.json";

export default create({
  base: 'light',
  brandTitle: `Rombo v.${version}`,
});
