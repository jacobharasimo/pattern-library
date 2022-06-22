import { colors } from '../theme';
import { toFlatPropertyMap } from './objects';

export const colorOptions = Object.keys(toFlatPropertyMap(colors));
