import { useContext } from 'react';
import { LabelPickerContext } from '../context/LabelPickerContext';

export const useLabelPicker = () => useContext(LabelPickerContext);
